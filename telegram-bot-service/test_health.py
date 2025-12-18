import httpx
import asyncio

async def test_health():
    url = "http://localhost:8000/health"
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(url, timeout=5.0)
            print(f"Status: {response.status_code}")
            print(f"Response: {response.json()}")
        except Exception as e:
            print(f"Ошибка: {e}")

if __name__ == "__main__":
    asyncio.run(test_health())