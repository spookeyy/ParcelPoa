from flask import jsonify
from flask_jwt_extended import get_jwt_identity, jwt_required
from backend.model.user import User
from backend.model.parcel import Parcel
from . import pickupstation

@pickupstation.route('/get-pickup-station-parcels', methods=['GET'])
@jwt_required()
def get_pickup_station_parcels():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    if user.user_role != 'PickupStation':
        return jsonify({"message": "Access denied"}), 403
    
    parcels = Parcel.query.filter_by(pickup_station_id=current_user_id).all()
    return jsonify([parcel.to_dict() for parcel in parcels])