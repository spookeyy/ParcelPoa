from flask import jsonify, url_for
from . import admin
from backend.model.user import User

@admin.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([user_to_dict(user) for user in users])

def user_to_dict(user):
    profile_picture_url = url_for('static', filename=f'/{user.profile_picture}', _external=True) if user.profile_picture else None
    
    return {
        'user_id': user.user_id,
        'name': user.name,
        'email': user.email,
        'phone_number': user.phone_number,
        'user_role': user.user_role,
        'profile_picture': profile_picture_url,
        'status': user.status if user.status else 'Available',
        'primary_region': user.primary_region,
        'operation_areas': user.operation_areas.split(',') if user.operation_areas else []
    }

#get user
@admin.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.get_or_404(user_id)
    return jsonify(user.to_dict())