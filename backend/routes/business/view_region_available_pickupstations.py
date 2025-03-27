from flask import jsonify, request
from flask_jwt_extended import jwt_required
from backend.model.user import User

from . import business

@business.route('/get-available-pickup-stations', methods=['GET'])
@jwt_required()
def get_available_pickup_stations():
    region = request.args.get('region')
    
    if not region:
        return jsonify({"message": "Region parameter is required"}), 400

    pickup_stations = User.query.filter(
        User.user_role == 'PickupStation',
        User.is_open == True,
        User.primary_region == region
    ).all()

    return jsonify([station.to_dict() for station in pickup_stations])