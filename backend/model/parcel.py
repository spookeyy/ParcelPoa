from datetime import datetime
from sqlalchemy import Column, Float, Integer, String, Enum, ForeignKey, Text, DECIMAL, TIMESTAMP
from sqlalchemy.orm import relationship
from backend.model.user import User
from backend import db

class Parcel(db.Model):
    __tablename__ = 'parcels'

    parcel_id = Column(Integer, primary_key=True)
    sender_id = Column(Integer, ForeignKey(User.user_id), nullable=False)
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
    delivery_type = Column(Enum('PickupStation', 'DoorDelivery', name='delivery_types'), nullable=False)
    pickup_station_id = Column(Integer, ForeignKey(User.user_id), nullable=True)

    sender = relationship('User', back_populates='parcels', foreign_keys=[sender_id])
    pickup_station = relationship('User', back_populates='pickup_station_parcels', foreign_keys=[pickup_station_id])
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
            'longitude': float(self.longitude) if self.longitude else None,
            'delivery_type': self.delivery_type,
            'pickup_station_id': self.pickup_station_id
        }