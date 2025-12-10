import httpx
from app.config import load_config


config = load_config()


async def forward_to_backend(payload: dict):
    """Отправляет данные о новом сообщении на BACKEND_URL (если указан)."""
    if not config.backend_url:
        # Если бекенд не настроен — логируем и выходим
        print("[forwarder] BACKEND_URL не задан, пропускаем отправку")
        return None
    async with httpx.AsyncClient(timeout=10.0) as client:
        try:
            resp = await client.post(config.backend_url.rstrip("/") + "/api/v1/incoming_message", json=payload, timeout=10.0)
            resp.raise_for_status()
            return resp.json()
        except Exception as e:
            print(f"[forwarder] Ошибка при отправке на backend: {e}")
            return None

async def generate_ai_response(prompt: str) -> str | None:
    """Отправляет запрос в ai-service и возвращает сгенерированный ответ."""
    if not config.ai_service_url:
        print("[ai] AI_SERVICE_URL не задан, пропускаем генерацию")
        return None
    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            resp = await client.post(
                config.ai_service_url.rstrip("/") + "/generate",
                json={"prompt": prompt},
                timeout=30.0
            )
            resp.raise_for_status()
            data = resp.json()
            return data.get("response")
    except Exception as e:
        print(f"[ai] Ошибка при генерации ответа: {e}")
        return None
    
