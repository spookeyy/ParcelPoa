from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Float, Integer, String, Enum, ForeignKey, Text, DECIMAL, TIMESTAMP
from sqlalchemy.orm import relationship
from werkzeug.security import generate_password_hash,check_password_hash
from flask_bcrypt import generate_password_hash, check_password_hash

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'

    user_id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    phone_number = Column(String, unique=True, nullable=False)
    user_role = Column(Enum('Business','Agent','Admin', name='user_roles'), nullable=False)
    created_at = Column(TIMESTAMP, nullable=False, default=datetime.now)
    updated_at = Column(TIMESTAMP, nullable=False, default=datetime.now, onupdate=datetime.now)
    password_hash = Column(String(128), nullable=False)
    profile_picture = Column(String, default='default.png', nullable=True)
    status = Column(Enum('Available', 'Unavailable', name='user_statuses'), default='Available', nullable=True)
    Request = Column(Enum('Approved', 'Pending', 'Rejected', name='approval_statuses'), default='Pending', nullable=True)
    primary_region = Column(String(100), nullable=True)
    operation_areas = Column(String(500), nullable=True)
    # region = Column(String(100), nullable=True)

    parcels = relationship('Parcel', back_populates='sender', foreign_keys='Parcel.sender_id')
    deliveries = relationship('Delivery', back_populates='agent', foreign_keys='Delivery.agent_id')
    notifications = relationship('Notification', back_populates='user', foreign_keys='Notification.user_id')
    orders = relationship('Order', back_populates='user', foreign_keys='Order.user_id')

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
            'profile_picture': self.profile_picture,
            'status': self.status,
            'Request': self.Request,
            'primary_region': self.primary_region,
            'operation_areas': self.operation_areas.split(',') if self.operation_areas else []
            # 'region': self.region
        }
    
class Parcel(db.Model):
    __tablename__ = 'parcels'

    parcel_id = Column(Integer, primary_key=True)
    sender_id = Column(Integer, ForeignKey('users.user_id'), nullable=False)
    tracking_number = Column(String(20), unique=True, nullable=False)
    recipient_name = Column(String, nullable=False)
    recipient_address = Column(String, nullable=False)
    recipient_phone = Column(String, nullable=False)
    description = Column(Text)
    weight = Column(DECIMAL, nullable=True)
    created_at = Column(TIMESTAMP, nullable=False, default=datetime.now)
    updated_at = Column(TIMESTAMP, nullable=False, default=datetime.now, onupdate=datetime.now)
    current_location = Column(String(255), nullable=False)
    status = Column(Enum('Scheduled for Pickup', 'Picked Up', 'Out for Delivery', 'In Transit', 'Delivered', 'Cancelled', name='parcel_statuses'), nullable=False)
    sender_email = Column(String, nullable=False)
    recipient_email = Column(String, nullable=False)
    category = Column(String(50), nullable=False)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)

    sender = relationship('User', back_populates='parcels', foreign_keys=[sender_id])
    delivery = relationship('Delivery', back_populates='parcel', uselist=False)
    tracking = relationship('Tracking', back_populates='parcel')
    orders = relationship('Order', back_populates='parcel', foreign_keys='Order.parcel_id')

    def to_dict(self):
        return {
            'parcel_id': self.parcel_id,
            'sender_id': self.sender_id,
            'tracking_number': self.tracking_number,
            'recipient_name': self.recipient_name,
            'recipient_address': self.recipient_address,
            'recipient_phone': self.recipient_phone,
            'description': self.description,
            'weight': float(self.weight) if self.weight else None,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat(),
            'current_location': self.current_location,
            'status': self.status,
            'sender_email': self.sender_email,
            'recipient_email': self.recipient_email,
            'category': self.category,
            'latitude': float(self.latitude) if self.latitude else None,
            'longitude': float(self.longitude) if self.longitude else None
        }



from datetime import datetime, timezone

class Delivery(db.Model):
    __tablename__ = 'deliveries'

    delivery_id = Column(Integer, primary_key=True)
    parcel_id = Column(Integer, ForeignKey('parcels.parcel_id'), nullable=False)
    agent_id = Column(Integer, ForeignKey('users.user_id'), nullable=True)  # Changed to nullable
    pickup_time = Column(TIMESTAMP, nullable=False)
    delivery_time = Column(TIMESTAMP)
    status = Column(Enum('Scheduled', 'In Transit', 'Delivered', name='delivery_statuses'), nullable=False)
    created_at = Column(TIMESTAMP, nullable=False, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(TIMESTAMP, nullable=False, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    parcel = relationship('Parcel', back_populates='delivery', foreign_keys=[parcel_id])
    agent = relationship('User', back_populates='deliveries', foreign_keys=[agent_id])

    def to_dict(self):
        return {
            'delivery_id': self.delivery_id,
            'parcel_id': self.parcel_id,
            'agent_id': self.agent_id,
            'pickup_time': self.pickup_time.isoformat(),
            'delivery_time': self.delivery_time.isoformat() if self.delivery_time else None,
            'status': self.status,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }

class Notification(db.Model):
    __tablename__ = 'notifications'

    notification_id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.user_id'), nullable=False)
    message = Column(Text, nullable=False)
    type = Column(Enum('SMS', 'Email', 'App', name='notification_types'), nullable=False)
    status = Column(Enum('Sent', 'Delivered', 'Read', name='notification_statuses'), nullable=False)
    created_at = Column(TIMESTAMP, nullable=False, default=datetime.now)

    user = relationship('User', back_populates='notifications', foreign_keys=[user_id])

    def to_dict(self):
        return {
            'notification_id': self.notification_id,
            'user_id': self.user_id,
            'message': self.message,
            'type': self.type,
            'status': self.status,
            'created_at': self.created_at.isoformat()
        }


class Tracking(db.Model):
    __tablename__ = 'tracking'

    tracking_id = Column(Integer, primary_key=True)
    parcel_id = Column(Integer, ForeignKey('parcels.parcel_id'), nullable=False)
    location = Column(String, nullable=False)
    status = Column(String, nullable=False)
    timestamp = Column(TIMESTAMP, nullable=False, default=datetime.now)

    parcel = relationship('Parcel', back_populates='tracking', foreign_keys=[parcel_id])

    def to_dict(self):
        return {
            'tracking_id': self.tracking_id,
            'parcel_id': self.parcel_id,
            'location': self.location,
            'status': self.status,
            'timestamp': self.timestamp.isoformat()
        }


class Order(db.Model):
    __tablename__ = 'orders'

    order_id = Column(Integer, primary_key=True)
    order_number = Column(String, nullable=True)
    user_id = Column(Integer, ForeignKey('users.user_id'), nullable=False)
    parcel_id = Column(Integer, ForeignKey('parcels.parcel_id'), nullable=False)
    created_at = Column(TIMESTAMP, nullable=False, default=datetime.now)
    updated_at = Column(TIMESTAMP, nullable=False, default=datetime.now, onupdate=datetime.now)
    status = Column(Enum('Active', 'Cancelled', name='order_statuses'), default='Active', nullable=False)  # New field

    user = relationship('User', back_populates='orders', foreign_keys=[user_id])
    parcel = relationship('Parcel', back_populates='orders', foreign_keys=[parcel_id])

    def to_dict(self):
        return {
            'order_id': self.order_id,
            'order_number': self.order_number,
            'user_id': self.user_id,
            'parcel_id': self.parcel_id,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat(),
            'status': self.status,
            'parcel': self.parcel.to_dict() if self.parcel else None
        }


