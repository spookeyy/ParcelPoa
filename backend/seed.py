import random
from datetime import datetime, timedelta
from faker import Faker
from flask import Flask
from models import db, User, Parcel, Delivery, Feedback, Notification, Tracking, Order, Product
from app import app

faker = Faker()

with app.app_context():
    db.drop_all()
    db.create_all()

    def seed_users(num_users=10):
        user_types = ['Client', 'Business', 'Agent']
        for _ in range(num_users):
            user = User(
                name=faker.name(),
                email=faker.unique.email(),
                phone_number=faker.unique.phone_number(),
                user_type=random.choice(user_types),
                created_at=datetime.utcnow(),
                updated_at=datetime.utcnow()
            )
            db.session.add(user)
        db.session.commit()

    def seed_parcels(num_parcels=20):
        user_ids = [user.user_id for user in User.query.filter(User.user_type.in_(['Client', 'Business'])).all()]
        for _ in range(num_parcels):
            parcel = Parcel(
                sender_id=random.choice(user_ids),
                recipient_name=faker.name(),
                recipient_address=faker.address(),
                recipient_phone=faker.phone_number(),
                description=faker.text(),
                weight=round(random.uniform(1.0, 10.0), 2),
                created_at=datetime.utcnow(),
                updated_at=datetime.utcnow()
            )
            db.session.add(parcel)
        db.session.commit()

    def seed_deliveries(num_deliveries=15):
        parcel_ids = [parcel.parcel_id for parcel in Parcel.query.all()]
        agent_ids = [user.user_id for user in User.query.filter_by(user_type='Agent').all()]
        statuses = ['Scheduled', 'In Transit', 'Delivered']
        for _ in range(num_deliveries):
            delivery = Delivery(
                parcel_id=random.choice(parcel_ids),
                agent_id=random.choice(agent_ids),
                pickup_time=datetime.utcnow(),
                delivery_time=datetime.utcnow() + timedelta(days=random.randint(1, 5)),
                status=random.choice(statuses),
                created_at=datetime.utcnow(),
                updated_at=datetime.utcnow()
            )
            db.session.add(delivery)
        db.session.commit()

    def seed_feedback(num_feedbacks=10):
        user_ids = [user.user_id for user in User.query.all()]
        delivery_ids = [delivery.delivery_id for delivery in Delivery.query.all()]
        for _ in range(num_feedbacks):
            feedback = Feedback(
                user_id=random.choice(user_ids),
                delivery_id=random.choice(delivery_ids),
                rating=random.randint(1, 5),
                comments=faker.text(),
                created_at=datetime.utcnow()
            )
            db.session.add(feedback)
        db.session.commit()

    def seed_notifications(num_notifications=10):
        user_ids = [user.user_id for user in User.query.all()]
        types = ['SMS', 'Email', 'App']
        statuses = ['Sent', 'Delivered', 'Read']
        for _ in range(num_notifications):
            notification = Notification(
                user_id=random.choice(user_ids),
                message=faker.text(),
                type=random.choice(types),
                status=random.choice(statuses),
                created_at=datetime.utcnow()
            )
            db.session.add(notification)
        db.session.commit()

    def seed_tracking(num_trackings=15):
        parcel_ids = [parcel.parcel_id for parcel in Parcel.query.all()]
        statuses = ['Picked Up', 'In Transit', 'Out for Delivery', 'Delivered']
        for _ in range(num_trackings):
            tracking = Tracking(
                parcel_id=random.choice(parcel_ids),
                location=faker.city(),
                status=random.choice(statuses),
                timestamp=datetime.utcnow()
            )
            db.session.add(tracking)
        db.session.commit()

    def seed_orders(num_orders=10):
        user_ids = [user.user_id for user in User.query.all()]
        parcel_ids = [parcel.parcel_id for parcel in Parcel.query.all()]
        for _ in range(num_orders):
            order = Order(
                user_id=random.choice(user_ids),
                parcel_id=random.choice(parcel_ids),
                created_at=datetime.utcnow(),
                updated_at=datetime.utcnow()
            )
            db.session.add(order)
        db.session.commit()

    def seed_products(num_products=20):
        order_ids = [order.order_id for order in Order.query.all()]
        for _ in range(num_products):
            product = Product(
                order_id=random.choice(order_ids),
                name=faker.word(),
                description=faker.text(),
                price=round(random.uniform(5.0, 100.0), 2),
                quantity=random.randint(1, 10),
                created_at=datetime.utcnow(),
                updated_at=datetime.utcnow()
            )
            db.session.add(product)
        db.session.commit()

    seed_users()
    seed_parcels()
    seed_deliveries()
    seed_feedback()
    seed_notifications()
    seed_tracking()
    seed_orders()
    seed_products()
