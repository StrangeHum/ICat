# from aiogram import Bot, Dispatcher
# from aiogram.enums import ParseMode
# from aiogram.fsm.storage.memory import MemoryStorage
# from aiogram.types import BotCommand
# from app.config import load_config
# from app.handlers.start import register_start
# from aiogram.client.default import DefaultBotProperties

# async def set_commands(bot: Bot):
#     commands = [
#         BotCommand(command="start", description="Запуск бота"),
#     ]
#     await bot.set_my_commands(commands)


# async def main():
#     config = load_config()


#     bot = Bot(
#         token=config.bot_token,
#         default=DefaultBotProperties(parse_mode=ParseMode.HTML)
#     )
#     dp = Dispatcher(storage=MemoryStorage())


#     # Регистрация хендлеров
#     register_start(dp)


#     await set_commands(bot)
#     # Webhook отключён по умолчанию — работаем через polling
#     if not config.use_webhook:
#         await dp.start_polling(bot)
#     else:
#     # Заглушка под webhook для прод
#         await bot.set_webhook(config.webhook_url)
#         print("Webhook включён. Бот работает через вебхуки.")


# if __name__ == '__main__':
#     import asyncio
#     asyncio.run(main())
from app.bot_app import create_bot_and_dp
from app.config import load_config


async def main():
    # create_bot_and_dp() будет инициализировать глобальные объекты
    bot, dp = create_bot_and_dp()
    # create_bot_and_dp()
    config = load_config()


    # Webhook отключён по умолчанию — работаем через polling
    if not config.use_webhook:
    # Запуск polling (не блокирующий — оставляем управление внешнему runner-у)
        await dp.start_polling(bot)
    else:
        await bot.set_webhook(config.webhook_url)
        print("Webhook включён. Бот работает через вебхуки.")


if __name__ == '__main__':
    import asyncio
    asyncio.run(main())