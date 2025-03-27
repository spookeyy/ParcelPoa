from flask import request, jsonify
from flask_jwt_extended import get_jwt_identity, jwt_required
from datetime import datetime
from backend.model.user import User
from backend import db
from . import pickupstation

@pickupstation.route('/update-pickup-station-status', methods=['PUT'])
@jwt_required()
def update_pickup_station_status():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    if user.user_role != 'PickupStation':
        return jsonify({"message": "Only Pickup Stations can update their status"}), 403
    
    data = request.get_json()
    new_status = data.get('is_open')
    
    if new_status is None:
        return jsonify({"message": "Status is required"}), 400
    
    user.is_open = new_status
    user.updated_at = datetime.now()
    
    db.session.commit()
    return jsonify({"message": "Status updated successfully", "is_open": new_status})