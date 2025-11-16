from watchfiles import run_process

if __name__ == "__main__":
    run_process(
        ".",              # следит за всеми .py в проекте, можешь указать "app"
        target="python bot.py"
    )