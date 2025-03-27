from flask import jsonify, url_for
from flask_jwt_extended import get_jwt_identity, jwt_required

from backend.model.user import User
from . import auth

# get profile 
@auth.route('/profile', methods=['GET'])
@jwt_required()
def profile():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if user is None:
        return jsonify({"message": "User not found"}), 404
    
    profile_picture_url = url_for('static', filename=f'/{user.profile_picture}', _external=True) if user.profile_picture else None
    
    return jsonify({
        'user_id': user.user_id,
        'name': user.name,
        'email': user.email,
        'phone_number': user.phone_number,
        'user_role': user.user_role,
        'profile_picture': profile_picture_url,
        'status': user.status if user.status else 'Available',
        'primary_region': user.primary_region,
        'operation_areas': user.operation_areas.split(',') if user.operation_areas else []

    })