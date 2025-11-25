from watchfiles import run_process
import asyncio
import uvicorn
from app.server import app as fastapi_app

async def _run_uvicorn():
    # uvicorn.Server может работать асинхронно
    config_uv = uvicorn.Config(fastapi_app, host="0.0.0.0", port=8000, log_level="info")
    server = uvicorn.Server(config_uv)
    await server.serve()

async def main():
    # Запускаем uvicorn в таске
    uv_task = await asyncio.create_task(_run_uvicorn())


if __name__ == "__main__":
    asyncio.run(main())
    