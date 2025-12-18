import asyncio
from app.bot_app import create_bot_and_dp
from app.config import load_config
from app.server import app as fastapi_app
import uvicorn

config = load_config()

async def main():
    bot, dp = create_bot_and_dp()

    # Запускаем сервер FastAPI в отдельной таске, если используется вебхук или для внутреннего API
    
    if not config.use_webhook:
        print("Запускаем polling...")
        await dp.start_polling(bot)
    else:
        await bot.set_webhook(config.webhook_url)
        print("Webhook включён. Бот работает через вебхуки.")

    await bot  # Ждем завершения сервера (хотя обычно это не происходит)

if __name__ == '__main__':
    asyncio.run(main())