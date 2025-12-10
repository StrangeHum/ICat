from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from app.config import load_config
from app.bot_app import send_message_to_user, bot


config = load_config()
app = FastAPI(title="Internal Bot Gateway")


class SendMessageIn(BaseModel):
    chat_id: int
    text: str




# простой dependency для проверки API key
def require_api_key(x_api_key: str | None = None):
    if not config.internal_api_key:
        raise HTTPException(status_code=500, detail="Internal API key not configured")
    if x_api_key != config.internal_api_key:
        raise HTTPException(status_code=401, detail="Unauthorized")
    return True

class MessageFromBot(BaseModel):
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

