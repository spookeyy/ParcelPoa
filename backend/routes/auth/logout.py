from flask import jsonify
from flask_jwt_extended import jwt_required, get_jwt
import jwt
from . import auth

#blacklist
blacklist = set()
#logout
@auth.route('/logout', methods=['DELETE'])
@jwt_required()
def logout():
    jti = get_jwt()["jti"]
    blacklist.add(jti)
    return jsonify({"message": "Successfully logged out"}), 200