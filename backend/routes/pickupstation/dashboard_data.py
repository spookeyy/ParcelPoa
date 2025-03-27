from flask import jsonify
from flask_jwt_extended import get_jwt_identity, jwt_required
from backend.model.parcel import Parcel
from backend.model.user import User

from . import pickupstation

@pickupstation.route('/pickup-station-dashboard', methods=['GET'])
@jwt_required()
def pickup_station_dashboard():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    if user.user_role != 'PickupStation':
        return jsonify({"message": "Access denied"}), 403

    parcels = Parcel.query.filter_by(pickup_station_id=user.user_id).all()
    
    dashboard_data = {
        "station_name": user.name,
        "is_open": user.is_open,
        "total_parcels": len(parcels),
        "parcels_waiting": sum(1 for p in parcels if p.delivery.status == 'At Pickup Station'),
        "parcels_collected": sum(1 for p in parcels if p.delivery.status == 'Collected'),
    }

    return jsonify(dashboard_data)