from . import admin
from flask import jsonify
from flask_jwt_extended import get_jwt_identity, jwt_required
from backend.model.user import User

# get all pickup stations as an admin
@admin.route('/get-pickup-stations', methods=['GET'])
@jwt_required()
def get_pickup_stations():
    current_user = User.query.get(get_jwt_identity())
    if current_user.user_role != 'Admin':
        return jsonify({"message": "Only admins can get pickup stations"}), 403
    pickup_stations = User.query.filter_by(user_role='PickupStation').all()
    return jsonify([pickup_station.to_dict() for pickup_station in pickup_stations])