import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_mail import Mail
from dotenv import load_dotenv
from datetime import timedelta
import logging
from backend.config import Config

load_dotenv()
logging.basicConfig(level=logging.INFO)

db = SQLAlchemy()
migrate = Migrate()
bcrypt = Bcrypt()
jwt = JWTManager()
mail = Mail()
cors = CORS()



def create_app(config_class=Config):
    app = Flask(__name__, static_folder='static')
    app.config.from_object(config_class)

    #jwt configurations
    app.config["JWT_SECRET_KEY"] = os.environ.get("JWT_SECRET_KEY", "super-secret-key")
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(days=1) # expires in 1 day
    app.config["JWT_REFRESH_TOKEN_EXPIRES"] = timedelta(days=7) # expires in a week

    # mail configurations
    app.config['MAIL_SERVER'] = os.environ.get('UAT_MAIL_SERVER')
    app.config['MAIL_PORT'] = os.environ.get('UAT_MAIL_PORT') # 587 For TLS (use 465 for SSL)
    app.config['MAIL_USE_TLS'] = True
    app.config['MAIL_USE_SSL'] = False
    app.config['MAIL_USERNAME'] = os.environ.get('UAT_MAIL_USERNAME')
    app.config['MAIL_PASSWORD'] = os.environ.get('UAT_MAIL_APP_PASSWORD')
    app.config['MAIL_DEFAULT_SENDER'] = os.environ.get('UAT_MAIL_DEFAULT_SENDER')

    db.init_app(app)
    migrate.init_app(app, db)
    bcrypt.init_app(app)
    jwt.init_app(app)
    mail.init_app(app)
    cors = CORS(app, resources={
        r"/*": {
            "origins": "*",
            "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
        },
        # Special stricter config for analytics
        r"/analytics/*": {
            "origins": ["http://localhost:5173", "http://127.0.0.1:5173"],
            "methods": ["GET", "OPTIONS"],
            "allow_headers": ["Authorization", "Content-Type"],
            "supports_credentials": True,
            "max_age": 86400  # Preflight cache for 24 hours
        }
    })

    #models
    from .model.user import User
    print("✅ User model loaded successfully")  # Verification
    from .model.tracking import Tracking
    from .model.parcel import Parcel
    from .model.delivery import Delivery
    from .model.order import Order
    from .model.notification import Notification

    # routes
    from .routes.admin import admin
    from .routes.auth import auth
    from .routes.business import business
    from .routes.agent import agent
    from .routes.notification import notification
    from .routes.buyer import buyer
    from .routes.analytics import analytics

    # register blueprints
    app.register_blueprint(auth)
    app.register_blueprint(admin)
    app.register_blueprint(business)
    app.register_blueprint(agent)
    app.register_blueprint(notification)
    app.register_blueprint(buyer)
    app.register_blueprint(analytics, url_prefix='/analytics')


    return app