import React from "react";
import "./../app/test-globals.css"; // Импортируем наш тестовый CSS

const TestGlobals: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="test-typography">Тест функционала globals.css</h1>
      <p className="test-typography">
        Этот компонент демонстрирует использование CSS переменных из globals.css и styles/globals.css.
      </p>

      <div className="test-background mt-4">
        <h2>Фон и цвет текста</h2>
        <p>Использует переменные --background и --foreground.</p>
        <button className="test-button mt-2">Тестовая кнопка</button>
      </div>

      <div className="mt-4">
        <p className="test-custom">Кастомный цвет из новой переменной --custom-color.</p>
      </div>

      <div className="mt-4 p-4 border rounded">
        <h3>Переменные радиуса:</h3>
        <p>var(--radius): {getComputedStyle(document.documentElement).getPropertyValue('--radius')}</p>
        <p>var(--radius-sm): {getComputedStyle(document.documentElement).getPropertyValue('--radius-sm')}</p>
        <p>var(--radius-md): {getComputedStyle(document.documentElement).getPropertyValue('--radius-md')}</p>
        <p>var(--radius-lg): {getComputedStyle(document.documentElement).getPropertyValue('--radius-lg')}</p>
        <p>var(--radius-xl): {getComputedStyle(document.documentElement).getPropertyValue('--radius-xl')}</p>
      </div>
    </div>
  );
};

export default TestGlobals;