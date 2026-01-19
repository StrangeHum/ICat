from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
PROMPTS_DIR = BASE_DIR / "prompts"


class PromptNotFoundError(Exception):
    pass


def get_prompt(name: str) -> str:
    """
    Загружает промпт по имени файла без расширения.
    Пример: get_prompt("system") -> prompts/system.txt
    """
    path = PROMPTS_DIR / f"{name}.txt"

    if not path.exists():
        raise PromptNotFoundError(f"Prompt '{name}' not found at {path}")

    return path.read_text(encoding="utf-8")
