FROM python:3.13-slim

WORKDIR /app

# Установка Poetry и системных зависимостей
RUN apt-get update && \
    apt-get install -y build-essential && \
    pip install poetry && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Копируем зависимости
COPY pyproject.toml ./

# Устанавливаем зависимости (без разработческих)
RUN poetry config virtualenvs.create false && \
    poetry install --no-root

# Копируем исходный код
COPY . .

# Устанавливаем проект


# Запускаем приложение
CMD ["python", "run.py"]