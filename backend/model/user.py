from datetime import datetime
from flask import url_for
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Boolean, Column, Integer, String, Enum, TIMESTAMP
from sqlalchemy.orm import relationship
from flask_bcrypt import generate_password_hash, check_password_hash
from backend import db

class User(db.Model):
    __tablename__ = 'users'

    user_id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    phone_number = Column(String, unique=True, nullable=False)
    user_role = Column(Enum('Business', 'Agent', 'Admin', 'PickupStation', name='user_roles'), nullable=False)
    created_at = Column(TIMESTAMP, nullable=False, default=datetime.now)
    updated_at = Column(TIMESTAMP, nullable=False, default=datetime.now, onupdate=datetime.now)
    password_hash = Column(String(128), nullable=False)
    profile_picture = Column(String, default='default.png', nullable=True)
    status = Column(Enum('Available', 'Unavailable', name='user_statuses'), default='Available', nullable=True)
    Request = Column(Enum('Approved', 'Pending', 'Rejected', name='approval_statuses'), default='Pending', nullable=True)
    primary_region = Column(String(100), nullable=True)
    operation_areas = Column(String(500), nullable=True)
    is_open = Column(Boolean, default=True, nullable=True)  # Changed to nullable

    parcels = relationship('Parcel', back_populates='sender', foreign_keys='Parcel.sender_id')
    deliveries = relationship('Delivery', back_populates='agent', foreign_keys='Delivery.agent_id')
    notifications = relationship('Notification', back_populates='user', foreign_keys='Notification.user_id')
    orders = relationship('Order', back_populates='user', foreign_keys='Order.user_id')
    pickup_station_parcels = relationship('Parcel', back_populates='pickup_station', foreign_keys='Parcel.pickup_station_id')

    def set_password(self, password):
        self.password_hash = generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def to_dict(self):
        return {
            'user_id': self.user_id,
            'name': self.name,
            'email': self.email,
            'phone_number': self.phone_number,
            'user_role': self.user_role,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'profile_picture': url_for('static', filename=self.profile_picture, _external=True) if self.profile_picture else None,
            'status': self.status,
            'Request': self.Request,
            'primary_region': self.primary_region,
            'operation_areas': self.operation_areas.split(',') if self.operation_areas else [],
            'is_open': self.is_open if self.user_role == 'PickupStation' else None,
        }