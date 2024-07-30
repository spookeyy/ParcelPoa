from flask import Flask, request, jsonify
from flask_migrate import Migrate

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = 'sqlite:///database.db'
from models import db, User, Parcel, Delivery, Feedback, Notification, Tracking, Order, Product
migrate = Migrate(app,db)
db.init_app(app)


if __name__ == "__main__":
    app.run(debug=True)