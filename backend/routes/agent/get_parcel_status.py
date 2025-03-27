from . import agent
from flask import jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from backend.model.user import User
from backend.model.parcel import Parcel

# TODO: check on this later
@agent.route('/parcels/<int:parcel_id>', methods=['GET'])
@jwt_required()
def get_parcel_status(parcel_id):
    parcel = Parcel.query.get_or_404(parcel_id)
    user = User.query.get(get_jwt_identity())
    if not user:
        return jsonify({"message": "User not found"}), 404
    if user.user_role != 'Agent':
        return jsonify({"message": "Only agents can view parcel status"}), 403
    return jsonify({"status": parcel.status})