from flask import jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from backend.model.notification import Notification
from backend.model.user import User
from backend import db

from . import notification

# Create a new notification TODO:
@notification.route('/notifications', methods=['POST'])
@jwt_required()
def create_notification():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if not user:
        return jsonify({"message": "User not found"}), 404

    data = request.json
    if not data:
        return jsonify({"message": "No data provided"}), 400

    notification = Notification(
        user_id=current_user_id,
        message=data.get('message', ''),
        type=data.get('type', 'SMS'),
        status='Sent'
    )
    db.session.add(notification)
    db.session.commit()

    return jsonify(notification.to_dict(), {"message": "Notification sent successfully"}), 201