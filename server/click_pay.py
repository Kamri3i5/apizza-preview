"""
Click (click.uz) Merchant Shop API integration.

Docs: https://docs.click.uz/en/click-api-request/
Click calls POST /payments/click/prepare and then POST /payments/click/complete
on our server (application/x-www-form-urlencoded), and expects a JSON response
back with the fields below.

File named `click_pay.py` (not `click.py`) to avoid any chance of shadowing
the unrelated third-party `click` CLI library.
"""
import hashlib
import os
import time

from utils import get_order_by_id, update_order_payment, get_click_transaction, save_click_transaction

CLICK_SERVICE_ID = os.getenv("CLICK_SERVICE_ID", "")
CLICK_MERCHANT_ID = os.getenv("CLICK_MERCHANT_ID", "")
CLICK_MERCHANT_USER_ID = os.getenv("CLICK_MERCHANT_USER_ID", "")
CLICK_SECRET_KEY = os.getenv("CLICK_SECRET_KEY", "")

# Click's own error codes (subset used here)
ERR_SUCCESS = 0
ERR_SIGN_FAILED = -1
ERR_BAD_AMOUNT = -2
ERR_ACTION_NOT_FOUND = -3
ERR_ALREADY_PAID = -4
ERR_ORDER_NOT_FOUND = -5
ERR_TRANSACTION_NOT_FOUND = -6
ERR_BAD_REQUEST = -8
ERR_TRANSACTION_CANCELLED = -9


def build_checkout_link(order_id: str, amount_uzs: float, return_url: str = "") -> str:
    """Builds the my.click.uz checkout link shown to the customer to pay an order."""
    params = (
        f"service_id={CLICK_SERVICE_ID}"
        f"&merchant_id={CLICK_MERCHANT_ID}"
        f"&amount={float(amount_uzs):.2f}"
        f"&transaction_param={order_id}"
    )
    if return_url:
        params += f"&return_url={return_url}"
    return f"https://my.click.uz/services/pay?{params}"


def _sign(*parts) -> str:
    return hashlib.md5("".join(str(p) for p in parts).encode()).hexdigest()


def _response(code, note, click_trans_id="", merchant_trans_id="", merchant_prepare_id="", merchant_confirm_id=None):
    resp = {
        "click_trans_id": click_trans_id,
        "merchant_trans_id": merchant_trans_id,
        "error": code,
        "error_note": note,
    }
    if merchant_confirm_id is not None:
        resp["merchant_confirm_id"] = merchant_confirm_id
    else:
        resp["merchant_prepare_id"] = merchant_prepare_id
    return resp


def prepare(data: dict) -> dict:
    click_trans_id = data.get("click_trans_id", "")
    service_id = data.get("service_id", "")
    merchant_trans_id = data.get("merchant_trans_id", "")
    amount = data.get("amount", "")
    action = data.get("action", "")
    sign_time = data.get("sign_time", "")
    sign_string = data.get("sign_string", "")

    expected_sign = _sign(click_trans_id, service_id, CLICK_SECRET_KEY, merchant_trans_id, amount, action, sign_time)
    if not CLICK_SECRET_KEY or expected_sign != sign_string:
        return _response(ERR_SIGN_FAILED, "SIGN CHECK FAILED", click_trans_id, merchant_trans_id)

    order = get_order_by_id(merchant_trans_id)
    if not order:
        return _response(ERR_ORDER_NOT_FOUND, "Order not found", click_trans_id, merchant_trans_id)

    try:
        if round(float(amount), 2) != round(float(order["totalPrice"]), 2):
            return _response(ERR_BAD_AMOUNT, "Incorrect parameter amount", click_trans_id, merchant_trans_id)
    except (TypeError, ValueError):
        return _response(ERR_BAD_AMOUNT, "Incorrect parameter amount", click_trans_id, merchant_trans_id)

    if order.get("paymentStatus") == "paid":
        return _response(ERR_ALREADY_PAID, "Already paid", click_trans_id, merchant_trans_id)

    existing = get_click_transaction(click_trans_id)
    if existing and existing.get("cancelled"):
        return _response(ERR_TRANSACTION_CANCELLED, "Transaction cancelled", click_trans_id, merchant_trans_id)

    merchant_prepare_id = existing["merchant_prepare_id"] if existing else int(time.time() * 1000)

    save_click_transaction({
        "click_trans_id": click_trans_id,
        "merchant_trans_id": merchant_trans_id,
        "merchant_prepare_id": merchant_prepare_id,
        "amount": amount,
        "prepared": True,
        "completed": False,
        "cancelled": False,
    })
    update_order_payment(order["id"], paymentStatus="pending", paymentProvider="click")

    return _response(ERR_SUCCESS, "Success", click_trans_id, merchant_trans_id, merchant_prepare_id=merchant_prepare_id)


def complete(data: dict) -> dict:
    click_trans_id = data.get("click_trans_id", "")
    service_id = data.get("service_id", "")
    merchant_trans_id = data.get("merchant_trans_id", "")
    merchant_prepare_id = data.get("merchant_prepare_id", "")
    amount = data.get("amount", "")
    action = data.get("action", "")
    sign_time = data.get("sign_time", "")
    sign_string = data.get("sign_string", "")
    error = int(data.get("error", 0) or 0)

    expected_sign = _sign(click_trans_id, service_id, CLICK_SECRET_KEY, merchant_trans_id, merchant_prepare_id, amount, action, sign_time)
    if not CLICK_SECRET_KEY or expected_sign != sign_string:
        return _response(ERR_SIGN_FAILED, "SIGN CHECK FAILED", click_trans_id, merchant_trans_id, merchant_prepare_id)

    tx = get_click_transaction(click_trans_id)
    if not tx or not tx.get("prepared"):
        return _response(ERR_TRANSACTION_NOT_FOUND, "Transaction does not exist", click_trans_id, merchant_trans_id, merchant_prepare_id)

    order = get_order_by_id(merchant_trans_id)
    if not order:
        return _response(ERR_ORDER_NOT_FOUND, "Order not found", click_trans_id, merchant_trans_id, merchant_prepare_id)

    if error < 0:
        tx["cancelled"] = True
        save_click_transaction(tx)
        update_order_payment(order["id"], paymentStatus="cancelled", paymentProvider="click")
        return _response(ERR_TRANSACTION_CANCELLED, "Transaction cancelled by Click", click_trans_id, merchant_trans_id, merchant_confirm_id=merchant_prepare_id)

    if tx.get("completed"):
        return _response(ERR_SUCCESS, "Success", click_trans_id, merchant_trans_id, merchant_confirm_id=tx["merchant_prepare_id"])

    tx["completed"] = True
    save_click_transaction(tx)
    update_order_payment(order["id"], paymentStatus="paid", paymentProvider="click", paidAt=int(time.time() * 1000))

    return _response(ERR_SUCCESS, "Success", click_trans_id, merchant_trans_id, merchant_confirm_id=merchant_prepare_id)
