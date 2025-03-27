from datetime import datetime
from sqlalchemy import Column, Integer, String,ForeignKey,TIMESTAMP
from sqlalchemy.orm import relationship
from backend.model.parcel import Parcel
from backend import db

class Tracking(db.Model):
    __tablename__ = 'tracking'

    tracking_id = Column(Integer, primary_key=True)
    parcel_id = Column(Integer, ForeignKey(Parcel.parcel_id), nullable=False)
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

