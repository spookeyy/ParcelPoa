from . import notification
from flask import jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from backend.model.notification import Notification
from backend import db

# Update a notification's status
@notification.route('/notifications/<int:notification_id>', methods=['PUT'])
@jwt_required()
def update_notification(notification_id):
    current_user_id = get_jwt_identity()
    notification = Notification.query.filter_by(notification_id=notification_id, user_id=current_user_id).first()
    
    if not notification:
        return jsonify({"message": "Notification not found"}), 404

    data = request.json
    if 'status' in data:
        notification.status = data['status']
        db.session.commit()
        return jsonify(notification.to_dict(), {"message": "Notification status updated successfully"}), 200
    
    return jsonify({"message": "No changes made"}), 400