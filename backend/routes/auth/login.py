from backend import bcrypt
from flask_jwt_extended import create_access_token
from backend.model.user import User
from flask import jsonify, request
from . import auth

@auth.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    if user and bcrypt.check_password_hash(user.password_hash, data['password']):
        access_token = create_access_token(identity=str(user.user_id))
        return jsonify({
            "access_token": access_token,
            "user": {
                "id": user.user_id,
                "email": user.email,
                "role": user.user_role
            }
        }), 200
    # check password
    elif user and not bcrypt.check_password_hash(user.password_hash, data['password']):
        return jsonify({"message": "Invalid email or password"}), 401
    else:
        return jsonify({"message": "User not found"}), 401