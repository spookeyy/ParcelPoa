import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'your-secret-key'
    
    #get path to backend
    BASE_DIR = os.path.abspath(os.path.dirname(__file__))

    DB_PATH = os.path.join(BASE_DIR, 'instance', 'parcelpoauat.db')

    #ensure instance folder exists
    os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)

    SQLALCHEMY_DATABASE_URI = f'sqlite:///{DB_PATH}'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY') or 'your-secret-key'