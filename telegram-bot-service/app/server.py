import httpx
from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException, Depends, Header, Request
from pydantic import BaseModel
from app.config import load_config
from app.bot_app import send_message_to_user, bot, dp

config = load_config()

@asynccontextmanager
async def lifespan(app: FastAPI):
    if config.use_webhook:
        await bot.set_webhook(
            url=config.webhook_url,
            allowed_updates=dp.resolve_used_update_types(),
            drop_pending_updates=True,
        )
    yield
    if config.use_webhook:
        await bot.delete_webhook()
        await bot.session.close()


app = FastAPI(title="Internal Bot Gateway", lifespan=lifespan)

class SendMessageIn(BaseModel):
    chat_id: int
    text: str

# простой dependency для проверки API key
def require_api_key(x_api_key: str | None = Header(default=None)):
    if not config.internal_api_key:
        raise HTTPException(status_code=500, detail="[HONYWORK] Internal API key not configured")
    if x_api_key != config.internal_api_key:
        raise HTTPException(status_code=401, detail="[HONYWORK] Unauthorized")
    return True

class MessageFromBot(BaseModel):
    from_id: int
    username: str
    text: str
    message_id: int
    chat_id: int

class MessageGenFromBot(BaseModel):
    prompt: str
    from_id: int
    username: str
    text: str
    message_id: int
    chat_id: int

@app.post("/api/v1/incoming_message")
async def incoming_message(message: MessageFromBot):
    # тут ты кладёшь задачу в БД
    # или в RabbitMQ
    # или передаёшь сервису обработки
    try:
        res = await send_message_to_user(message.chat_id, message.text)
        return {"ok": True, "message_id": res.message_id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/v1/gpt")
async def gptGen(body: MessageGenFromBot):
    """Отправляет запрос в ai-service и возвращает сгенерированный ответ."""
    if not config.ai_service_url:
        print(f"[ai] AI_SERVICE_URL не задан (текущее значение: {config.ai_service_url}), пропускаем генерацию")
        return None
    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            # Формируем запрос согласно ожиданиям AI-сервиса
            request_data = {
                "prompt": body.prompt,
            }
            print(config.ai_service_url)
            resp = await client.post(
                config.ai_service_url.rstrip("/") + "/generate",
                json=request_data,
                timeout=3000.0
            )
            
            resp.raise_for_status()
            data = resp.json()
            await send_message_to_user(body.chat_id, data.get("response"))
    except Exception as e:
        print(f"[ai] Ошибка при генерации ответа: {e}")
        return None


@app.post("/internal/send_message")
async def internal_send_message(body: SendMessageIn, authorized: bool = Depends(require_api_key)):
    """Endpoint для backend, чтобы бот отправил сообщение пользователю (worker -> client).


    Требует заголовок X-API-KEY: <INTERNAL_API_KEY>
    """
    if bot is None:
        raise HTTPException(status_code=503, detail="Bot not initialized")


    try:
        res = await send_message_to_user(body.chat_id, body.text)
        return {"ok": True, "message_id": res.message_id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))




@app.get("/health")
async def health():
    return {"ok": True}

@app.post("/webhook")
async def telegram_webhook(request: Request):
    update = await request.json()
    await dp.feed_raw_update(bot, update)
    return {"ok": True}