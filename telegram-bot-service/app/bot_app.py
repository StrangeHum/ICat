from aiogram import Bot, Dispatcher, Router
import httpx
from app.middlewares.logging import LoggingMiddleware
from aiogram.client.default import DefaultBotProperties
from aiogram.fsm.storage.memory import MemoryStorage
from aiogram.enums import ParseMode
from app.config import load_config
from app.handlers.start import router as start_router
from app.handlers.test_model import router as test_model_router
from aiogram import Router, types
from aiogram.filters import Command

config = load_config()


# глобальные объекты, которые могут использоваться сервером для отправки сообщений
bot: Bot | None = None
dp: Dispatcher | None = None


router = Router()
@router.message(Command("test_model"))
async def cmd_test_model(message: types.Message):

    payload = { "prompt": message.text}

    # Сброс сессии и начало нового диалога
    async with httpx.AsyncClient(timeout=10.0) as client:
        try:
            resp = await client.post(config.backend_url.rstrip("/") + "/api/v1/generate", json=payload, timeout=10.0)
            resp.raise_for_status()
            await message.answer("Сессия начата. Отправьте сообщение для модели.")
        except Exception as e:
            print(f"[forwarder] Ошибка при отправке на backend: {e}")
            return None

def create_bot_and_dp() -> tuple[Bot, Dispatcher]:
    global bot, dp
    default = DefaultBotProperties(parse_mode=ParseMode.HTML)
    bot = Bot(token=config.bot_token, default=default)
    dp = Dispatcher(storage=MemoryStorage())
    # Регистрируем middleware через роутер
    
    # router.message.middleware(LoggingMiddleware())
    # router.callback_query.middleware(LoggingMiddleware())
    dp.include_router(router)


    # подключаем роутеры
    # dp.include_router(start_router)
    # dp.include_router(test_model_router)


    return bot, dp


# Удобная обёртка для отправки сообщения — используется сервером
async def send_message_to_user(chat_id: int | str, text: str, parse_mode: str | None = None, **kwargs):
    print("tryin send mess to user")
    if bot is None:
        raise RuntimeError("Bot not initialized")
    return await bot.send_message(chat_id=chat_id, text=text, **kwargs)