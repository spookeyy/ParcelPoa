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

def generate_email(name):
    # Convert the name to lowercase and remove spaces
    username = name.lower().replace(' ', '')
    # a random number to ensure uniqueness
    username += str(random.randint(1, 9999))
    domain = 'gmail.com'
    return f'{username}@{domain}' 

with app.app_context():
    db.drop_all()
    db.create_all()

    def seed_users(num_users=10):
        user_roles = [ 'Business', 'Agent']
        users = []
        for _ in range(num_users):
            name = faker.name()
            user = User(
                name=name,
                email=generate_email(name),
                phone_number=generate_phone_number(),
                user_role=random.choice(user_roles),
                password_hash='password',
                created_at=datetime.now(timezone.utc),
                updated_at=datetime.now(timezone.utc)
            )
            users.append(user)
            db.session.add(user)
        db.session.commit()
        print(f"Seeded {num_users} users.")
        return users

    def seed_parcels(users, num_parcels=20):
        parcels = []
        for _ in range(num_parcels):
            sender = random.choice([u for u in users if u.user_role in [ 'Business']])
            recipient = random.choice(users)
            parcel = Parcel(
                sender_id=sender.user_id,
                tracking_number=''.join(random.choices(string.ascii_uppercase + string.digits, k=10)),
                recipient_name=recipient.name,
                recipient_address=faker.address(),
                recipient_phone=recipient.phone_number,
                description=faker.text(),
                weight=round(random.uniform(1.0, 10.0), 2),
                status='Scheduled',
                created_at=datetime.now(timezone.utc),
                updated_at=datetime.now(timezone.utc),
                current_location=faker.address()
            )
            parcels.append(parcel)
            db.session.add(parcel)
        db.session.commit()
        print(f"Seeded {num_parcels} parcels.")
        return parcels

    def seed_deliveries(parcels, users, num_deliveries=15):
        deliveries = []
        agents = [user for user in users if user.user_role == 'Agent']
        for parcel in random.sample(parcels, num_deliveries):
            delivery = Delivery(
                parcel_id=parcel.parcel_id,
                agent_id=random.choice(agents).user_id,
                pickup_time=datetime.now(timezone.utc),
                delivery_time=datetime.now(timezone.utc) + timedelta(days=random.randint(1, 5)),
                status='Scheduled',
                created_at=datetime.now(timezone.utc),
                updated_at=datetime.now(timezone.utc)
            )
            deliveries.append(delivery)
            db.session.add(delivery)
        db.session.commit()
        print(f"Seeded {num_deliveries} deliveries.")
        return deliveries
    
    def seed_orders(users, parcels, num_orders=10):
        orders = []
        for _ in range(num_orders):
            user = random.choice([u for u in users if u.user_role in [ 'Business']])
            parcel = random.choice(parcels)
            order = Order(
                user_id=user.user_id,
                parcel_id=parcel.parcel_id,
                created_at=datetime.now(timezone.utc),
                updated_at=datetime.now(timezone.utc)
            )
            orders.append(order)
            db.session.add(order)
        db.session.commit()
        print(f"Seeded {num_orders} orders.")
        return orders


    def seed_notifications(users, num_notifications=10):
        notifications = []
        types = ['SMS', 'Email', 'App']
        statuses = ['Sent', 'Delivered', 'Read']
        
        for _ in range(num_notifications):
            user = random.choice(users)
            notification = Notification(
                user_id=user.user_id,
                message=faker.text(),
                type=random.choice(types),
                status=random.choice(statuses),
                created_at=datetime.now(timezone.utc)
            )
            notifications.append(notification)
            db.session.add(notification)
        db.session.commit()
        print(f"Seeded {num_notifications} notifications.")
        return notifications

    def seed_tracking(parcels):
        trackings = []
        statuses = ['Picked Up', 'In Transit', 'Out for Delivery', 'Delivered']
        
        for parcel in parcels:
            # Generate 1 to 4 tracking entries for each parcel
            num_entries = random.randint(1, 4)
            current_status_index = 0
            
            for i in range(num_entries):
                # Ensure status progresses logically
                status = statuses[current_status_index]
                
                tracking = Tracking(
                    parcel_id=parcel.parcel_id,
                    location=faker.city(),
                    status=status,
                    timestamp=datetime.now(timezone.utc) + timedelta(hours=i*6)  # Space out timestamps
                )
                trackings.append(tracking)
                db.session.add(tracking)
                
                # Move to next status for next entry, if any
                if current_status_index < len(statuses) - 1:
                    current_status_index += 1
            
            # Update parcel status to match its last tracking status
            parcel.status = trackings[-1].status
            
        db.session.commit()
        print(f"Seeded {len(trackings)} trackings for {len(parcels)} parcels.")
        return trackings


    users = seed_users()
    parcels = seed_parcels(users)
    deliveries = seed_deliveries(parcels, users)
    orders = seed_orders(users, parcels)
    notifications = seed_notifications(users)
    trackings = seed_tracking(parcels)

