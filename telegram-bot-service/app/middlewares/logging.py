from loguru import logger
from aiogram import types
from aiogram.dispatcher.middlewares.base import BaseMiddleware

class LoggingMiddleware(BaseMiddleware):
    async def __call__(self, handler, event, data):
        if isinstance(event, types.Message):
            logger.info(f"Received message from {event.from_user.id}: {event.text}")
        elif isinstance(event, types.CallbackQuery):
            logger.info(f"Received callback from {event.from_user.id}: {event.data}")
        return await handler(event, data)