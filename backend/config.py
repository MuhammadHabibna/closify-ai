"""
Closify AI - Backend Configuration
Menyimpan konfigurasi model Gemini 3.5 Flash Lite, kredensial, dan parameter pembatasan rate limit.
"""

import os

from pathlib import Path

try:
    from dotenv import load_dotenv
    root_env = Path(__file__).resolve().parent.parent / ".env"
    if root_env.exists():
        load_dotenv(dotenv_path=root_env)
    else:
        load_dotenv()
except ImportError:
    pass

# Google AI Studio API Key (Prioritas: Environment Variable / .env)
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "").strip()

# Model Spesifikasi: Gemini 3.5 Flash Lite
GEMINI_MODEL_NAME = "gemini-3.5-flash-lite"
GEMINI_API_URL = f"https://generativelanguage.googleapis.com/v1beta/models/{GEMINI_MODEL_NAME}:generateContent"

# Parameter Pembatasan Kuota (Berdasarkan Dashboard Google AI Studio)
# Batas Resmi: 15 RPM, 500 RPD
# Batas Aman Sistem Kita:
MAX_RPM = 12                     # Maksimal 12 request per menit (memberi buffer dari limit 15)
MIN_REQUEST_INTERVAL = 4.0       # Jeda minimal antar-request 4 detik (60 detik / 15 request)
MAX_RPD = 480                    # Batas harian aman (dari kuota 500)
REQUEST_TIMEOUT_SECONDS = 15     # Timeout HTTP request ke Google AI Studio
