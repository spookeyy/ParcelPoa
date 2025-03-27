from flask import jsonify, request
from backend.model.parcel import Parcel
from . import buyer

@buyer.route('/location', methods=['GET'])
def get_location():
    parcel_id = request.args.get('parcel_id')
    if not parcel_id:
        return jsonify({'error': 'Parcel ID is required'}), 400

    parcel = Parcel.query.get(parcel_id)
    if not parcel:
        return jsonify({'error': 'Parcel not found'}), 404

    return jsonify({
        'latitude': parcel.latitude,
        'longitude': parcel.longitude
    })