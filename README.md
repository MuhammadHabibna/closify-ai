# Closify AI — Autonomous Sales Chatbot

> AI Sales Closer berbasis **Gemini 3.5 Flash Lite** + **FastAPI** untuk toko streetwear **Arunika Apparel Indonesia** (Anime Capsule Edition).  
> Dibuat untuk **Kompetisi Inovasi Nasional – KIMNAS UNESA 2026**.

---

## Demo Fitur

| Fitur | Keterangan |
|---|---|
| Multi-turn Memory | Chatbot ingat konteks sepanjang sesi |
| Zero Return Protocol | Konsultasi TB/BB → rekomendasi ukuran akurat |
| Dynamic QRIS Checkout | Kartu pembayaran in-chat (consent-first) |
| Green Delivery | Opsi pengiriman ramah lingkungan |
| Animated Typing Indicator | Pulsing dots saat bot sedang memproses |
| Smooth Message Animations | Entrance slide-up untuk setiap bubble |

---

## Stack

- **Backend**: Python 3.11 · FastAPI · Uvicorn
- **AI Engine**: Google Gemini 3.5 Flash Lite (native Function Calling)
- **Frontend**: Vanilla HTML/CSS/JS (embeddable widget)
- **Deploy**: Railway / Render / VPS (Dockerfile included)

---

## Cara Menjalankan Lokal

### 1. Clone & Install

```bash
git clone https://github.com/MuhammadHabibna/closify-ai.git
cd closify-ai
pip install -r requirements.txt
```

### 2. Konfigurasi Environment

Buat file `.env` di root project (lihat `.env.example`):

```env
GEMINI_API_KEY=your_google_ai_studio_api_key_here
```

Dapatkan API Key gratis di: https://aistudio.google.com/app/apikey

### 3. Jalankan Server

```bash
python -m uvicorn app:app --app-dir backend --host 127.0.0.1 --port 8000 --reload
```

Buka browser: **http://127.0.0.1:8000/**

---

## Struktur Proyek

```
closify-ai/
├── backend/
│   ├── app.py              # FastAPI server & endpoint
│   ├── agent.py            # Orchestrator (multi-turn memory + fallback)
│   ├── gemini_engine.py    # Gemini 3.5 Flash Lite live engine
│   ├── tools.py            # Business logic tools (inventory, sizing, QRIS)
│   ├── config.py           # Config & env loader
│   └── rate_limiter.py     # Rate limit guard (15 RPM / 500 RPD)
├── public/
│   ├── index.html          # Landing page toko Arunika Apparel
│   ├── style.css           # Landing page styles
│   ├── widget.js           # Embeddable chat widget
│   ├── widget.css          # Widget styles
│   └── assets/             # Product images, QRIS illustration, avatars
├── data/
│   ├── inventory_products.json
│   └── store_faq_knowledge.md
├── SYSTEM_PROMPT_SALES_AGENT.md
├── requirements.txt
├── Dockerfile
├── Procfile
└── .env.example
```

---

## Deploy ke Railway / Render

1. Fork repo ini
2. Tambahkan **environment variable** `GEMINI_API_KEY` di dashboard platform
3. Railway auto-detect `Procfile` — langsung deploy!

```
web: python -m uvicorn app:app --app-dir backend --host 0.0.0.0 --port $PORT
```

---

## Lisensi

MIT License — bebas digunakan untuk keperluan edukasi & kompetisi.
