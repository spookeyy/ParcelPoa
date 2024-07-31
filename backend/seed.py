import random
import string
from datetime import datetime, timedelta, timezone
from faker import Faker
from flask import Flask
from sqlalchemy import text
from models import db, User, Parcel, Delivery, Notification, Tracking, Order
from app import app

faker = Faker()

def generate_phone_number():
    country_code = '+254'
    mobile_network_code = random.randint(70, 79)
    subscriber_number = ''.join(str(random.randint(0, 9)) for _ in range(7))
    return f'{country_code}{mobile_network_code}{subscriber_number}'

# def generate_email():
#     username = faker.user_name()
#     domain = 'gmail.com'
#     return f'{username}@{domain}' 

with app.app_context():
    db.drop_all()
    # db.session.execute(text("DROP TABLE IF EXISTS alembic_version"))
    # db.session.commit()
    db.create_all()

    def seed_users(num_users=10):
        user_roles = ['Client','Business', 'Agent']
        for _ in range(num_users):
            user = User(
                name=faker.name(),
                email=faker.unique.email(),
                phone_number=generate_phone_number(),
                user_role=random.choice(user_roles),
                password_hash='password',
                created_at=datetime.now(timezone.utc),
                updated_at=datetime.now(timezone.utc)
            )
            db.session.add(user)
        db.session.commit()
        print(f"Seeded {num_users} users.")

    def seed_parcels(num_parcels=20):
        user_ids = [user.user_id for user in User.query.filter(User.user_role.in_(['Client', 'Agent'])).all()]
        statuses = ['Scheduled', 'In Transit', 'Delivered']
        for _ in range(num_parcels):
            parcel = Parcel(
                sender_id=random.choice(user_ids),
                tracking_number=''.join(random.choices(string.ascii_uppercase + string.digits, k=10)),
                recipient_name=faker.name(),
                recipient_address=faker.address(),
                recipient_phone=generate_phone_number(),
                description=faker.text(),
                weight=round(random.uniform(1.0, 10.0), 2),
                status=random.choice(statuses),
                created_at=datetime.now(timezone.utc),
                updated_at=datetime.now(timezone.utc),
                current_location=faker.address()
            )
            db.session.add(parcel)
        db.session.commit()
        print(f"Seeded {num_parcels} parcels.")

    def seed_deliveries(num_deliveries=15):
        parcel_ids = [parcel.parcel_id for parcel in Parcel.query.all()]
        agent_ids = [user.user_id for user in User.query.filter_by(user_role='Agent').all()]
        statuses = ['Scheduled', 'In Transit', 'Delivered']
        for _ in range(num_deliveries):
            delivery = Delivery(
                parcel_id=random.choice(parcel_ids),
                agent_id=random.choice(agent_ids),
                pickup_time=datetime.now(timezone.utc),
                delivery_time=datetime.now(timezone.utc) + timedelta(days=random.randint(1, 5)),
                status=random.choice(statuses),
                created_at=datetime.now(timezone.utc),
                updated_at=datetime.now(timezone.utc)
            )
            db.session.add(delivery)
        db.session.commit()
        print(f"Seeded {num_deliveries} deliveries.")


    def seed_notifications(num_notifications=10):
        user_ids = [user.user_id for user in User.query.all()]
        types = ['SMS', 'Email']
        statuses = ['Sent', 'Delivered', 'Read']
        for _ in range(num_notifications):
            notification = Notification(
                user_id=random.choice(user_ids),
                message=faker.text(),
                type=random.choice(types),
                status=random.choice(statuses),
                created_at=datetime.now(timezone.utc)
            )
            db.session.add(notification)
        db.session.commit()
        print(f"Seeded {num_notifications} notifications.")

    def seed_tracking(num_trackings=15):
        parcel_ids = [parcel.parcel_id for parcel in Parcel.query.all()]
        statuses = ['Picked Up', 'In Transit', 'Out for Delivery', 'Delivered']
        for _ in range(num_trackings):
            tracking = Tracking(
                parcel_id=random.choice(parcel_ids),
                location=faker.city(),
                status=random.choice(statuses),
                timestamp=datetime.now(timezone.utc)
            )
            db.session.add(tracking)
        db.session.commit()
        print(f"Seeded {num_trackings} trackings.")

    def seed_orders(num_orders=10):
        user_ids = [user.user_id for user in User.query.all()]
        parcel_ids = [parcel.parcel_id for parcel in Parcel.query.all()]
        for _ in range(num_orders):
            order = Order(
                user_id=random.choice(user_ids),
                parcel_id=random.choice(parcel_ids),
                created_at=datetime.now(timezone.utc),
                updated_at=datetime.now(timezone.utc)
            )
            db.session.add(order)
        db.session.commit()
        print(f"Seeded {num_orders} orders.")


    seed_users()
    seed_parcels()
    seed_deliveries()
    seed_notifications()
    seed_tracking()
    seed_orders()

