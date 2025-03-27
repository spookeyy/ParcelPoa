from flask import jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from backend.model.notification import Notification

from . import notification

# Get a specific notification
@notification.route('/notifications/<int:notification_id>', methods=['GET'])
@jwt_required()
def get_notification(notification_id):
    current_user_id = get_jwt_identity()
    notification = Notification.query.filter_by(notification_id=notification_id, user_id=current_user_id).first()
    
    if not notification:
        return jsonify({"message": "Notification not found"}), 404

    return jsonify(notification.to_dict(), {"message": "Notification retrieved successfully"}), 200