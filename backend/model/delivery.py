from datetime import datetime, timezone
from sqlalchemy import Column, Integer, Enum, ForeignKey, TIMESTAMP
from sqlalchemy.orm import relationship
from backend import db
from backend.model.user import User
from backend.model.parcel import Parcel

class Delivery(db.Model):
    __tablename__ = 'deliveries'

    delivery_id = Column(Integer, primary_key=True)
    parcel_id = Column(Integer, ForeignKey(Parcel.parcel_id), nullable=False)
    agent_id = Column(Integer, ForeignKey(User.user_id), nullable=True)
    pickup_time = Column(TIMESTAMP, nullable=False)
    delivery_time = Column(TIMESTAMP)
    status = Column(Enum('At Pickup Station', 'Collected', name='delivery_statuses'), nullable=False)
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