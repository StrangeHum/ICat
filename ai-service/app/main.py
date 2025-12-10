from fastapi import FastAPI
import httpx
import os
from app.models import GenerationRequest, GenerationResponse

app = FastAPI()

A4F_API_URL = "https://api.a4f.co/v1/chat/completions"
A4F_API_KEY = os.getenv("A4F_API_KEY")  # Берем из переменных окружения

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
        "model": "provider-1/chatgpt-4o-latest",
        "messages": [{"role": "user", "content": request.prompt}],
        "temperature": 0.7,
        "max_tokens": 1000
    }
    async with httpx.AsyncClient() as client:
        response = await client.post(A4F_API_URL, json=data, headers=headers, timeout=60)
        response.raise_for_status()
        result = response.json()
        if result.get("choices") and len(result["choices"]) > 0:
            return GenerationResponse(response=result['choices'][0]['message']['content'])
        else:
            return GenerationResponse(response="Ошибка: модель не вернула ответ")