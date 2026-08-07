import json
import os
import hashlib
import hmac
from typing import Dict, Any, List

ORDERS_FILE = os.path.join(os.path.dirname(__file__), 'orders.json')

def verify_telegram_init_data(init_data: str, bot_token: str) -> bool:
    if not init_data:
        return False
        
    try:
        parsed_data = dict(qc.split("=") for qc in init_data.split("&"))
        received_hash = parsed_data.pop('hash', '')
        if not received_hash:
            return False

        data_check_string = '\n'.join(f'{k}={parsed_data[k]}' for k in sorted(parsed_data.keys()))
        secret_key = hmac.new("WebAppData".encode(), bot_token.encode(), hashlib.sha256).digest()
        calculated_hash = hmac.new(secret_key, data_check_string.encode(), hashlib.sha256).hexdigest()
        
        return calculated_hash == received_hash
    except:
        return False

def get_orders() -> List[Dict[str, Any]]:
    if not os.path.exists(ORDERS_FILE):
        return []
    try:
        with open(ORDERS_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    except:
        return []

def save_order_json(order: Dict[str, Any]):
    orders = get_orders()
    orders.append(order)
    with open(ORDERS_FILE, 'w', encoding='utf-8') as f:
        json.dump(orders, f, indent=2, ensure_ascii=False)
    return order

def update_order_status_json(order_id: str, status: str) -> Dict[str, Any] | None:
    orders = get_orders()
    target_order = None
    
    for order in orders:
        if str(order.get('id')) == str(order_id):
            order['status'] = status
            if 'statusHistory' not in order:
                order['statusHistory'] = []
            import datetime
            order['statusHistory'].append({
                'status': status,
                'time': datetime.datetime.now().isoformat()
            })
            target_order = order
            break
            
    if target_order:
        with open(ORDERS_FILE, 'w', encoding='utf-8') as f:
            json.dump(orders, f, indent=2, ensure_ascii=False)
            
    return target_order


# ---------------------------------------------------------------------------
# Payme / Click integration helpers (added on top of the existing storage,
# existing functions above are untouched for backward compatibility).
# ---------------------------------------------------------------------------

PAYME_TX_FILE = os.path.join(os.path.dirname(__file__), 'payme_transactions.json')
CLICK_TX_FILE = os.path.join(os.path.dirname(__file__), 'click_transactions.json')


def _load_json_list(path: str) -> List[Dict[str, Any]]:
    if not os.path.exists(path):
        return []
    try:
        with open(path, 'r', encoding='utf-8') as f:
            return json.load(f)
    except:
        return []


def _save_json_list(path: str, data: List[Dict[str, Any]]):
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)


def get_order_by_id(order_id: str) -> Dict[str, Any] | None:
    for order in get_orders():
        if str(order.get('id')) == str(order_id):
            return order
    return None


def update_order_payment(order_id: str, **fields) -> Dict[str, Any] | None:
    """Patch arbitrary payment-related fields (paymentStatus, paymentProvider, paidAt, ...) on an order."""
    orders = get_orders()
    target_order = None

    for order in orders:
        if str(order.get('id')) == str(order_id):
            order.update(fields)
            target_order = order
            break

    if target_order:
        _save_json_list(ORDERS_FILE, orders)

    return target_order


def create_order(customer: Dict[str, Any], items: List[Dict[str, Any]], total_price: float,
                  payment_method: str = "cash") -> Dict[str, Any]:
    """Shared order-creation helper used by both the REST API (main.py) and the Telegram
    bot's chat checkout flow, so every order (regardless of origin) ends up in orders.json
    and can be looked up by Payme/Click via get_order_by_id()."""
    import time as _time

    payment_method = (payment_method or "cash").lower()
    if payment_method not in ("cash", "payme", "click"):
        payment_method = "cash"

    order = {
        "id": str(int(_time.time() * 1000))[-6:],
        "customer": customer,
        "items": items,
        "totalPrice": total_price,
        "createdAt": _time.strftime('%Y-%m-%d %H:%M:%S'),
        "status": "new",
        "paymentMethod": payment_method,
        "paymentStatus": "cod" if payment_method == "cash" else "pending",
        "paymentProvider": None,
    }
    save_order_json(order)
    return order


def get_payme_transaction(tx_id: str) -> Dict[str, Any] | None:
    for tx in _load_json_list(PAYME_TX_FILE):
        if str(tx.get('id')) == str(tx_id):
            return tx
    return None


def list_payme_transactions() -> List[Dict[str, Any]]:
    return _load_json_list(PAYME_TX_FILE)


def save_payme_transaction(tx: Dict[str, Any]):
    txs = _load_json_list(PAYME_TX_FILE)
    for i, existing in enumerate(txs):
        if str(existing.get('id')) == str(tx['id']):
            txs[i] = tx
            _save_json_list(PAYME_TX_FILE, txs)
            return
    txs.append(tx)
    _save_json_list(PAYME_TX_FILE, txs)


def get_click_transaction(click_trans_id: str) -> Dict[str, Any] | None:
    for tx in _load_json_list(CLICK_TX_FILE):
        if str(tx.get('click_trans_id')) == str(click_trans_id):
            return tx
    return None


def save_click_transaction(tx: Dict[str, Any]):
    txs = _load_json_list(CLICK_TX_FILE)
    for i, existing in enumerate(txs):
        if str(existing.get('click_trans_id')) == str(tx['click_trans_id']):
            txs[i] = tx
            _save_json_list(CLICK_TX_FILE, txs)
            return
    txs.append(tx)
    _save_json_list(CLICK_TX_FILE, txs)
