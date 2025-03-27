import hmac
import logging
from urllib.parse import quote
from flask import jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime
from backend.model.parcel import Parcel
from backend.model.user import User
from backend.model.tracking import Tracking
from backend import db, create_app
from backend.utils.send_notification import send_notification

from . import agent

@agent.route('/update_status/<int:parcel_id>', methods=['PUT'])
@jwt_required()
def update_parcel_status(parcel_id):
    current_user = User.query.get(get_jwt_identity())
    if not current_user or current_user.user_role != 'Agent':
        return jsonify({"message": "Unauthorized access"}), 403
    parcel = Parcel.query.get(parcel_id)
    if not parcel:
        return jsonify({"message": "Parcel not found"}), 404
    data = request.get_json()
    if not data or 'status' not in data:
        return jsonify({"message": "Invalid request data"}), 400
    new_status = data['status']
    valid_statuses = ['Picked Up', 'Out for Delivery', 'In Transit', 'Delivered']
    if new_status not in valid_statuses:
        return jsonify({"message": "Invalid status"}), 400
    if hmac.compare_digest(parcel.status, 'Delivered'):
        return jsonify({"message": "Cannot update delivered parcel status"}), 400
    old_status = parcel.status
    parcel.status = new_status
    parcel.updated_at = datetime.now()
    # Update location (with input validation)
    parcel.latitude = float(data.get('latitude', parcel.latitude))
    parcel.longitude = float(data.get('longitude', parcel.longitude))
    parcel.current_location = data.get('location', parcel.current_location)[:255] # Limit length
    new_tracking = Tracking(
        parcel_id=parcel.parcel_id,
        location=parcel.current_location,
        status=parcel.status,
        timestamp=datetime.now()
    )
    db.session.add(new_tracking)
    try:
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        # app.logger.error(f"Database error: {str(e)}")
        return jsonify({"message": "An error occurred while updating the parcel"}), 500
    # Send notifications
    if old_status != parcel.status:
        safe_tracking_number = quote(parcel.tracking_number)
        tracking_url = f"https://parcelpoa.netlify.app/track/{safe_tracking_number}"
        notification_sender = f'Your parcel with tracking number {parcel.tracking_number} is now {parcel.status}.'
        notification_recipient = f'''
        <html>
        <body>
        <p>The parcel with tracking number {parcel.tracking_number} is now {parcel.status}.</p>
        <p>Click <a href="{tracking_url}">here</a> to track your parcel.</p>
        </body>
        </html>
        '''
        try:
            send_notification(parcel.sender.email, 'Parcel Status Update', notification_sender)
            send_notification(parcel.recipient_email, 'Parcel Status Update', notification_recipient, html=True)
        except Exception as e:
            logging.error(f"Notification error: {str(e)}")
        # Continue execution even if notification fails
    return jsonify({"message": "Parcel status and location updated successfully"}), 200