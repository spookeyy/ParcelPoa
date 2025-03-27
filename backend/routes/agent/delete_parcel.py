from . import agent
from flask import jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from backend.model.parcel import Parcel
from backend.model.user import User
from backend import db

@agent.route('/parcels/<int:parcel_id>', methods=['DELETE'])
@jwt_required()
def delete_parcel(parcel_id):
    parcel = Parcel.query.get_or_404(parcel_id)
    user = User.query.get(get_jwt_identity())
    if user.user_role != 'Agent':
        return jsonify({"message": "Only agents can delete parcels"}), 403
    if parcel.status == 'Delivered':
        return jsonify({"message": "Cannot delete delivered parcel"}), 400
    db.session.delete(parcel)
    db.session.commit()
    return jsonify({"message": "Parcel deleted successfully"}), 200