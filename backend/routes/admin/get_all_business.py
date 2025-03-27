from . import admin
from flask import jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from backend.model.user import User


# get all businesses as an admin
@admin.route('/get-businesses', methods=['GET'])
@jwt_required()
def get_businesses():
    current_user = User.query.get(get_jwt_identity())
    if current_user.user_role != 'Admin':
        return jsonify({"message": "Only admins can get businesses"}), 403
    businesses = User.query.filter_by(user_role='Business').all()
    return jsonify([business.to_dict() for business in businesses])