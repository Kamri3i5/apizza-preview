"""
Payme (paycom.uz) Merchant API integration.

Docs: https://developer.help.paycom.uz/
Payme calls POST /payments/payme on our server with JSON-RPC 2.0 requests
(CheckPerformTransaction, CreateTransaction, PerformTransaction,
CancelTransaction, CheckTransaction, GetStatement). We respond per spec.

NOTE: the numeric error codes below reflect the values most commonly used
in production Payme integrations. Double-check them against your merchant
cabinet docs / test cabinet before going live, since Payme has tweaked
wording and edge cases over the years.
"""
import base64
import os
import time

from utils import (
    get_order_by_id,
    update_order_payment,
    get_payme_transaction,
    save_payme_transaction,
    list_payme_transactions,
)

PAYME_MERCHANT_ID = os.getenv("PAYME_MERCHANT_ID", "")
PAYME_KEY = os.getenv("PAYME_KEY", "")  # Test or prod key from the merchant cabinet (Basic Auth password)
PAYME_TEST_MODE = os.getenv("PAYME_TEST_MODE", "true").lower() == "true"

CHECKOUT_HOST = "checkout.test.paycom.uz" if PAYME_TEST_MODE else "checkout.paycom.uz"

# Transaction states per Payme spec
STATE_CREATED = 1
STATE_PERFORMED = 2
STATE_CANCELLED_AFTER_CREATE = -1
STATE_CANCELLED_AFTER_PERFORM = -2


class PaymeError(Exception):
    def __init__(self, code, message):
        self.code = code
        self.message = message
        super().__init__(str(message))


def build_checkout_link(order_id: str, amount_uzs: float) -> str:
    """Builds the checkout.paycom.uz link shown to the customer to pay an order."""
    amount_tiyin = int(round(float(amount_uzs) * 100))
    raw = f"m={PAYME_MERCHANT_ID};ac.order_id={order_id};a={amount_tiyin}"
    encoded = base64.b64encode(raw.encode()).decode()
    return f"https://{CHECKOUT_HOST}/{encoded}"


def verify_auth(authorization: str | None) -> bool:
    """Payme sends `Authorization: Basic base64(Paycom:KEY)` on every request."""
    if not authorization or not authorization.startswith("Basic "):
        return False
    try:
        decoded = base64.b64decode(authorization.split(" ", 1)[1]).decode()
        login, _, password = decoded.partition(":")
        return login == "Paycom" and password == PAYME_KEY and bool(PAYME_KEY)
    except Exception:
        return False


def _order_from_account(account: dict):
    order_id = (account or {}).get("order_id")
    order = get_order_by_id(order_id) if order_id else None
    if not order:
        raise PaymeError(-31050, {"ru": "Заказ не найден", "uz": "Buyurtma topilmadi", "en": "Order not found"})
    return order


def _validate_amount(order: dict, amount) -> None:
    expected = int(round(float(order["totalPrice"]) * 100))
    try:
        if int(amount) != expected:
            raise ValueError
    except (TypeError, ValueError):
        raise PaymeError(-31001, {"ru": "Неверная сумма", "uz": "Noto'g'ri summa", "en": "Incorrect amount"})


def check_perform_transaction(params: dict) -> dict:
    account = params.get("account", {})
    amount = params.get("amount")
    order = _order_from_account(account)

    if order.get("paymentStatus") == "paid":
        raise PaymeError(-31051, {"ru": "Заказ уже оплачен", "uz": "Buyurtma allaqachon to'langan", "en": "Order already paid"})

    _validate_amount(order, amount)
    return {"allow": True}


def create_transaction(params: dict) -> dict:
    payme_id = params["id"]
    amount = params.get("amount")
    account = params.get("account", {})
    order = _order_from_account(account)

    existing = get_payme_transaction(payme_id)
    if existing:
        if existing["state"] != STATE_CREATED:
            raise PaymeError(-31008, {"ru": "Невозможно выполнить операцию", "uz": "Amalni bajarib bo'lmaydi", "en": "Unable to perform operation"})
        return {"create_time": existing["create_time"], "transaction": str(existing["id"]), "state": existing["state"]}

    for tx in list_payme_transactions():
        if tx["order_id"] == order["id"] and str(tx["id"]) != str(payme_id) and tx["state"] in (STATE_CREATED, STATE_PERFORMED):
            raise PaymeError(-31050, {"ru": "У заказа уже есть активная транзакция", "uz": "Buyurtma uchun faol tranzaksiya mavjud", "en": "Order already has an active transaction"})

    if order.get("paymentStatus") == "paid":
        raise PaymeError(-31051, {"ru": "Заказ уже оплачен", "uz": "Buyurtma allaqachon to'langan", "en": "Order already paid"})

    _validate_amount(order, amount)

    create_time = int(time.time() * 1000)
    tx = {
        "id": payme_id,
        "order_id": order["id"],
        "amount": amount,
        "state": STATE_CREATED,
        "create_time": create_time,
        "perform_time": 0,
        "cancel_time": 0,
        "reason": None,
    }
    save_payme_transaction(tx)
    update_order_payment(order["id"], paymentStatus="pending", paymentProvider="payme")

    return {"create_time": create_time, "transaction": str(payme_id), "state": STATE_CREATED}


def perform_transaction(params: dict) -> dict:
    payme_id = params["id"]
    tx = get_payme_transaction(payme_id)
    if not tx:
        raise PaymeError(-31003, {"ru": "Транзакция не найдена", "uz": "Tranzaksiya topilmadi", "en": "Transaction not found"})

    if tx["state"] == STATE_PERFORMED:
        return {"transaction": str(tx["id"]), "perform_time": tx["perform_time"], "state": tx["state"]}

    if tx["state"] != STATE_CREATED:
        raise PaymeError(-31008, {"ru": "Невозможно выполнить операцию", "uz": "Amalni bajarib bo'lmaydi", "en": "Unable to perform operation"})

    perform_time = int(time.time() * 1000)
    tx["state"] = STATE_PERFORMED
    tx["perform_time"] = perform_time
    save_payme_transaction(tx)
    update_order_payment(tx["order_id"], paymentStatus="paid", paymentProvider="payme", paidAt=perform_time)

    return {"transaction": str(tx["id"]), "perform_time": perform_time, "state": tx["state"]}


def cancel_transaction(params: dict) -> dict:
    payme_id = params["id"]
    reason = params.get("reason")
    tx = get_payme_transaction(payme_id)
    if not tx:
        raise PaymeError(-31003, {"ru": "Транзакция не найдена", "uz": "Tranzaksiya topilmadi", "en": "Transaction not found"})

    if tx["state"] in (STATE_CANCELLED_AFTER_CREATE, STATE_CANCELLED_AFTER_PERFORM):
        return {"transaction": str(tx["id"]), "cancel_time": tx["cancel_time"], "state": tx["state"]}

    cancel_time = int(time.time() * 1000)
    tx["cancel_time"] = cancel_time
    tx["reason"] = reason
    tx["state"] = STATE_CANCELLED_AFTER_PERFORM if tx["state"] == STATE_PERFORMED else STATE_CANCELLED_AFTER_CREATE
    save_payme_transaction(tx)
    update_order_payment(tx["order_id"], paymentStatus="cancelled", paymentProvider="payme")

    return {"transaction": str(tx["id"]), "cancel_time": cancel_time, "state": tx["state"]}


def check_transaction(params: dict) -> dict:
    payme_id = params["id"]
    tx = get_payme_transaction(payme_id)
    if not tx:
        raise PaymeError(-31003, {"ru": "Транзакция не найдена", "uz": "Tranzaksiya topilmadi", "en": "Transaction not found"})

    return {
        "create_time": tx["create_time"],
        "perform_time": tx["perform_time"],
        "cancel_time": tx["cancel_time"],
        "transaction": str(tx["id"]),
        "state": tx["state"],
        "reason": tx["reason"],
    }


def get_statement(params: dict) -> dict:
    from_ts = params.get("from", 0)
    to_ts = params.get("to", 0)
    result = []
    for tx in list_payme_transactions():
        if from_ts <= tx["create_time"] <= to_ts:
            result.append({
                "id": tx["id"],
                "time": tx["create_time"],
                "amount": tx["amount"],
                "account": {"order_id": tx["order_id"]},
                "create_time": tx["create_time"],
                "perform_time": tx["perform_time"],
                "cancel_time": tx["cancel_time"],
                "transaction": str(tx["id"]),
                "state": tx["state"],
                "reason": tx["reason"],
            })
    return {"transactions": result}


_METHODS = {
    "CheckPerformTransaction": check_perform_transaction,
    "CreateTransaction": create_transaction,
    "PerformTransaction": perform_transaction,
    "CancelTransaction": cancel_transaction,
    "CheckTransaction": check_transaction,
    "GetStatement": get_statement,
}


def handle_request(body: dict) -> dict:
    method = body.get("method")
    params = body.get("params", {}) or {}
    req_id = body.get("id")

    handler = _METHODS.get(method)
    if not handler:
        return {
            "jsonrpc": "2.0",
            "id": req_id,
            "error": {"code": -32601, "message": {"ru": "Метод не найден", "uz": "Metod topilmadi", "en": "Method not found"}},
        }

    try:
        result = handler(params)
        return {"jsonrpc": "2.0", "id": req_id, "result": result}
    except PaymeError as e:
        return {"jsonrpc": "2.0", "id": req_id, "error": {"code": e.code, "message": e.message}}
    except KeyError:
        return {
            "jsonrpc": "2.0",
            "id": req_id,
            "error": {"code": -32600, "message": {"ru": "Неверный запрос", "uz": "Noto'g'ri so'rov", "en": "Invalid request"}},
        }
    except Exception:
        return {
            "jsonrpc": "2.0",
            "id": req_id,
            "error": {"code": -32400, "message": {"ru": "Системная ошибка", "uz": "Tizim xatosi", "en": "System error"}},
        }
