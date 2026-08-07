import uvicorn
import os
import time
from fastapi import FastAPI, HTTPException, Request, Header
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import List, Optional
from dotenv import load_dotenv

from utils import save_order_json, get_order_by_id
from notifications import notify_admin
import payme
import click_pay

load_dotenv()


class Customer(BaseModel):
    name: str
    phone: str
    address: str
    comment: Optional[str] = None
    paymentMethod: str = "cash"


class OrderItem(BaseModel):
    id: str
    name: str
    count: int
    price: float


class OrderDetails(BaseModel):
    customer: Customer
    items: List[OrderItem]
    totalPrice: float


class OrderRequest(BaseModel):
    orderDetails: OrderDetails


app = FastAPI(title="American Pizza API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
async def health():
    return {"status": "ok"}


@app.post("/api/orders")
async def create_order(order_req: OrderRequest):
    new_order = order_req.orderDetails.dict()
    new_order['id'] = str(int(time.time() * 1000))[-6:]
    new_order['createdAt'] = time.strftime('%Y-%m-%d %H:%M:%S')
    new_order['status'] = 'new'

    payment_method = (new_order.get('customer', {}).get('paymentMethod') or 'cash').lower()
    if payment_method not in ('cash', 'payme', 'click'):
        payment_method = 'cash'
    new_order['paymentMethod'] = payment_method
    new_order['paymentStatus'] = 'cod' if payment_method == 'cash' else 'pending'
    new_order['paymentProvider'] = None

    save_order_json(new_order)
    await notify_admin(new_order)

    payment_url = None
    if payment_method == 'payme':
        payment_url = payme.build_checkout_link(new_order['id'], new_order['totalPrice'])
    elif payment_method == 'click':
        payment_url = click_pay.build_checkout_link(new_order['id'], new_order['totalPrice'])

    return {"success": True, "orderId": new_order['id'], "paymentUrl": payment_url}


@app.post("/payments/payme")
async def payme_webhook(request: Request, authorization: Optional[str] = Header(None)):
    """Payme Merchant (Subscribe) API endpoint. Register this exact URL in the Payme merchant cabinet."""
    if not payme.verify_auth(authorization):
        return JSONResponse({
            "jsonrpc": "2.0",
            "id": None,
            "error": {"code": -32504, "message": {"ru": "Ошибка авторизации", "uz": "Avtorizatsiya xatosi", "en": "Authorization error"}},
        })
    try:
        body = await request.json()
    except Exception:
        return JSONResponse({
            "jsonrpc": "2.0",
            "id": None,
            "error": {"code": -32700, "message": {"ru": "Ошибка парсинга", "uz": "Tahlil xatosi", "en": "Parse error"}},
        })
    return JSONResponse(payme.handle_request(body))


@app.post("/payments/click/prepare")
async def click_prepare(request: Request):
    """Click Merchant API - Prepare step. Register this URL in the Click merchant cabinet."""
    form = await request.form()
    return JSONResponse(click_pay.prepare(dict(form)))


@app.post("/payments/click/complete")
async def click_complete(request: Request):
    """Click Merchant API - Complete step. Register this URL in the Click merchant cabinet."""
    form = await request.form()
    return JSONResponse(click_pay.complete(dict(form)))


@app.get("/api/orders/{order_id}/payment-link")
async def get_payment_link(order_id: str, method: str):
    """Convenience endpoint: returns a fresh Payme/Click checkout link for an existing order."""
    order = get_order_by_id(order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    if method == 'payme':
        return {"url": payme.build_checkout_link(order_id, order['totalPrice'])}
    elif method == 'click':
        return {"url": click_pay.build_checkout_link(order_id, order['totalPrice'])}
    raise HTTPException(status_code=400, detail="Unknown payment method")


if __name__ == "__main__":
    port = int(os.getenv("PORT", 3001))
    uvicorn.run(app, host="0.0.0.0", port=port)
