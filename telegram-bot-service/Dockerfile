FROM python:3.11-slim

WORKDIR /app

# Установка Poetry
RUN pip install poetry

# Копируем зависимости
COPY pyproject.toml poetry.lock ./

# Устанавливаем зависимости (без разработческих)
RUN poetry config virtualenvs.create false && \
    poetry install --no-dev

# Копируем исходный код
COPY . .

# Запускаем приложение
CMD ["python", "run.py"]