"""
Closify AI - Master Agent Orchestrator
Mengintegrasikan model live Gemini 3.5 Flash Lite, eksekusi tool calling,
pemetaan kartu visual UI, dan Smart Fallback Engine saat kuota API terbatas.
"""

import json
import logging
import os
import re
from typing import Any, Dict, List, Optional

from config import GEMINI_API_KEY
from gemini_engine import GeminiLiveEngine
from rate_limiter import rate_limiter
from tools import (
    check_inventory_and_specs,
    check_size_recommendation,
    calculate_shipping_options,
    generate_in_chat_payment,
    settle_payment_simulation,
    ACTIVE_ORDERS
)

logger = logging.getLogger("ClosifyAgent")

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SYSTEM_PROMPT_PATH = os.path.join(BASE_DIR, "SYSTEM_PROMPT_SALES_AGENT.md")

with open(SYSTEM_PROMPT_PATH, "r", encoding="utf-8") as f:
    SYSTEM_INSTRUCTION = f.read()


EMOJI_PATTERN = re.compile(
    r'[\U00010000-\U0010ffff]|[\u2600-\u26ff]|[\u2700-\u27bf]',
    flags=re.UNICODE
)

def strip_emojis(text: str) -> str:
    if not text:
        return ""
    cleaned = EMOJI_PATTERN.sub('', text)
    return re.sub(r' +', ' ', cleaned).strip()


def get_product_image(p: Dict[str, Any]) -> str:
    pid = str(p.get("product_id", "")).upper()
    slug = str(p.get("slug", "")).lower()
    name = str(p.get("name", "")).lower()
    if "002" in pid or "aot" in slug or "titan" in name or "oxford" in name:
        return "/assets/prod_aot_oxford.jpg"
    if "003" in pid or "one-piece" in slug or "nika" in name or "linen" in name:
        return "/assets/prod_op_linen.jpg"
    if "004" in pid or "csm" in slug or "chino" in name or "chainsaw" in name:
        return "/assets/prod_csm_chino.svg"
    return "/assets/prod_jjk_tee.jpg"


class ClosifyAgent:
    def __init__(self, api_key: str = ""):
        self.api_key = api_key or GEMINI_API_KEY
        self.system_prompt = SYSTEM_INSTRUCTION
        self.live_engine = GeminiLiveEngine(
            api_key=self.api_key,
            system_prompt=self.system_prompt
        )
        # Memory Sesi Multi-Turn: session_id -> { "history": List[Dict], "last_product": str, "last_sku": str }
        self.sessions: Dict[str, Dict[str, Any]] = {}

    def process_message(self, user_message: str, session_id: str = "default") -> Dict[str, Any]:
        """
        Memproses pesan dari pengguna:
        1. Menyimpan dan membaca memori percakapan multi-turn berdasarkan session_id.
        2. Mencoba memanggil live Gemini 3.5 Flash Lite dengan Function Calling lengkap dengan riwayat chat.
        3. Jika berhasil, membangun kartu UI interaktif berdasarkan tool yang dipanggil.
        4. Jika terkena rate limit (RPM/RPD) atau offline, otomatis beralih ke Smart Fallback Engine kontekstual.
        """
        user_clean = user_message.strip()
        logger.info(f"[USER MESSAGE] '{user_clean}' (Session: {session_id})")

        # Inisialisasi memori sesi jika belum ada
        if session_id not in self.sessions:
            self.sessions[session_id] = {
                "history": [],
                "last_product": "",
                "last_sku": ""
            }
        session = self.sessions[session_id]
        history = session["history"]

        # Deteksi kontekstual produk dari pesan pengguna untuk memperbarui fokus sesi
        user_lower = user_clean.lower()
        if "one piece" in user_lower or "linen" in user_lower or "nika" in user_lower:
            session["last_product"] = "Arunika x One Piece Sun God Linen"
            session["last_sku"] = "OP-BWT-L"
        elif "aot" in user_lower or "oxford" in user_lower or "scout" in user_lower:
            session["last_product"] = "Arunika x AoT Wings of Freedom Oxford"
            session["last_sku"] = "AOT-OLV-L"
        elif "csm" in user_lower or "chino" in user_lower or "chainsaw" in user_lower:
            session["last_product"] = "Arunika x Chainsaw Man Ankle Chino"
            session["last_sku"] = "CSM-BLK-32"
        elif "gojo" in user_lower or "jjk" in user_lower or "satoru" in user_lower:
            session["last_product"] = "Kaos Boxy Gojo Satoru 'The Honored One'"
            session["last_sku"] = "JJK-WSH-L"

        # Ekstrak respons terakhir dari bot untuk kontinuitas konteks yang kuat
        last_bot_reply = ""
        if history:
            for past_turn in reversed(history):
                if past_turn.get("role") == "model":
                    parts = past_turn.get("parts", [])
                    if parts and "text" in parts[0]:
                        last_bot_reply = parts[0]["text"].strip()
                        break

        # Susun prefix konteks percakapan untuk Gemini
        context_cues = []
        if session.get("last_product"):
            context_cues.append(f"Produk aktif yang sedang dibahas: '{session['last_product']}'")
        if last_bot_reply:
            # Ambil intisari pesan bot terakhir (maksimal 200 karakter)
            snippet = (last_bot_reply[:200] + "...") if len(last_bot_reply) > 200 else last_bot_reply
            context_cues.append(f"Respons/pertanyaan Closify sebelumnya: \"{snippet}\"")

        prompt_for_gemini = user_clean
        if context_cues:
            prompt_for_gemini = f"[Konteks Percakapan: {' | '.join(context_cues)}]\nPesan Pengguna: {user_clean}"

        # Coba jalankan via Live Gemini 3.5 Flash Lite dengan riwayat percakapan multi-turn
        success, reply_text, tool_name, tool_data = self.live_engine.execute_chat_with_tools(
            prompt_for_gemini,
            conversation_history=history[-10:]
        )

        if success and reply_text:
            logger.info(f"[RESPONSE VIA LIVE GEMINI 3.5] Tool: {tool_name}")
            cleaned_reply = strip_emojis(reply_text)
            
            # Perbarui produk terakhir jika tool mengembalikan produk spesifik dan relevan
            if tool_name in ["check_inventory_and_specs", "check_inventory"] and tool_data and tool_data.get("products"):
                p_first = tool_data["products"][0]
                has_product_mention = any(k in user_lower for k in ["one piece", "nika", "gojo", "jjk", "satoru", "aot", "oxford", "scout", "csm", "chino", "chainsaw"])
                if not session.get("last_product") or has_product_mention:
                    session["last_product"] = p_first.get("name", session.get("last_product", ""))
                    if p_first.get("variants"):
                        session["last_sku"] = p_first["variants"][0].get("sku_id", session.get("last_sku", ""))

            # Simpan giliran percakapan ke memori sesi
            history.append({"role": "user", "parts": [{"text": user_clean}]})
            history.append({"role": "model", "parts": [{"text": cleaned_reply}]})

            ui_card = self._build_ui_card(tool_name, tool_data, user_clean)
            return {
                "source": "gemini_3.5_flash_lite",
                "reply": cleaned_reply,
                "tool_called": tool_name,
                "tool_data": tool_data,
                "ui_card": ui_card,
                "rate_limit": rate_limiter.get_status()
            }

        # Fallback Engine Kontekstual (Jika terkena limitasi RPM/RPD atau kendala jaringan)
        logger.info("[RESPONSE VIA SMART LOCAL FALLBACK ENGINE]")
        res = self._smart_fallback_engine(user_clean, session)
        cleaned_reply = strip_emojis(res.get("reply", ""))
        res["reply"] = cleaned_reply

        # Simpan giliran fallback ke riwayat sesi
        history.append({"role": "user", "parts": [{"text": user_clean}]})
        history.append({"role": "model", "parts": [{"text": cleaned_reply}]})
        return res

    def _build_ui_card(self, tool_name: Optional[str], tool_data: Optional[Dict[str, Any]], user_text: str) -> Optional[Dict[str, Any]]:
        """Membangun kartu visual UI chat berdasarkan balasan data tool."""
        if not tool_name or not tool_data:
            return None

        # Kartu Inventaris
        if tool_name in ["check_inventory_and_specs", "check_inventory"]:
            products = tool_data.get("products", [])
            if products:
                p = products[0]
                available_sizes = [v["size"] for v in p.get("variants", []) if v.get("stock", 0) > 0]
                img_url = get_product_image(p)

                return {
                    "type": "PRODUCT_SPOTLIGHT_CARD",
                    "product_id": p.get("product_id"),
                    "name": p.get("name"),
                    "price_formatted": f"Rp{p.get('base_price', 0):,}".replace(",", "."),
                    "material": p.get("material"),
                    "available_sizes": available_sizes,
                    "image_url": img_url
                }

        # Kartu Rekomendasi Ukuran (Zero Return Protocol)
        if tool_name in ["check_size_recommendation", "recommend_size"]:
            return {
                "type": "SIZE_RECOMMENDATION_CARD",
                "recommended_size": tool_data.get("recommended_size", "L"),
                "fit_type": tool_data.get("fit_type", "Regular Fit"),
                "explanation": tool_data.get("explanation", "Ukuran pas di badan.")
            }

        # Kartu Opsi Pengiriman
        if tool_name in ["calculate_shipping_options", "calculate_shipping"]:
            options = tool_data.get("options", {})
            return {
                "type": "SHIPPING_OPTIONS_CARD",
                "destination": tool_data.get("destination", "Jakarta"),
                "green_delivery": options.get("green_delivery", {}),
                "regular": options.get("regular", {})
            }

        # Kartu Pembayaran QRIS Dinamis
        if tool_name in ["generate_in_chat_payment", "generate_payment"]:
            return {
                "type": "PAYMENT_QRIS_CARD",
                "order_id": tool_data.get("order_id"),
                "grand_total": tool_data.get("grand_total_formatted"),
                "qris_url": tool_data.get("qris_image_url"),
                "countdown": 900,
                "item_name": "Arunika Streetwear Order",
                "courier": "Eco Green Delivery (Rp9.000)",
                "status": "pending"
            }

        return None

    def _smart_fallback_engine(self, msg_clean: str, session: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """Mesin respons deterministik cadangan kontekstual untuk demo bebas hambatan."""
        msg_lower = msg_clean.lower()

        # 1. Order Intent (Offer breakdown & ask consent before issuing QRIS)
        is_payment_confirmation = any(w in msg_lower for w in ["qris", "bayar", "transfer", "siap bayar", "buatkan qris", "minta qris", "proses bayar", "lanjut bayar", "kirim qris", "tagihan", "checkout"])

        # Deteksi produk aktif dari sesi jika tidak disebutkan ulang dalam pesan saat ini
        active_prod = (session.get("last_product", "") if session else "").lower()

        if not is_payment_confirmation and any(w in msg_lower for w in ["ambil", "pesan", "bungkus", "mau yang", "kirim ke", "pilih", "senopati", "jakarta", "alamat", "green"]):
            product_name = "Kaos Boxy Gojo Satoru 'The Honored One' (Size L)"
            total_price = "Rp178.000"
            if "oxford" in msg_lower or "aot" in msg_lower or "oxford" in active_prod or "aot" in active_prod:
                product_name = "Kemeja AoT Wings of Freedom Oxford (Size L)"
                total_price = "Rp228.000"
            elif "linen" in msg_lower or "one piece" in msg_lower or "nika" in msg_lower or "linen" in active_prod or "one piece" in active_prod:
                product_name = "Kemeja One Piece Sun God Linen (Size L)"
                total_price = "Rp238.000"
            elif "chino" in msg_lower or "csm" in msg_lower or "chino" in active_prod or "chainsaw" in active_prod:
                product_name = "Celana Chino Chainsaw Man (Size 32)"
                total_price = "Rp248.000"

            return {
                "source": "smart_local_engine",
                "reply": (
                    f"Siap Kak! 1 pcs {product_name} sudah aku amankan sementara ya.\n\n"
                    f"Rincian biaya pesanan:\n"
                    f"- Produk: {product_name}\n"
                    f"- Pengiriman: Eco Green Delivery (Rp9.000)\n"
                    f"- Total Pembayaran: {total_price}\n\n"
                    f"Alamat pengiriman sudah tercatat. Mau langsung aku buatkan barcode QRIS pembayarannya sekarang biar stok sisa 4 pcs ini langsung terkunci aman buat Kakak?"
                ),
                "tool_called": "calculate_shipping_options",
                "tool_data": {},
                "ui_card": None,
                "rate_limit": rate_limiter.get_status()
            }

        # 2. Checkout & Payment (Generate QRIS only after user agrees or explicitly requests QRIS/bayar)
        if is_payment_confirmation:
            product_sku = "JJK-WSH-L"
            product_name = "Arunika x JJK Limitless Boxy Tee (L)"
            price = 169000

            if "oxford" in msg_lower or "aot" in msg_lower or "oxford" in active_prod or "aot" in active_prod:
                product_sku = "AOT-OLV-L"
                product_name = "Arunika x AoT Wings of Freedom Oxford (L)"
                price = 219000
            elif "linen" in msg_lower or "one piece" in msg_lower or "nika" in msg_lower or "linen" in active_prod or "one piece" in active_prod:
                product_sku = "OP-BWT-L"
                product_name = "Arunika x One Piece Sun God Linen (L)"
                price = 229000
            elif "chino" in msg_lower or "csm" in msg_lower or "chino" in active_prod or "chainsaw" in active_prod:
                product_sku = "CSM-BLK-32"
                product_name = "Arunika x Chainsaw Man Ankle Chino (32)"
                price = 239000

            pay_res = generate_in_chat_payment(
                items=[{"sku_id": product_sku, "name": product_name, "quantity": 1, "price_per_unit": price}],
                customer_name="Kak Pelanggan",
                phone_number="0812-9876-5432",
                shipping_address="Jl. Tebet Timur Dalam, Jakarta Selatan",
                courier_service="green_delivery",
                shipping_cost=9000
            )

            ui_card = {
                "type": "PAYMENT_QRIS_CARD",
                "order_id": pay_res["order_id"],
                "grand_total": pay_res["grand_total_formatted"],
                "qris_url": pay_res["qris_image_url"],
                "countdown": 900,
                "item_name": product_name,
                "courier": "Green Delivery (Rp9.000)",
                "status": "pending"
            }

            reply_text = (
                f"Baik Kak, pesanan resmi kami proses dan amankan ke sistem.\n\n"
                f"**Pesanan:** {product_name}\n"
                f"**Total Pembayaran:** {pay_res['grand_total_formatted']} (Termasuk Green Delivery Rp9.000).\n\n"
                f"Barcode Dynamic QRIS resmi Arunika sudah terbit di bawah ini. Anda dapat memindai kode QR menggunakan BCA Mobile, GoPay, OVO, ShopeePay, atau m-Banking pilihan Anda. "
                f"Waktu pembayaran aktif 15 menit. Begitu terverifikasi lunas, pesanan segera masuk antrean packing dari gudang kami di Surabaya."
            )

            return {
                "source": "smart_local_engine",
                "reply": reply_text,
                "tool_called": "generate_in_chat_payment",
                "tool_data": pay_res,
                "ui_card": ui_card,
                "rate_limit": rate_limiter.get_status()
            }

        # 2. Zero Return Protocol
        tb_match = re.search(r'(?:tb|tinggi)\s*[:=]?\s*(\d{2,3})', msg_lower)
        bb_match = re.search(r'(?:bb|berat)\s*[:=]?\s*(\d{2,3})', msg_lower)
        alt_match = re.search(r'(\d{3})\s*(?:cm)?\s*(?:dan|,|\s)\s*(\d{2,3})\s*(?:kg)?', msg_lower)

        if tb_match or bb_match or alt_match:
            tb = float(tb_match.group(1)) if tb_match else (float(alt_match.group(1)) if alt_match else 172.0)
            bb = float(bb_match.group(1)) if bb_match else (float(alt_match.group(2)) if alt_match else 65.0)
            is_pants = any(w in msg_lower for w in ["celana", "chino", "waist", "pinggang"])
            if session and session.get("last_product") and "chino" in session.get("last_product", "").lower():
                is_pants = True
            category = "pants" if is_pants else "tops"

            size_res = check_size_recommendation(height_cm=tb, weight_kg=bb, category=category)
            rec_size = size_res["recommended_size"]

            target_product = session.get("last_product", "koleksi pilihan Kakak") if session else "koleksi Arunika"

            ui_card = {
                "type": "SIZE_RECOMMENDATION_CARD",
                "recommended_size": rec_size,
                "fit_type": size_res["fit_type"],
                "explanation": size_res["explanation"]
            }

            reply_text = (
                f"Berdasarkan proporsi tinggi **{int(tb)} cm** dan berat **{int(bb)} kg** untuk **{target_product}**, "
                f"rekomendasi ukuran paling presisi adalah **Size {rec_size}** Kak.\n\n"
                f"{size_res['explanation']}\n\n"
                f"Fitting ini bakal kasih siluet streetwear yang pas banget di badan tanpa khawatir salah ukuran. "
                f"Untuk pengirimannya mau dicek ke kota mana Kak? Biar langsung aku bantu hitungkan estimasi ongkir hematnya!"
            )

            return {
                "source": "smart_local_engine",
                "reply": reply_text,
                "tool_called": "check_size_recommendation",
                "tool_data": size_res,
                "ui_card": ui_card,
                "rate_limit": rate_limiter.get_status()
            }

        # 3. Shipping Options
        cities = ["jakarta", "tebet", "surabaya", "sidoarjo", "bandung", "semarang", "jogja", "yogyakarta", "medan", "bali", "denpasar"]
        matched_city = next((c for c in cities if c in msg_lower), None)
        if matched_city or any(w in msg_lower for w in ["ongkir", "kirim", "ekspedisi", "kurir"]):
            city_query = matched_city if matched_city else "Jakarta"
            ship_res = calculate_shipping_options(destination_city=city_query, total_weight_grams=300)
            green_opt = ship_res["options"]["green_delivery"]
            reg_opt = ship_res["options"]["regular"]

            ui_card = {
                "type": "SHIPPING_OPTIONS_CARD",
                "destination": ship_res["destination"],
                "green_delivery": green_opt,
                "regular": reg_opt
            }

            reply_text = (
                f"Untuk pengiriman ke **{ship_res['destination']}**, tersedia dua opsi kurir:\n\n"
                f"**Eco-Consolidated Green Delivery: {green_opt['cost_formatted']}** ({green_opt['etd']})\n"
                f"*Opsi hemat dengan kurir rute terkonsolidasi rendah emisi.*\n\n"
                f"**Reguler Standard: {reg_opt['cost_formatted']}** ({reg_opt['etd']})\n\n"
                f"Kakak lebih nyaman menggunakan opsi yang mana? Jika sudah sesuai, kami dapat langsung menerbitkan pesanan."
            )

            return {
                "source": "smart_local_engine",
                "reply": reply_text,
                "tool_called": "calculate_shipping_options",
                "tool_data": ship_res,
                "ui_card": ui_card,
                "rate_limit": rate_limiter.get_status()
            }

        # 4. Inventory check
        prod_keywords = ["gojo", "jjk", "jujutsu", "oxford", "aot", "titan", "scout", "linen", "one piece", "nika", "chino", "csm", "chainsaw", "kemeja", "kaos", "baju", "stok"]
        if any(w in msg_lower for w in prod_keywords):
            query = "Gojo" if "gojo" in msg_lower or "jjk" in msg_lower else (
                "Attack on Titan" if "aot" in msg_lower or "titan" in msg_lower else (
                    "One Piece" if "one piece" in msg_lower or "nika" in msg_lower or "linen" in msg_lower else (
                        "Chainsaw" if "chino" in msg_lower or "csm" in msg_lower else "Kemeja"
                    )
                )
            )

            inv_res = check_inventory_and_specs(product_name=query)
            if inv_res.get("products"):
                p = inv_res["products"][0]
                available_sizes = [v["size"] for v in p["variants"] if v["stock"] > 0]
                img_url = get_product_image(p)

                ui_card = {
                    "type": "PRODUCT_SPOTLIGHT_CARD",
                    "product_id": p["product_id"],
                    "name": p["name"],
                    "price_formatted": f"Rp{p['base_price']:,}".replace(",", "."),
                    "material": p["material"],
                    "available_sizes": available_sizes,
                    "image_url": img_url
                }

                reply_text = (
                    f"Koleksi **{p['name']}** saat ini tersedia.\n\n"
                    f"Spesifikasi bahan menggunakan {p['material']}.\n"
                    f"**Harga:** Rp{p['base_price']:,}".replace(",", ".") + f"\n"
                    f"**Ukuran Tersedia:** {', '.join(available_sizes)}.\n\n"
                    f"Untuk memastikan ukuran yang tepat sebelum pemesanan (Zero Return Guarantee), boleh sebutkan perkiraan tinggi (TB) dan berat badan (BB) Kakak?"
                )

                return {
                    "source": "smart_local_engine",
                    "reply": reply_text,
                    "tool_called": "check_inventory_and_specs",
                    "tool_data": inv_res,
                    "ui_card": ui_card,
                    "rate_limit": rate_limiter.get_status()
                }

        # 5. Default Greeting
        reply_text = (
            "Halo Kak! Selamat datang di **Arunika Apparel**.\n\n"
            "Apakah Kakak sedang mencari outfit harian atau tertarik dengan koleksi **Arunika x Anime Capsule Edition 2026**? "
            "Kami memiliki seri kolaborasi *Jujutsu Kaisen Gojo Boxy Tee*, *Attack on Titan Scout Oxford*, *One Piece Sun God Linen*, dan *Chainsaw Man Chino*. "
            "Boleh kami bantu rekomendasikan ukuran atau cek ketersediaan stoknya?"
        )

        return {
            "source": "smart_local_engine",
            "reply": reply_text,
            "tool_called": None,
            "tool_data": None,
            "ui_card": None,
            "rate_limit": rate_limiter.get_status()
        }
