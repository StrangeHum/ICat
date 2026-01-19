from aiogram.types import ReplyKeyboardMarkup, KeyboardButton


add_task_menu = ReplyKeyboardMarkup(keyboard=[
    [KeyboardButton(text="tasks")],
    [KeyboardButton(text="addtask")],
], resize_keyboard=True)