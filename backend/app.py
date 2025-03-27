import logging
from backend import create_app
logging.basicConfig(level=logging.INFO)

app = create_app()

application = app

@app.route('/')
def index():
    return 'Server is running'

logging.info("Application setup completed")

if __name__ == "__main__":
    import os
    if os.getenv('FLASK_ENV') == 'development':
        import subprocess
        subprocess.run(["flask", "run"])
    else:
        app.run(
            host='0.0.0.0',
            port=5000
        )




