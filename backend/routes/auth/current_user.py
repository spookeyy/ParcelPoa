from flask import jsonify
from flask_jwt_extended import get_jwt_identity, jwt_required
from backend.model.user import User
from . import auth

@auth.route('/current_user', methods=['GET'])
@jwt_required()
def get_current_user():
    current_user = User.query.get(get_jwt_identity())
    return jsonify(current_user.to_dict())