"""
Closify AI - Gemini 3.5 Flash Lite Live Engine
Menghubungkan sistem secara langsung ke Google AI Studio dengan native Function Calling
dan proteksi ketat Rate Limiter (15 RPM / 500 RPD).
"""

import json
import logging
import os
import requests
from typing import Any, Dict, List, Optional, Tuple

from config import GEMINI_API_KEY, GEMINI_API_URL, REQUEST_TIMEOUT_SECONDS
from rate_limiter import rate_limiter
from tools import GEMINI_TOOLS_DECLARATION, execute_tool

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("GeminiEngine")


class GeminiLiveEngine:
    def __init__(self, api_key: str = "", system_prompt: str = ""):
        self.api_key = api_key or GEMINI_API_KEY
        self.system_prompt = system_prompt
        self.api_url = f"{GEMINI_API_URL}?key={self.api_key}"

    def execute_chat_with_tools(
        self,
        user_message: str,
        conversation_history: Optional[List[Dict[str, Any]]] = None
    ) -> Tuple[bool, Optional[str], Optional[str], Optional[Dict[str, Any]]]:
        """
        Menjalankan panggilan multi-turn ke Gemini 3.5 Flash Lite dengan Function Calling.
        
        Returns:
            (is_success: bool, final_reply: str, tool_called_name: str, tool_data: dict)
        """
        # 1. Cek Kuota Rate Limiter
        can_proceed, reason = rate_limiter.can_call_llm()
        if not can_proceed:
            logger.warning(f"[RATE LIMIT GUARD] Melewati panggilan LLM. Alasan: {reason}")
            rate_limiter.record_fallback_used()
            return False, None, None, None

        # 2. Throttle aman (minimal jeda 4 detik antar-request)
        rate_limiter.throttle_if_needed()

        # 3. Susun isi konten percakapan
        contents = []
        if conversation_history:
            contents.extend(conversation_history)

        contents.append({
            "role": "user",
            "parts": [{"text": user_message}]
        })

        payload = {
            "system_instruction": {"parts": [{"text": self.system_prompt}]},
            "contents": contents,
            "tools": GEMINI_TOOLS_DECLARATION,
            "generationConfig": {
                "temperature": 0.5,
                "maxOutputTokens": 800
            }
        }

        try:
            logger.info("[GEMINI CALL 1] Mengirim prompt ke Gemini 3.5 Flash Lite...")
            rate_limiter.record_request_start()
            
            res = requests.post(
                self.api_url,
                json=payload,
                timeout=REQUEST_TIMEOUT_SECONDS
            )

            # Cek Rate Limit 429
            if res.status_code == 429:
                logger.error("[GEMINI 429] Batas kecepatan terlampaui (429). Mengaktifkan Cooldown 60 detik.")
                rate_limiter.trigger_429_cooldown(60)
                return False, None, None, None

            if res.status_code != 200:
                logger.error(f"[GEMINI ERROR] Status {res.status_code}: {res.text}")
                rate_limiter.record_fallback_used()
                return False, None, None, None

            res_data = res.json()
            candidates = res_data.get("candidates", [])
            if not candidates:
                return False, None, None, None

            model_turn_parts = candidates[0].get("content", {}).get("parts", [])

            # Cek apakah Gemini meminta pemanggilan fungsi (Function Call)
            function_call = None
            for p in model_turn_parts:
                if "functionCall" in p:
                    function_call = p["functionCall"]
                    break

            # Jika Gemini hanya membalas teks biasa tanpa panggil fungsi
            if not function_call:
                text_reply = "\n".join([p["text"] for p in model_turn_parts if "text" in p])
                return True, text_reply, None, None

            # EKSEKUSI TOOL
            func_name = function_call.get("name")
            func_args = function_call.get("args", {})
            logger.info(f"[TOOL TRIGGERED BY GEMINI] Tool: {func_name} | Args: {func_args}")

            tool_result = execute_tool(func_name, func_args)

            # Panggilan Turn 2: Sertakan turn model asli (lengkap dengan id & thoughtSignature)
            # lalu sertakan turn user dengan functionResponse
            rate_limiter.throttle_if_needed()
            rate_limiter.record_request_start()

            contents.append({
                "role": "model",
                "parts": model_turn_parts
            })
            contents.append({
                "role": "user",
                "parts": [{
                    "functionResponse": {
                        "name": func_name,
                        "response": {"result": tool_result}
                    }
                }]
            })

            payload_turn2 = {
                "system_instruction": {"parts": [{"text": self.system_prompt}]},
                "contents": contents,
                "generationConfig": {
                    "temperature": 0.5,
                    "maxOutputTokens": 800
                }
            }

            logger.info(f"[GEMINI CALL 2] Mengirim tool result {func_name} ke Gemini untuk respon closing...")
            res2 = requests.post(
                self.api_url,
                json=payload_turn2,
                timeout=REQUEST_TIMEOUT_SECONDS
            )

            if res2.status_code == 200:
                data2 = res2.json()
                cand2 = data2.get("candidates", [{}])[0]
                parts2 = cand2.get("content", {}).get("parts", [])
                final_text = "\n".join([p["text"] for p in parts2 if "text" in p])
                return True, final_text, func_name, tool_result
            else:
                logger.warning(f"[GEMINI TURN 2 ERROR] Status {res2.status_code}: {res2.text}")
                rate_limiter.record_fallback_used()
                return False, None, func_name, tool_result

        except Exception as e:
            logger.error(f"[GEMINI EXCEPTION] Gagal memanggil API: {str(e)}")
            rate_limiter.record_fallback_used()
            return False, None, None, None
