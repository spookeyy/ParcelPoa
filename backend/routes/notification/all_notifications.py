from flask import jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from backend.model.notification import Notification

from . import notification
# get all notifications for the current user
@notification.route('/notifications', methods=['GET'])
@jwt_required()
def get_notifications():
    current_user_id = get_jwt_identity()
    notifications = Notification.query.filter_by(user_id=current_user_id).order_by(Notification.created_at.desc()).all()
    return jsonify([notification.to_dict() for notification in notifications])