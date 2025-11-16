from aiogram import BaseMiddleware
from aiogram.types import Update


class LoggingMiddleware(BaseMiddleware):
    async def __call__(self, handler, event: Update, data):
        print(f"[LOG] Обработан апдейт: {event.event_type}")
        return await handler(event, data)