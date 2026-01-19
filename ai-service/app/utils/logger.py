import os
import sys
import json
from loguru import logger

#TODO: Сохранение логов в файл.

LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO").upper()


def setup_logger():
    """
    Настраивает loguru для приложения.
    Вызывать один раз при старте.
    """
    logger.remove()  # убираем стандартный handler

    logger.add(
        sys.stdout,
        level=LOG_LEVEL,
        format=(
            "<green>{time:YYYY-MM-DD HH:mm:ss}</green> | "
            "<level>{level}</level> | "
            "<cyan>{name}</cyan> | "
            "{message}" #FIXME: Неправильно выводиться лог, путь всегда из app.utils.logger
        ),
        backtrace=True,
        diagnose=False,  # True — слишком шумно для AI
    )

    return logger


def log_text(title: str, text: str, level: str = "INFO"):
    """
    Логирование длинного текста (prompt / response).
    """
    getattr(logger, level.lower())(
        "{}:\n{}", title, text
    )
    
def log_prompt_used(prompt_name: str, level: str = "DEBUG"):
    getattr(logger, level.lower())(
        "SYSTEM PROMPT USED: {}", prompt_name
    )

def log_json(title: str, data: dict, level: str = "INFO"):
    """
    Логирование JSON-структур.
    """
    pretty = json.dumps(data, ensure_ascii=False, indent=2)
    getattr(logger, level.lower())(
        "{}:\n{}", title, pretty
    )
