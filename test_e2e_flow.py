import sys
import os
import json
from fastapi.testclient import TestClient

# Pastikan path backend terdaftar
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "backend"))
from app import app

client = TestClient(app)
session_id = "e2e_session_live_test"

print("========================================")
print("=== CLOSIFY AI FULL E2E TEST COMMENCING ===")
print("========================================")

# TURN 1: User menanyakan One Piece
print("\n[STEP 1] User: 'one piece sih kak'")
r1 = client.post("/api/chat", json={"message": "one piece sih kak", "session_id": session_id})
assert r1.status_code == 200, f"Error Turn 1: {r1.text}"
d1 = r1.json()
print("Source:", d1.get("source"))
print("Tool Called:", d1.get("tool_called"))
print("Reply Excerpt:", d1.get("reply")[:160] + "...")
print("UI Card:", d1.get("ui_card", {}).get("type") if d1.get("ui_card") else "None")
assert "One Piece" in str(d1.get("reply")) or "Linen" in str(d1.get("reply")), "Turn 1 reply should mention One Piece!"

# TURN 2: Konsultasi Ukuran (Zero Return Protocol) dengan kata ganti 'produk ini'
print("\n[STEP 2] User: 'Saya berminat produk ini, tinggi 173 berat 67 cocok ukuran apa ya?'")
r2 = client.post("/api/chat", json={"message": "Saya berminat produk ini, tinggi 173 berat 67 cocok ukuran apa ya?", "session_id": session_id})
assert r2.status_code == 200, f"Error Turn 2: {r2.text}"
d2 = r2.json()
print("Source:", d2.get("source"))
print("Tool Called:", d2.get("tool_called"))
print("Reply Excerpt:", d2.get("reply")[:160] + "...")
print("UI Card:", d2.get("ui_card", {}).get("type") if d2.get("ui_card") else "None")
assert d2.get("ui_card") is not None, "Turn 2 should return a UI card!"
assert d2.get("ui_card", {}).get("type") == "SIZE_RECOMMENDATION_CARD", "Turn 2 card should be SIZE_RECOMMENDATION_CARD!"
print("Recommended Size:", d2.get("ui_card", {}).get("recommended_size"))

# TURN 3: Pilih Opsi Pengiriman
print("\n[STEP 3] User: 'Kirim ke Jakarta Selatan kak, pakai green delivery'")
r3 = client.post("/api/chat", json={"message": "Kirim ke Jakarta Selatan kak, pakai green delivery", "session_id": session_id})
assert r3.status_code == 200, f"Error Turn 3: {r3.text}"
d3 = r3.json()
print("Source:", d3.get("source"))
print("Tool Called:", d3.get("tool_called"))
print("Reply Excerpt:", d3.get("reply")[:160] + "...")
print("UI Card:", d3.get("ui_card", {}).get("type") if d3.get("ui_card") else "None")

# TURN 4: Persetujuan Checkout & Terbitkan QRIS Dinamis
print("\n[STEP 4] User: 'Iya buatkan QRIS nya sekarang kak, siap bayar'")
r4 = client.post("/api/chat", json={"message": "Iya buatkan QRIS nya sekarang kak, siap bayar", "session_id": session_id})
assert r4.status_code == 200, f"Error Turn 4: {r4.text}"
d4 = r4.json()
print("Source:", d4.get("source"))
print("Tool Called:", d4.get("tool_called"))
print("Reply Excerpt:", d4.get("reply")[:160] + "...")
card4 = d4.get("ui_card")
print("UI Card Type:", card4.get("type") if card4 else "None")
assert card4 is not None, "Turn 4 should return PAYMENT_QRIS_CARD!"
assert card4.get("type") == "PAYMENT_QRIS_CARD", "Turn 4 card must be PAYMENT_QRIS_CARD!"
order_id = card4.get("order_id")
print("Generated Order ID:", order_id)
print("QRIS Image URL:", card4.get("qris_url"))
print("Grand Total:", card4.get("grand_total"))

# TURN 5: Simulasi Settlement Pembayaran
print(f"\n[STEP 5] Simulasi Pembayaran Order '{order_id}'")
r5 = client.post("/api/pay/settle", json={"order_id": order_id})
assert r5.status_code == 200, f"Error Settlement: {r5.text}"
d5 = r5.json()
print("Settlement Status:", d5.get("status"))
print("Payment Status:", d5.get("payment_status"))
assert d5.get("status") == "success", "Settlement should be success!"
assert d5.get("payment_status") == "settlement", "Payment status must be settlement!"

print("\n========================================")
print(">>> ALL 5 E2E STEPS PASSED PERFECTLY! <<<")
print("========================================")
