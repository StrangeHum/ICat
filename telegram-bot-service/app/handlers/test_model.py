from aiogram import Router, types
from aiogram.filters import Command
from app.services.session import get_session, update_session, reset_session
from app.services.forwarder import generate_ai_response

router = Router()

@router.message(Command("test_model"))
async def cmd_test_model(message: types.Message):
    # Сброс сессии и начало нового диалога
    reset_session(message.from_user.id)
    await message.answer("Сессия начата. Отправьте сообщение для модели.")

@router.message()
async def handle_message(message: types.Message):
    user_id = message.from_user.id
    # Получаем текущую сессию
    session_messages = get_session(user_id)
    # Добавляем сообщение пользователя
    update_session(user_id, message.text, "user")
    
    # Формируем промт из всей истории сессии
    prompt = "\n".join([f"{msg['role']}: {msg['content']}" for msg in session_messages])
    
    # Отправляем в ai-service
    # Передаем context=None, так как вся история уже в промпте
    print(prompt)
    response = await generate_ai_response(prompt, context=None)

    if response is None:
        await message.answer(f"Ошибка генерации ответа {prompt}")
        return
    
    # Добавляем ответ ассистента в сессию
    update_session(user_id, response, "assistant")
    await message.answer(response)