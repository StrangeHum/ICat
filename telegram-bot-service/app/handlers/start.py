from aiogram import Router
from aiogram.types import Message
from aiogram.filters import Command
from app.keyboards.main_menu import main_menu
from app.services.forwarder import forward_to_backend


router = Router()


@router.message(Command("start"))
async def cmd_start(message: Message):
    await message.answer("Привет! Чтобы помочь быстрее, выбери тип проблемы: \nЕсли не можете определить — опишите проблему в сообщении, бот постарается определить тип автоматически.", reply_markup=main_menu)




@router.message()
async def catch_all(message: Message):
    """Ловим любые сообщения от пользователя, сохраняем минимальную информацию и пересылаем на backend."""
    payload = {
        "from_id": message.from_user.id,
        "username": message.from_user.username,
        "text": message.text,
        "message_id": message.message_id,
        "chat_id": message.chat.id,
        # TODO: later add attachments info
    }


    await message.answer("Ваша заявка отправлена. Если необходимо — можете прислать дополнительные данные (скриншоты, текст).")


# Отправляем на backend (async)
    await forward_to_backend(payload)