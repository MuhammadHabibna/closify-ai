"""
Closify AI - Deterministic Tool Suite
Definisi fungsi alat (Tool Calling) untuk eksekusi logika toko, cek inventaris,
rekomendasi ukuran (Zero Return Protocol), perhitungan ongkir, dan penerbitan QRIS.
"""

import json
import math
import os
import random
import time
from typing import Any, Dict, List, Optional

# Path ke file dataset
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, "data")

def _load_json(filename: str) -> Dict[str, Any]:
    path = os.path.join(DATA_DIR, filename)
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)

# Cache data
INVENTORY_DATA = _load_json("inventory_products.json")
SIZE_MATRIX_DATA = _load_json("size_matrix.json")
SHIPPING_RATES_DATA = _load_json("shipping_rates.json")

# In-memory orders store
ACTIVE_ORDERS: Dict[str, Dict[str, Any]] = {}


def check_inventory_and_specs(
    product_name: str,
    variant: Optional[str] = None,
    size: Optional[str] = None
) -> Dict[str, Any]:
    """
    Mengecek ketersediaan stok riil, varian warna, harga, bahan kain, dan size chart
    dari database internal toko Arunika Apparel.
    """
    keyword = product_name.lower().strip()
    stop_words = {"arunika", "x", "apparel", "indonesia", "dan", "di", "ke", "kaos", "baju", "edisi", "series", "collab", "collaboration", "ada", "yang", "mau", "kak", "sih", "dong", "ya", "ini", "itu"}
    query_tokens = [w for w in re.findall(r'\w+', keyword) if w not in stop_words and len(w) > 1]
    
    scored_products = []

    for prod in INVENTORY_DATA.get("products", []):
        p_name = prod["name"].lower()
        p_desc = prod["description"].lower()
        p_cat = prod["category"].lower()
        p_slug = prod.get("slug", "").lower()
        score = 0
        
        # Exact keyword match
        if keyword in p_name:
            score += 120
        elif keyword in p_slug:
            score += 90
        elif keyword in p_desc:
            score += 60

        # Token overlap matching
        for token in query_tokens:
            if token in p_name:
                score += 35
            elif token in p_slug:
                score += 25
            elif token in p_desc:
                score += 15

        # Character / series aliases
        if any(w in keyword for w in ["gojo", "satoru", "limitless", "jjk", "jujutsu"]) and "001" in prod["product_id"]:
            score += 80
        if any(w in keyword for w in ["aot", "titan", "scout", "regiment", "wings of freedom"]) and "002" in prod["product_id"]:
            score += 80
        if any(w in keyword for w in ["one piece", "nika", "sun god", "luffy", "gear 5", "french linen", "camp-collar"]) and "003" in prod["product_id"]:
            score += 80
        if any(w in keyword for w in ["csm", "chainsaw", "pochita", "makima", "chino", "public safety"]) and "004" in prod["product_id"]:
            score += 80
        if any(w in keyword for w in ["oxford basic", "polos", "long sleeve"]) and "essential" in prod["product_id"].lower():
            score += 80

        if score > 0:
            # Filter variants if specified
            variants_info = []
            for v in prod["variants"]:
                match_color = True
                match_size = True
                
                if variant and variant.lower() not in v["color"].lower():
                    match_color = False
                if size and size.upper() != v["size"].upper():
                    match_size = False
                
                variants_info.append({
                    "sku_id": v["sku_id"],
                    "color": v["color"],
                    "size": v["size"],
                    "stock": v["stock"],
                    "price": v["price"],
                    "is_in_stock": v["stock"] > 0,
                    "is_match": match_color and match_size
                })
            
            scored_products.append((score, {
                "product_id": prod["product_id"],
                "name": prod["name"],
                "category": prod["category"],
                "base_price": prod["base_price"],
                "material": prod["material"],
                "weight_grams": prod["weight_grams"],
                "description": prod["description"],
                "size_chart": prod.get("size_chart", {}),
                "variants": variants_info
            }))

    # Sort descending by score
    scored_products.sort(key=lambda x: x[0], reverse=True)
    matched_products = [item[1] for item in scored_products]

    if not matched_products:
        return {
            "status": "not_found",
            "message": f"Produk dengan kata kunci '{product_name}' tidak ditemukan di katalog.",
            "suggestion": "Toko memiliki koleksi: Kaos Gojo Satoru JJK (240 GSM), Kemeja Oxford AoT Scout, Kemeja Linen One Piece Nika, dan Chino CSM."
        }

    return {
        "status": "success",
        "total_matched": len(matched_products),
        "products": matched_products
    }


def check_size_recommendation(
    height_cm: float,
    weight_kg: float,
    category: str = "tops",
    preferred_fit: str = "regular"
) -> Dict[str, Any]:
    """
    Protokol Pencegahan Retur (Zero Return Protocol): Menentukan rekomendasi ukuran
    paling pas berdasarkan tinggi dan berat badan pengguna untuk mencegah salah ukuran.
    """
    if category.lower() in ["pants", "celana", "chino"]:
        # Logic for pants
        for rule in SIZE_MATRIX_DATA.get("pants_recommendation_matrix", []):
            if rule["min_weight_kg"] <= weight_kg <= rule["max_weight_kg"]:
                return {
                    "status": "success",
                    "category": "pants",
                    "recommended_size": rule["recommended_waist_size"],
                    "user_metrics": {"weight_kg": weight_kg},
                    "fit_type": "Relaxed Ankle Fit",
                    "explanation": rule["explanation"]
                }
        return {
            "status": "success",
            "category": "pants",
            "recommended_size": "32 (L)",
            "fit_type": "Relaxed Ankle Fit",
            "explanation": "Ukuran 32 (L) paling aman karena dilengkapi karet elastis tersembunyi di lingkar pinggang."
        }

    # Logic for tops (Kaos & Kemeja)
    for rule in SIZE_MATRIX_DATA.get("tops_recommendation_matrix", []):
        height_match = rule["min_height_cm"] <= height_cm <= rule["max_height_cm"]
        weight_match = rule["min_weight_kg"] <= weight_kg <= rule["max_weight_kg"]
        
        if height_match and weight_match:
            recommended = rule["recommended_size"]
            if "loose" in preferred_fit.lower() or "oversized" in preferred_fit.lower():
                sizes = ["S", "M", "L", "XL"]
                idx = sizes.index(recommended) if recommended in sizes else 1
                if idx < len(sizes) - 1:
                    recommended = sizes[idx + 1]

            return {
                "status": "success",
                "category": "tops",
                "recommended_size": recommended,
                "fit_type": rule["fit_type"],
                "user_metrics": {"height_cm": height_cm, "weight_kg": weight_kg},
                "explanation": rule["explanation"]
            }

    # Intelligent fallback calculation (BMI-based estimate)
    bmi = weight_kg / ((height_cm / 100) ** 2)
    if height_cm < 165 or bmi < 20:
        rec_size = "S"
        explanation = "Ukuran S pas di pundak dan panjang badan ideal untuk postur Kakak."
    elif height_cm <= 174 and bmi <= 24:
        rec_size = "M"
        explanation = "Ukuran M pas jatuh rapi di pundak dan dada tanpa terasa sesak."
    elif height_cm <= 182 and bmi <= 27:
        rec_size = "L"
        explanation = "Ukuran L memberikan siluet streetwear semi-loose yang modern dan nyaman."
    else:
        rec_size = "XL"
        explanation = "Ukuran XL direkomendasikan agar lingkar dada dan ketiak tetap leluasa bergerak."

    return {
        "status": "success",
        "category": "tops",
        "recommended_size": rec_size,
        "fit_type": "Modern Streetwear Fit",
        "user_metrics": {"height_cm": height_cm, "weight_kg": weight_kg},
        "explanation": explanation
    }


# Alias for consistency
recommend_size = check_size_recommendation


def calculate_shipping_options(
    destination_city: str,
    total_weight_grams: int = 300,
    prefer_green_delivery: bool = True
) -> Dict[str, Any]:
    """
    Menghitung tarif ongkos kirim real-time dari gudang pusat (Surabaya)
    ke kota tujuan pembeli, serta menyediakan opsi kurir ramah lingkungan (Green Delivery).
    """
    dest_lower = destination_city.lower()
    matched_rate = None

    for item in SHIPPING_RATES_DATA.get("destination_rates", []):
        if any(c in dest_lower for c in item["destination_city"].lower().split()):
            matched_rate = item
            break

    # Default to Jakarta if not matched
    if not matched_rate:
        matched_rate = SHIPPING_RATES_DATA["destination_rates"][1] # Jakarta

    weight_kg = max(1, math.ceil(total_weight_grams / 1000.0))
    rates_raw = matched_rate["rates"]

    regular_cost = rates_raw["regular"]["cost_per_kg"] * weight_kg
    green_cost = rates_raw["green_delivery"]["cost_per_kg"] * weight_kg
    next_day_cost = rates_raw["next_day"]["cost_per_kg"] * weight_kg
    savings = regular_cost - green_cost

    return {
        "status": "success",
        "origin": SHIPPING_RATES_DATA["origin"],
        "destination": matched_rate["destination_city"],
        "total_weight_grams": total_weight_grams,
        "chargeable_weight_kg": weight_kg,
        "options": {
            "green_delivery": {
                "service_name": "Eco-Consolidated Green Delivery",
                "cost": green_cost,
                "cost_formatted": f"Rp{green_cost:,}".replace(",", "."),
                "etd": rates_raw["green_delivery"]["etd_days"],
                "eco_benefit": f"Rute konsolidasi kurir hemat emisi karbon, lebih hemat Rp{savings:,}".replace(",", ".")
            },
            "regular": {
                "service_name": "Standard Regular (J&T / JNE)",
                "cost": regular_cost,
                "cost_formatted": f"Rp{regular_cost:,}".replace(",", "."),
                "etd": rates_raw["regular"]["etd_days"]
            },
            "next_day": {
                "service_name": "Express Next Day",
                "cost": next_day_cost,
                "cost_formatted": f"Rp{next_day_cost:,}".replace(",", "."),
                "etd": rates_raw["next_day"]["etd_days"]
            }
        }
    }


def generate_in_chat_payment(
    items: Optional[List[Dict[str, Any]]] = None,
    product_name_or_sku: Optional[str] = None,
    customer_name: str = "Kak Pelanggan",
    phone_number: str = "0812-xxxx-xxxx",
    shipping_address: str = "Tebet, Jakarta Selatan",
    courier_service: str = "green_delivery",
    shipping_cost: int = 9000
) -> Dict[str, Any]:
    """
    Eksekusi Checkout In-Chat: Menghasilkan pesanan resmi dan menerbitkan kartu Dynamic QRIS
    resmi langsung di dalam jendela chat.
    """
    if not items:
        # Construct item from product_name_or_sku
        p_name = product_name_or_sku or "Arunika x JJK Limitless Boxy Tee (L)"
        price = 169000
        sku = "JJK-WSH-L"
        if "oxford" in p_name.lower() or "aot" in p_name.lower():
            price = 219000
            sku = "AOT-OLV-L"
        elif "linen" in p_name.lower() or "one piece" in p_name.lower():
            price = 229000
            sku = "OP-BWT-L"
        elif "chino" in p_name.lower() or "csm" in p_name.lower():
            price = 239000
            sku = "CSM-BLK-32"
            
        items = [{
            "sku_id": sku,
            "name": p_name,
            "quantity": 1,
            "price_per_unit": price
        }]

    subtotal = sum(item.get("price_per_unit", 0) * item.get("quantity", 1) for item in items)
    grand_total = subtotal + shipping_cost
    
    order_id = f"ARN-{int(time.time())}-{random.randint(100, 999)}"
    expires_at = int(time.time()) + (15 * 60) # 15 minutes validity

    order_payload = {
        "order_id": order_id,
        "created_at": time.strftime("%Y-%m-%d %H:%M:%S"),
        "expires_at": expires_at,
        "status": "pending",
        "customer": {
            "name": customer_name,
            "phone": phone_number,
            "address": shipping_address
        },
        "items": items,
        "courier": {
            "service": courier_service,
            "cost": shipping_cost,
            "cost_formatted": f"Rp{shipping_cost:,}".replace(",", ".")
        },
        "pricing": {
            "subtotal": subtotal,
            "subtotal_formatted": f"Rp{subtotal:,}".replace(",", "."),
            "shipping_cost": shipping_cost,
            "shipping_cost_formatted": f"Rp{shipping_cost:,}".replace(",", "."),
            "grand_total": grand_total,
            "grand_total_formatted": f"Rp{grand_total:,}".replace(",", ".")
        },
        "payment": {
            "method": "DYNAMIC_QRIS",
            "qris_image_url": "/assets/qris_template.svg",
            "nmid": "ID1020261948291",
            "merchant_name": "ARUNIKA APPAREL INDONESIA",
            "countdown_seconds": 900
        }
    }

    # Save order in memory
    ACTIVE_ORDERS[order_id] = order_payload

    return {
        "status": "success",
        "order_id": order_id,
        "grand_total": grand_total,
        "grand_total_formatted": f"Rp{grand_total:,}".replace(",", "."),
        "qris_image_url": "/assets/qris_template.svg",
        "countdown_seconds": 900,
        "order_details": order_payload
    }


def settle_payment_simulation(order_id: str) -> Dict[str, Any]:
    """
    Simulasi Webhook Pembayaran Lunas (Settlement Event):
    Digunakan saat demo pengujian ketika pengguna mengklik 'Simulasikan Bayar via BCA/GoPay'.
    """
    if order_id not in ACTIVE_ORDERS:
        return {"status": "error", "message": "Order ID tidak ditemukan."}

    order = ACTIVE_ORDERS[order_id]
    order["status"] = "settlement"
    order["paid_at"] = time.strftime("%Y-%m-%d %H:%M:%S")

    return {
        "status": "success",
        "order_id": order_id,
        "payment_status": "settlement",
        "message": "Pembayaran Berhasil Dikonfirmasi! Pesanan sedang diproses dan dikemas di gudang Arunika Apparel."
    }


# Dispatcher mapper
AVAILABLE_TOOLS = {
    "check_inventory_and_specs": check_inventory_and_specs,
    "check_inventory": check_inventory_and_specs,
    "check_size_recommendation": check_size_recommendation,
    "recommend_size": check_size_recommendation,
    "calculate_shipping_options": calculate_shipping_options,
    "calculate_shipping": calculate_shipping_options,
    "generate_in_chat_payment": generate_in_chat_payment,
    "generate_payment": generate_in_chat_payment
}

def execute_tool(name: str, args: Dict[str, Any]) -> Dict[str, Any]:
    func = AVAILABLE_TOOLS.get(name)
    if not func:
        return {"status": "error", "message": f"Tool '{name}' tidak terdaftar."}
    try:
        return func(**args)
    except Exception as e:
        return {"status": "error", "message": f"Gagal mengeksekusi tool {name}: {str(e)}"}


# Declarations for Gemini Function Calling
GEMINI_TOOLS_DECLARATION = [
    {
        "function_declarations": [
            {
                "name": "check_inventory_and_specs",
                "description": "Mengecek ketersediaan stok produk riil, varian warna, harga satuan, bahan kain, dan size chart dari database toko Arunika Apparel.",
                "parameters": {
                    "type": "OBJECT",
                    "properties": {
                        "product_name": {
                            "type": "STRING",
                            "description": "Nama produk atau kata kunci anime/baju, misal: 'Gojo Satoru', 'Jujutsu', 'Oxford', 'AoT', 'Linen', 'Chino', 'One Piece'."
                        },
                        "variant": {
                            "type": "STRING",
                            "description": "Pilihan warna varian, misal: 'Washed Black', 'Military Olive', 'Broken White'."
                        },
                        "size": {
                            "type": "STRING",
                            "description": "Ukuran produk yang dicari (S, M, L, XL, atau celana 30, 32, 34)."
                        }
                    },
                    "required": ["product_name"]
                }
            },
            {
                "name": "check_size_recommendation",
                "description": "Zero Return Protocol: Memvalidasi rekomendasi ukuran pakaian/celana yang paling pas berdasarkan tinggi badan (TB cm) dan berat badan (BB kg) pembeli untuk mencegah salah ukuran.",
                "parameters": {
                    "type": "OBJECT",
                    "properties": {
                        "height_cm": {
                            "type": "NUMBER",
                            "description": "Tinggi badan pembeli dalam centimeter (contoh: 173)."
                        },
                        "weight_kg": {
                            "type": "NUMBER",
                            "description": "Berat badan pembeli dalam kilogram (contoh: 67)."
                        },
                        "category": {
                            "type": "STRING",
                            "description": "Kategori produk: 'tops' untuk baju/kaos/kemeja, 'pants' untuk celana."
                        },
                        "preferred_fit": {
                            "type": "STRING",
                            "description": "Preferensi potongan: 'regular', 'boxy/loose', atau 'slim'."
                        }
                    },
                    "required": ["height_cm", "weight_kg"]
                }
            },
            {
                "name": "calculate_shipping_options",
                "description": "Menghitung ongkos kirim resmi dari gudang Surabaya ke kota/kecamatan tujuan, dan menyajikan opsi Green Delivery (konsolidasi hemat emisi).",
                "parameters": {
                    "type": "OBJECT",
                    "properties": {
                        "destination_city": {
                            "type": "STRING",
                            "description": "Nama kota atau kecamatan tujuan pengiriman (contoh: 'Tebet', 'Jakarta Selatan', 'Bandung', 'Surabaya', 'Semarang', 'Medan', 'Denpasar')."
                        },
                        "total_weight_grams": {
                            "type": "INTEGER",
                            "description": "Total estimasi berat barang dalam satuan gram (default 300g per helai baju)."
                        },
                        "prefer_green_delivery": {
                            "type": "BOOLEAN",
                            "description": "Penanda untuk opsi rute kurir ramah lingkungan."
                        }
                    },
                    "required": ["destination_city"]
                }
            },
            {
                "name": "generate_in_chat_payment",
                "description": "In-Chat Checkout Engine: Menerbitkan order resmi di database dan menghasilkan kartu pembayaran Dynamic QRIS resmi langsung di jendela chat.",
                "parameters": {
                    "type": "OBJECT",
                    "properties": {
                        "product_name_or_sku": {
                            "type": "STRING",
                            "description": "Nama atau SKU produk yang disepakati dibeli oleh pembeli (misal: 'Kaos Gojo Satoru Size L' atau 'JJK-WSH-L')."
                        },
                        "customer_name": {
                            "type": "STRING",
                            "description": "Nama lengkap calon pembeli."
                        },
                        "phone_number": {
                            "type": "STRING",
                            "description": "Nomor kontak WhatsApp pembeli."
                        },
                        "shipping_address": {
                            "type": "STRING",
                            "description": "Alamat tujuan pengiriman lengkap."
                        },
                        "courier_service": {
                            "type": "STRING",
                            "description": "Layanan kurir yang dipilih ('green_delivery' atau 'regular')."
                        }
                    },
                    "required": ["product_name_or_sku"]
                }
            }
        ]
    }
]
