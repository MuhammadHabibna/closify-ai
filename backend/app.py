"""
Closify AI - FastAPI Server Application
Menyediakan REST API untuk komunikasi Web Widget dan menyajikan tampilan website
toko e-commerce Arunika Apparel secara terintegrasi.
"""

import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from typing import Optional

from agent import ClosifyAgent
from tools import settle_payment_simulation, INVENTORY_DATA, ACTIVE_ORDERS

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUBLIC_DIR = os.path.join(BASE_DIR, "public")

app = FastAPI(
    title="Closify AI - Autonomous Sales Agent API",
    version="1.0.0",
    description="Backend Server untuk Closify AI Sales Closer pada Arunika Apparel"
)

# Enable CORS for external embedding
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

agent = ClosifyAgent()


class ChatRequest(BaseModel):
    message: str
    session_id: Optional[str] = "default_session"


class SettleRequest(BaseModel):
    order_id: str


@app.post("/api/chat")
async def chat_endpoint(req: ChatRequest):
    if not req.message.strip():
        raise HTTPException(status_code=400, detail="Pesan tidak boleh kosong.")
    
    response = agent.process_message(req.message, session_id=req.session_id)
    return response


@app.get("/api/products")
async def get_products():
    return INVENTORY_DATA


@app.post("/api/pay/settle")
async def settle_order(req: SettleRequest):
    result = settle_payment_simulation(req.order_id)
    if result.get("status") == "error":
        raise HTTPException(status_code=404, detail=result.get("message"))
    return result


@app.get("/api/orders/{order_id}")
async def get_order_status(order_id: str):
    if order_id not in ACTIVE_ORDERS:
        raise HTTPException(status_code=404, detail="Order tidak ditemukan.")
    return ACTIVE_ORDERS[order_id]


@app.get("/api/rate-limit-status")
async def get_rate_limit_status():
    from rate_limiter import rate_limiter
    return rate_limiter.get_status()


# Mount frontend static files
app.mount("/", StaticFiles(directory=PUBLIC_DIR, html=True), name="static")


if __name__ == "__main__":
    import uvicorn
    host = os.getenv("HOST", "0.0.0.0")
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("app:app", host=host, port=port, reload=True)
