"""
Closify AI - Rate Limiter & Quota Safeguard
Mencegah terjadinya HTTP 429 (Too Many Requests) pada model Gemini 3.5 Flash Lite
dengan membatasi kecepatan panggilan sesuai kuota gratis Google AI Studio (15 RPM / 500 RPD).
"""

import time
import threading
from collections import deque
from typing import Dict, Tuple, Any

from config import MAX_RPM, MIN_REQUEST_INTERVAL, MAX_RPD


class GeminiRateLimiter:
    def __init__(self):
        self._lock = threading.Lock()
        self._request_history = deque()  # Menyimpan timestamp request dalam 60 detik terakhir
        self._last_request_time = 0.0
        self._daily_count = 0
        self._daily_reset_time = time.time() + 86400
        self._cooldown_until = 0.0
        self._total_success_calls = 0
        self._total_fallback_calls = 0

    def can_call_llm(self) -> Tuple[bool, str]:
        """
        Mengecek apakah saat ini aman untuk memanggil API Gemini 3.5 Flash Lite.
        Returns: (True/False, keterangan alasan)
        """
        now = time.time()

        with self._lock:
            # 1. Cek Cooldown jika sempat kena 429
            if now < self._cooldown_until:
                remaining = int(self._cooldown_until - now)
                return False, f"Cooldown aktif karena 429 rate limit ({remaining} detik tersisa)"

            # 2. Reset counter harian jika sudah 24 jam
            if now > self._daily_reset_time:
                self._daily_count = 0
                self._daily_reset_time = now + 86400

            # 3. Cek batas harian (RPD)
            if self._daily_count >= MAX_RPD:
                return False, f"Batas harian (RPD) tercapai: {self._daily_count}/{MAX_RPD}"

            # 4. Bersihkan riwayat request yang lebih dari 60 detik yang lalu
            while self._request_history and self._request_history[0] < now - 60.0:
                self._request_history.popleft()

            # 5. Cek kuota per menit (RPM)
            if len(self._request_history) >= MAX_RPM:
                oldest = self._request_history[0]
                wait_sec = int(60.0 - (now - oldest)) + 1
                return False, f"Batas RPM tercapai: {len(self._request_history)}/{MAX_RPM} req/menit (tunggu {wait_sec} detik)"

            return True, "OK"

    def throttle_if_needed(self):
        """
        Memastikan ada jeda minimal (MIN_REQUEST_INTERVAL) antar-request beruntun
        agar tidak membebani server Google AI Studio dalam detik yang sama.
        """
        with self._lock:
            now = time.time()
            elapsed = now - self._last_request_time
            if elapsed < MIN_REQUEST_INTERVAL:
                wait_time = MIN_REQUEST_INTERVAL - elapsed
            else:
                wait_time = 0.0

        if wait_time > 0:
            time.sleep(wait_time)

    def record_request_start(self):
        """Mencatat request yang baru dikirim ke Google AI Studio."""
        now = time.time()
        with self._lock:
            self._request_history.append(now)
            self._last_request_time = now
            self._daily_count += 1
            self._total_success_calls += 1

    def trigger_429_cooldown(self, cooldown_seconds: int = 45):
        """
        Mengaktifkan circuit breaker jika server Google AI Studio mengembalikan status 429.
        Sistem otomatis beralih ke Smart Local Fallback Engine selama durasi cooldown.
        """
        with self._lock:
            self._cooldown_until = time.time() + cooldown_seconds
            self._total_fallback_calls += 1

    def record_fallback_used(self):
        with self._lock:
            self._total_fallback_calls += 1

    def get_status(self) -> Dict[str, Any]:
        """Mengambil data telemetri penggunaan kuota secara real-time."""
        now = time.time()
        with self._lock:
            while self._request_history and self._request_history[0] < now - 60.0:
                self._request_history.popleft()

            rpm_current = len(self._request_history)
            is_cooldown = now < self._cooldown_until
            cooldown_left = int(self._cooldown_until - now) if is_cooldown else 0

            return {
                "rpm_current": rpm_current,
                "max_rpm_safe": MAX_RPM,
                "official_rpm_limit": 15,
                "daily_requests_count": self._daily_count,
                "max_rpd_safe": MAX_RPD,
                "official_rpd_limit": 500,
                "is_cooldown": is_cooldown,
                "cooldown_remaining_seconds": cooldown_left,
                "total_llm_calls": self._total_success_calls,
                "total_fallback_calls": self._total_fallback_calls
            }


# Global singleton rate limiter
rate_limiter = GeminiRateLimiter()
