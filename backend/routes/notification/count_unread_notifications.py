from flask import jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from backend.model.notification import Notification

from . import notification

# Get unread notification count
@notification.route('/notifications/unread-count', methods=['GET'])
@jwt_required()
def get_unread_notification_count():
    current_user_id = get_jwt_identity()
    unread_count = Notification.query.filter_by(user_id=current_user_id, status='Delivered').count()
    return jsonify({"unread_count": unread_count})