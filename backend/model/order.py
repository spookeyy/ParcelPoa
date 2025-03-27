from datetime import datetime
from sqlalchemy import Column, Integer, String, Enum, ForeignKey, TIMESTAMP
from sqlalchemy.orm import relationship
from backend.model.user import User
from backend.model.parcel import Parcel
from backend import db

class Order(db.Model):
    __tablename__ = 'orders'

    order_id = Column(Integer, primary_key=True)
    order_number = Column(String, nullable=True)
    user_id = Column(Integer, ForeignKey(User.user_id), nullable=False)
    parcel_id = Column(Integer, ForeignKey(Parcel.parcel_id), nullable=False)
    created_at = Column(TIMESTAMP, nullable=False, default=datetime.now)
    updated_at = Column(TIMESTAMP, nullable=False, default=datetime.now, onupdate=datetime.now)
    status = Column(Enum('Active', 'Cancelled', name='order_statuses'), default='Active', nullable=False)

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