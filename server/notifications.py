"""
Optional admin notification for new orders.

This is intentionally NOT a Telegram bot: there is no polling, no webhook,
no commands, no menus. It's a single outbound HTTP call to the Telegram
Bot API's sendMessage method, fired once per new order so the admin gets
pinged on their phone.

If BOT_TOKEN or ADMIN_ID are not set in .env, this silently does nothing
and the website keeps working normally — notifications are optional.
"""
import os
import httpx

BOT_TOKEN = os.getenv("BOT_TOKEN", "")
ADMIN_ID = os.getenv("ADMIN_ID", "")

PAYMENT_LABELS = {"cash": "Наличные", "payme": "Payme", "click": "Click"}


async def notify_admin(order: dict) -> None:
    if not BOT_TOKEN or not ADMIN_ID:
        return

    items_list = "\n".join(f"- {i['name']} x{i['count']}" for i in order.get("items", []))
    payment_method = order.get("paymentMethod", "cash")
    payment_line = f"💳 Оплата: {PAYMENT_LABELS.get(payment_method, 'Наличные')}"
    if order.get("paymentStatus") == "paid":
        payment_line += " ✅ оплачено"
    elif payment_method in ("payme", "click"):
        payment_line += " ⏳ ожидает оплаты"

    customer = order.get("customer", {})
    comment = customer.get("comment")
    comment_line = f"📝 {comment}\n" if comment else ""

    text = (
        f"🍕 Новый заказ #{order.get('id')}\n\n"
        f"👤 {customer.get('name', '-')}\n"
        f"📱 {customer.get('phone', '-')}\n"
        f"📍 {customer.get('address', '-')}\n"
        f"{comment_line}"
        f"{payment_line}\n\n"
        f"🛒 Заказ:\n{items_list}\n\n"
        f"💰 Итого: {order.get('totalPrice', 0):,.0f} сум"
    )

    try:
        async with httpx.AsyncClient(timeout=10) as client:
            await client.post(
                f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage",
                json={"chat_id": ADMIN_ID, "text": text},
            )
    except Exception:
        # Never let a notification failure break order creation.
        pass
