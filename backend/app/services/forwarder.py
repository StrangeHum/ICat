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
    
