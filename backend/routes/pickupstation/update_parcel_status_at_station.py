from flask import jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime, timezone
from backend.model.user import User
from backend.model.delivery import Delivery
from backend.model.parcel import Parcel
from backend.utils.send_notification import send_notification
from backend import db

from . import pickupstation

@pickupstation.route('/update-pickup-station-parcel/<int:parcel_id>', methods=['PUT'])
@jwt_required()
def update_parcel_status_at_pickup_station(parcel_id):
    current_user = User.query.get(get_jwt_identity())
    if current_user.user_role != 'PickupStation':
        return jsonify({"message": "Only pickup stations can update this status"}), 403
    
    parcel = Parcel.query.get_or_404(parcel_id)
    if parcel.pickup_station_id != current_user.user_id:
        return jsonify({"message": "This parcel is not assigned to your pickup station"}), 403
    
    data = request.get_json()
    new_status = data.get('status')
    
    if new_status not in ['At Pickup Station', 'Collected']:
        return jsonify({"message": "Invalid status for pickup station"}), 400
    
    delivery = Delivery.query.filter_by(parcel_id=parcel.parcel_id).first()
    if not delivery:
        return jsonify({"message": "Delivery not found for this parcel"}), 404
    
    old_status = delivery.status
    delivery.status = new_status
    delivery.updated_at = datetime.now(timezone.utc)
    
    if new_status == 'Collected':
        parcel.status = 'Delivered'
        parcel.updated_at = datetime.now(timezone.utc)
    
    db.session.commit()

    notification_recipient = f'''
        <html>
        <body>
        <p>The parcel with tracking number {parcel.tracking_number} is now {new_status}.</p>
        <p>Visit <a href="https://parcelpoa.netlify.app/track/{parcel.tracking_number}">here</a> to track your parcel.</p>
        </body>
        </html>
        '''
    
    # Send notifications
    if old_status != new_status:
        send_notification(parcel.sender.email, 'Parcel Status Update', f'Your parcel with tracking number {parcel.tracking_number} is now {new_status}.')
        send_notification(parcel.recipient_email, 'Parcel Status Update', notification_recipient, html=True)

    return jsonify({"message": "Station Parcel status updated successfully"}), 200