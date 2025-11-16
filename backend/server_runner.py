import asyncio
import uvicorn
from app.bot_app import create_bot_and_dp
from app.server import app as fastapi_app
from app.config import load_config


config = load_config()


async def _run_uvicorn():
    # uvicorn.Server может работать асинхронно
    config_uv = uvicorn.Config(fastapi_app, host="0.0.0.0", port=8000, log_level="info")
    server = uvicorn.Server(config_uv)
    await server.serve()


async def main():
    bot, dp = create_bot_and_dp()


    # Запускаем uvicorn в таске
    uv_task = asyncio.create_task(_run_uvicorn())


    if not config.use_webhook:
        print("Запускаем polling для разработки (можно менять на webhook для прод)")
        await dp.start_polling(bot)
    else:
        await bot.set_webhook(config.webhook_url)
        print("Webhook включён. Бот работает через вебхуки.")


if __name__ == '__main__':
    asyncio.run(main())