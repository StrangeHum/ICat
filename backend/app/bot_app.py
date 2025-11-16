from aiogram import Bot, Dispatcher
from aiogram.client.default import DefaultBotProperties
from aiogram.fsm.storage.memory import MemoryStorage
from aiogram.enums import ParseMode
from app.config import load_config
from app.handlers.start import router as start_router


config = load_config()


# глобальные объекты, которые могут использоваться сервером для отправки сообщений
bot: Bot | None = None
dp: Dispatcher | None = None




def create_bot_and_dp() -> tuple[Bot, Dispatcher]:
    global bot, dp
    default = DefaultBotProperties(parse_mode=ParseMode.HTML)
    bot = Bot(token=config.bot_token, default=default)
    dp = Dispatcher(storage=MemoryStorage())


    # подключаем роутеры
    dp.include_router(start_router)


    return bot, dp


# Удобная обёртка для отправки сообщения — используется сервером
async def send_message_to_user(chat_id: int | str, text: str, parse_mode: str | None = None, **kwargs):
    if bot is None:
        raise RuntimeError("Bot not initialized")
    return await bot.send_message(chat_id=chat_id, text=text, **kwargs)