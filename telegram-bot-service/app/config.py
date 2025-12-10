import os
from dataclasses import dataclass
from dotenv import load_dotenv


load_dotenv()


data = os.getenv


@dataclass
class Config:
    bot_token: str
    use_webhook: bool
    webhook_url: str | None
    backend_url: str | None # куда бот отправляет сообщения (служба обработки)
    internal_api_key: str | None # API ключ для внутреннего endpoint-а (backend -> bot)
    ai_service_url: str | None # URL микросервиса нейросети


def load_config() -> Config:
    return Config(
        bot_token=data("BOT_TOKEN"),
        use_webhook=data("USE_WEBHOOK", "false").lower() == "true",
        webhook_url=data("WEBHOOK_URL"),
        backend_url=data("BACKEND_URL"),
        internal_api_key=data("INTERNAL_API_KEY"),
        ai_service_url=data("AI_SERVICE_URL")
    )