import os
import json
from fastapi import FastAPI
from datetime import datetime, timezone
from openai import OpenAI

from app.models import GenerationRequest, GenerationResponse
from app.utils.prompts import get_prompt
from app.utils.logger import setup_logger, log_text, log_json, log_prompt_used

#---Setup---

A4F_API_KEY = os.getenv("A4F_API_KEY")
A4F_AI_MODEL = "provider-2/gpt-oss-120b"

system_prompt_name = "system:1"
system_prompt = get_prompt(system_prompt_name)

logger = setup_logger()

#---Setup---


app = FastAPI()

client = OpenAI(
    base_url="https://api.a4f.co/v1",
    api_key=A4F_API_KEY,
)



@app.get("/health")
async def health_check():
    log_text("health", "i am alive")
    return {"status": "ok"}

@app.post("/generate")
async def generate_response(request: GenerationRequest):
    # Текущее серверное время (можно заменить временем сообщения из gateway позже)
    now_iso = datetime.now(timezone.utc).isoformat()

    log_text("USER PROMPT", request.prompt)
    log_prompt_used(system_prompt_name)

    messages = [
        {
            "role": "system",
            "content": system_prompt
        },
        {
            "role": "system",
            "content": f"Текущая дата и время (UTC): {now_iso}"
        },
        {
            "role": "user",
            "content": request.prompt
        }
    ]

    if request.context:
        messages.insert(
            2,
            {
                "role": "system",
                "content": "Контекст:\n" + "\n".join(request.context)
            }
        )

    result = client.chat.completions.create(
        model=A4F_AI_MODEL,
        messages=messages,
    )

    content = result.choices[0].message.content.strip()

    log_text("AI RAW RESPONSE", content)

    meta = None
    summary = content

    # Пытаемся извлечь JSON
    try:
        json_start = content.index("{")
        json_end = content.rindex("}") + 1

        meta = json.loads(content[json_start:json_end])

        # summary — всё, что до JSON
        summary = content[:json_start].strip()

        # fallback, если модель не дала summary отдельно
        if not summary and isinstance(meta, dict):
            summary = meta.get("summary", "")
    except Exception:
        # JSON не найден — считаем весь ответ текстом
        meta = {
            "summary": summary,
            "tasks": []
        }

    return GenerationResponse(
        response=summary,
        meta=meta
    )
