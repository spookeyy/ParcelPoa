from flask import jsonify, request
from . import admin
from backend import db
from flask_jwt_extended import jwt_required, get_jwt_identity
from backend.model.user import User

@admin.route('/users/<int:user_id>', methods=['DELETE'])
@jwt_required()
def delete_user(user_id):
    data = request.get_json()
    user = User.query.get_or_404(user_id)
    if user.user_id != get_jwt_identity():
        return jsonify({"message": "You are not authorized to delete this user"}), 403

    if user.orders:
        return jsonify({"message": "Cannot delete user with orders"}), 400
    
    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": "User deleted successfully"})