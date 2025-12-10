import time
from collections import defaultdict

# Хранилище сессий в памяти: user_id -> (last_active, messages)
sessions = defaultdict(lambda: (0, []))

SESSION_TIMEOUT = 1800  # 30 минут в секундах

def get_session(user_id: int):
    last_active, messages = sessions[user_id]
    current_time = time.time()
    if current_time - last_active > SESSION_TIMEOUT:
        # Сброс сессии по таймауту
        sessions[user_id] = (current_time, [])
        return []
    sessions[user_id] = (current_time, messages)
    return messages

def update_session(user_id: int, message: str, role: str = "user"):
    current_time = time.time()
    _, messages = sessions[user_id]
    messages.append({"role": role, "content": message})
    sessions[user_id] = (current_time, messages)
    return messages

def reset_session(user_id: int):
    sessions[user_id] = (time.time(), [])