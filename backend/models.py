from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String, Enum, ForeignKey, Text, DECIMAL, TIMESTAMP
from sqlalchemy.orm import relationship

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'

    user_id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    phone_number = Column(String, unique=True, nullable=False)
    user_type = Column(Enum('Client', 'Business', 'Agent', name='user_types'), nullable=False)
    created_at = Column(TIMESTAMP, nullable=False, default=datetime.utcnow)
    updated_at = Column(TIMESTAMP, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    parcels = relationship('Parcel', back_populates='sender', foreign_keys='Parcel.sender_id')
    deliveries = relationship('Delivery', back_populates='agent', foreign_keys='Delivery.agent_id')
    feedbacks = relationship('Feedback', back_populates='user', foreign_keys='Feedback.user_id')
    notifications = relationship('Notification', back_populates='user', foreign_keys='Notification.user_id')
    orders = relationship('Order', back_populates='user', foreign_keys='Order.user_id')


class Parcel(db.Model):
    __tablename__ = 'parcels'

    parcel_id = Column(Integer, primary_key=True)
    sender_id = Column(Integer, ForeignKey('users.user_id'), nullable=False)
    recipient_name = Column(String, nullable=False)
    recipient_address = Column(String, nullable=False)
    recipient_phone = Column(String, nullable=False)
    description = Column(Text)
    weight = Column(DECIMAL, nullable=False)
    created_at = Column(TIMESTAMP, nullable=False, default=datetime.utcnow)
    updated_at = Column(TIMESTAMP, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    sender = relationship('User', back_populates='parcels', foreign_keys=[sender_id])
    delivery = relationship('Delivery', back_populates='parcel', uselist=False)
    tracking = relationship('Tracking', back_populates='parcel', uselist=False)
    orders = relationship('Order', back_populates='parcel', foreign_keys='Order.parcel_id')


class Delivery(db.Model):
    __tablename__ = 'deliveries'

    delivery_id = Column(Integer, primary_key=True)
    parcel_id = Column(Integer, ForeignKey('parcels.parcel_id'), nullable=False)
    agent_id = Column(Integer, ForeignKey('users.user_id'), nullable=False)
    pickup_time = Column(TIMESTAMP, nullable=False)
    delivery_time = Column(TIMESTAMP)
    status = Column(Enum('Scheduled', 'In Transit', 'Delivered', name='delivery_statuses'), nullable=False)
    created_at = Column(TIMESTAMP, nullable=False, default=datetime.utcnow)
    updated_at = Column(TIMESTAMP, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    parcel = relationship('Parcel', back_populates='delivery', foreign_keys=[parcel_id])
    agent = relationship('User', back_populates='deliveries', foreign_keys=[agent_id])
    feedbacks = relationship('Feedback', back_populates='delivery', foreign_keys='Feedback.delivery_id')


class Feedback(db.Model):
    __tablename__ = 'feedback'

    feedback_id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.user_id'), nullable=False)
    delivery_id = Column(Integer, ForeignKey('deliveries.delivery_id'), nullable=False)
    rating = Column(Integer, nullable=False)
    comments = Column(Text)
    created_at = Column(TIMESTAMP, nullable=False, default=datetime.utcnow)

    user = relationship('User', back_populates='feedbacks', foreign_keys=[user_id])
    delivery = relationship('Delivery', back_populates='feedbacks', foreign_keys=[delivery_id])


class Notification(db.Model):
    __tablename__ = 'notifications'

    notification_id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.user_id'), nullable=False)
    message = Column(Text, nullable=False)
    type = Column(Enum('SMS', 'Email', 'App', name='notification_types'), nullable=False)
    status = Column(Enum('Sent', 'Delivered', 'Read', name='notification_statuses'), nullable=False)
    created_at = Column(TIMESTAMP, nullable=False, default=datetime.utcnow)

    user = relationship('User', back_populates='notifications', foreign_keys=[user_id])


class Tracking(db.Model):
    __tablename__ = 'tracking'

    tracking_id = Column(Integer, primary_key=True)
    parcel_id = Column(Integer, ForeignKey('parcels.parcel_id'), nullable=False)
    location = Column(String, nullable=False)
    status = Column(String, nullable=False)
    timestamp = Column(TIMESTAMP, nullable=False, default=datetime.utcnow)

    parcel = relationship('Parcel', back_populates='tracking', foreign_keys=[parcel_id])


class Order(db.Model):
    __tablename__ = 'orders'

    order_id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.user_id'), nullable=False)
    parcel_id = Column(Integer, ForeignKey('parcels.parcel_id'), nullable=False)
    created_at = Column(TIMESTAMP, nullable=False, default=datetime.utcnow)
    updated_at = Column(TIMESTAMP, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = relationship('User', back_populates='orders', foreign_keys=[user_id])
    parcel = relationship('Parcel', back_populates='orders', foreign_keys=[parcel_id])
    products = relationship('Product', back_populates='order', foreign_keys='Product.order_id')


class Product(db.Model):
    __tablename__ = 'products'

    product_id = Column(Integer, primary_key=True)
    order_id = Column(Integer, ForeignKey('orders.order_id'), nullable=False)
    name = Column(String, nullable=False)
    description = Column(Text)
    price = Column(DECIMAL, nullable=False)
    quantity = Column(Integer, nullable=False)
    created_at = Column(TIMESTAMP, nullable=False, default=datetime.utcnow)
    updated_at = Column(TIMESTAMP, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    order = relationship('Order', back_populates='products', foreign_keys=[order_id])
