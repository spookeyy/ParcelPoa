from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from backend.model.user import User
from . import auth
from backend import db, bcrypt

# change password
@auth.route('/change_password', methods=['PUT'])
@jwt_required()
def change_password():
    data = request.get_json()
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if user is None:
        return jsonify({"message": "User not found"}), 404
    if not bcrypt.check_password_hash(user.password_hash, data['old_password']):
        return jsonify({"message": "Old password is incorrect"}), 400
    user.password_hash = bcrypt.generate_password_hash(data['new_password']).decode('utf-8')
    db.session.commit()
    return jsonify({"message": "Password changed successfully"})