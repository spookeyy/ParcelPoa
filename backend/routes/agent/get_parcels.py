from . import agent
from flask_jwt_extended import jwt_required, get_jwt_identity
from backend.model.user import User
from backend.model.parcel import Parcel
from flask import jsonify


@agent.route('/parcels', methods=['GET'])
@jwt_required()
def get_parcels():
    user = User.query.get(get_jwt_identity())
    if user.user_role != 'Agent':
        return jsonify({"message": "Only agents can view parcels"}), 403
    parcels = Parcel.query.all()
    return jsonify([parcel.to_dict() for parcel in parcels])