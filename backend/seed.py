import random
import string
from decimal import Decimal
from datetime import datetime, timedelta, timezone
from faker import Faker
from flask import Flask
from sqlalchemy import text
from models import db, User, Parcel, Delivery, Notification, Tracking, Order
from app import app, mail
from flask_mail import Message

faker = Faker()

def generate_phone_number():
    country_code = '+254'
    mobile_network_code = random.randint(70, 79)
    subscriber_number = ''.join(str(random.randint(0, 9)) for _ in range(7))
    return f'{country_code}{mobile_network_code}{subscriber_number}'

def generate_email(name):
    username = name.lower().replace(' ', '') + str(random.randint(1, 9999))
    domain = random.choice(['gmail.com', 'yahoo.com', 'outlook.com'])
    return f'{username}@{domain}'

def send_notification(email, subject, body):
    with app.app_context():
        msg = Message(subject, sender=app.config['MAIL_DEFAULT_SENDER'], recipients=[email], body=body)
        mail.send(msg)

with app.app_context():
    db.drop_all()
    db.create_all()

    def seed_users(num_users=10):
        # Create admin user
        admin = User(
            name='Admin',
            email='admin@gmail.com',
            phone_number=generate_phone_number(),
            user_role='Admin',
            created_at=datetime.now(timezone.utc),
            updated_at=datetime.now(timezone.utc),
            profile_picture='default.png',
            status='Available',
            Request='Approved',
            primary_region='Nairobi',
            operation_areas='Nairobi,Mombasa,Kisumu'
        )
        admin.set_password('admin1234')  # 8-character password
        db.session.add(admin)

        user_roles = ['Business', 'Agent']
        users = [admin]
        for _ in range(num_users):
            name = faker.name()
            user_role = random.choice(user_roles)
            user = User(
                name=name,
                email=generate_email(name),
                phone_number=generate_phone_number(),
                user_role=user_role,
                created_at=datetime.now(timezone.utc),
                updated_at=datetime.now(timezone.utc),
                profile_picture='default.png',
                status='Available',
                Request='Approved' if user_role == 'Business' else 'Pending',
                primary_region=faker.city(),
                operation_areas=','.join([faker.city() for _ in range(3)])  # Generate 3 random cities
            )
            user.set_password('password')
            users.append(user)
            db.session.add(user)
        db.session.commit()
        print(f"Seeded {num_users + 1} users (including admin).")
        return users


    def seed_parcels(users, num_parcels=20):
        parcels = []
        categories = ['Small Electronic', 'Envelope', 'Big electronic', 'Food']
        statuses = ['Scheduled for Pickup', 'Picked Up', 'Out for Delivery', 'In Transit', 'Delivered', 'Cancelled']
        for _ in range(num_parcels):
            sender = random.choice([u for u in users if u.user_role == 'Business'])
            recipient = random.choice(users)
            parcel = Parcel(
                sender_id=sender.user_id,
                tracking_number=''.join(random.choices(string.ascii_uppercase + string.digits, k=10)),
                recipient_name=recipient.name,
                recipient_address=faker.address(),
                recipient_phone=recipient.phone_number,
                description=faker.text(),
                weight=Decimal(str(round(random.uniform(1.0, 10.0), 2))),
                created_at=datetime.now(timezone.utc),
                updated_at=datetime.now(timezone.utc),
                current_location=faker.city(),
                status=random.choice(statuses),
                sender_email=sender.email,
                recipient_email=recipient.email,
                category=random.choice(categories),
                latitude=float(faker.latitude()),
                longitude=float(faker.longitude())
            )
            parcels.append(parcel)
            db.session.add(parcel)
        db.session.commit()
        print(f"Seeded {num_parcels} parcels.")
        return parcels

    def seed_deliveries(parcels, users, num_deliveries=15):
        deliveries = []
        agents = [user for user in users if user.user_role == 'Agent' and user.Request == 'Approved']
        statuses = ['Scheduled', 'In Transit', 'Delivered']
        for parcel in random.sample(parcels, num_deliveries):
            delivery = Delivery(
                parcel_id=parcel.parcel_id,
                agent_id=random.choice(agents).user_id if agents else None,
                pickup_time=datetime.now(timezone.utc),
                delivery_time=datetime.now(timezone.utc) + timedelta(days=random.randint(1, 5)),
                status=random.choice(statuses),
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
            user = random.choice([u for u in users if u.user_role == 'Business'])
            parcel = random.choice(parcels)
            order = Order(
                order_number=''.join(random.choices(string.ascii_uppercase + string.digits, k=8)),
                user_id=user.user_id,
                parcel_id=parcel.parcel_id,
                created_at=datetime.now(timezone.utc),
                updated_at=datetime.now(timezone.utc),
                status=random.choice(['Active', 'Cancelled'])
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
        statuses = ['Scheduled for Pickup', 'Picked Up', 'Out for Delivery', 'In Transit', 'Delivered', 'Cancelled']
        
        for parcel in parcels:
            num_entries = random.randint(1, len(statuses))
            
            for i in range(num_entries):
                status = statuses[i]
                
                tracking = Tracking(
                    parcel_id=parcel.parcel_id,
                    location=faker.city(),
                    status=status,
                    timestamp=datetime.now(timezone.utc) + timedelta(hours=i*6)
                )
                trackings.append(tracking)
                db.session.add(tracking)
            
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

    # Approve or reject pending agents
    admin = User.query.filter_by(user_role='Admin').first()
    pending_agents = User.query.filter_by(user_role='Agent', Request='Pending').all()
    for agent in pending_agents:
        if random.choice([True, False]):
            agent.Request = 'Approved'
            agent.status = 'Available'
            send_notification(agent.email, 'Agent Request Approved', f'Your agent request has been approved. Welcome to our system!')
        else:
            agent.Request = 'Rejected'
            agent.status = 'Unavailable'
            send_notification(agent.email, 'Agent Request Rejected', f'We regret to inform you that your agent request has been rejected.')
    db.session.commit()
    print(f"Processed {len(pending_agents)} pending agent requests.")