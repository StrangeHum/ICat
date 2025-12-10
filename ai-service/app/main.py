from fastapi import FastAPI
import httpx
import os
from app.models import GenerationRequest, GenerationResponse
from openai import OpenAI

A4F_API_URL = "https://api.a4f.co/v1"
A4F_API_KEY = os.getenv("A4F_API_KEY")  # Берем из переменных окружения

app = FastAPI()
client = OpenAI(
  base_url="https://api.a4f.co/v1",
  api_key=A4F_API_KEY,
)

@app.get("/health")
async def health_check():
    return {"status": "ok"}

@app.post("/generate")
async def generate_response(request: GenerationRequest):
    headers = {
        "Authorization": f"Bearer {A4F_API_KEY}",
        "Content-Type": "application/json"
    }
    data = {
        "model": "provider-1/deepseek-r1-0528",
        "messages": [{"role": "user", "content": request.prompt}],
        "temperature": 0.7,
        "max_tokens": 82000  # Увеличено до 82к токенов
    }
    try:
        response = client.chat.completions.create(
            model= "provider-1/deepseek-r1-0528",
            messages=[
                {
                "role": "user",
                "content": request.prompt,
                },
            ],
        )
        return GenerationResponse(response=response.choices[0].message.content)

    except httpx.ReadTimeout:
        return GenerationResponse(response="Ошибка: превышено время ожидания ответа")
    except httpx.HTTPStatusError as e:
        return GenerationResponse(response=f"Ошибка API: {e.response.status_code}")
    except Exception as e:
        return GenerationResponse(response=f"Неизвестная ошибка: {str(e)}")