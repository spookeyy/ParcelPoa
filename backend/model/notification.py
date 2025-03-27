from datetime import datetime, timezone
from flask import url_for
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Boolean, Column, Float, Integer, String, Enum, ForeignKey, Text, DECIMAL, TIMESTAMP
from sqlalchemy.orm import relationship
from backend.model.user import User
from backend import db

class Notification(db.Model):
    __tablename__ = 'notifications'

    notification_id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey(User.user_id), nullable=False)
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
