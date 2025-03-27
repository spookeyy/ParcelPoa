from flask import jsonify, request
from backend.model.user import User

from . import business

@business.route('/get-open-pickup-stations', methods=['GET'])
def get_open_pickup_stations():
    area = request.args.get('area')
    open_stations = User.query.filter(
        User.user_role == 'PickupStation',
        User.is_open == True,
        # User.operation_areas.like(f'%{area}%')
    ).all()
    return jsonify([station.to_dict() for station in open_stations])