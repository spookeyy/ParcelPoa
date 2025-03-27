from flask import jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from backend.model.notification import Notification
from backend import db
from . import notification

# Delete a notification
@notification.route('/notifications/<int:notification_id>', methods=['DELETE'])
@jwt_required()
def delete_notification(notification_id):
    current_user_id = get_jwt_identity()
    notification = Notification.query.filter_by(notification_id=notification_id, user_id=current_user_id).first()
    
    if not notification:
        return jsonify({"message": "Notification not found"}), 404

    db.session.delete(notification)
    db.session.commit()
    return jsonify({"message": "Notification deleted successfully"}), 200