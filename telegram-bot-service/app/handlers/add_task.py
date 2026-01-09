from aiogram import Router
from aiogram.types import Message
from aiogram.filters import Command

router = Router()

tasks = []
lastTaskId = 0


@router.message(Command("addtask"))
async def addtask(message: Message):
    global lastTaskId

    # текст после команды
    text = message.text.replace("/addtask", "").strip()

    if not text:
        await message.answer("❗ Укажи текст задачи")
        return

    tasks.append({
        "id": lastTaskId,
        "text": text
    })

    lastTaskId += 1

    await message.answer("✅ Задача успешно добавлена")


@router.message(Command("tasks"))
async def get_tasks(message: Message):
    if not tasks:
        await message.answer("📭 Список задач пуст")
        return

    result = "\n".join(
        f"{task['id']}. {task['text']}"
        for task in tasks
    )

    await message.answer(f"📋 Список задач:\n{result}")
