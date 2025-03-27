from flask import jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from backend.model.notification import Notification
from backend import db
from . import notification

# Mark all notifications as read
@notification.route('/notifications/mark-all-read', methods=['PUT'])
@jwt_required()
def mark_all_notifications_read():
    current_user_id = get_jwt_identity()
    notifications = Notification.query.filter_by(user_id=current_user_id, status='Delivered').all()
    
    for notification in notifications:
        notification.status = 'Read'
    
    db.session.commit()
    return jsonify({"message": "All notifications marked as read"}), 200