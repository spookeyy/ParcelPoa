from datetime import datetime
from flask import jsonify, request, url_for
from flask_jwt_extended import get_jwt_identity, jwt_required

from backend.utils.save_image import save_base64_image
from . import auth
from backend.model.user import User
from backend import db



# update profile
@auth.route('/profile', methods=['PUT'])
@jwt_required()
def update_profile():
    data = request.get_json()
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if user is None:
        return jsonify({"message": "User not found"}), 404
    
    user.name = data.get('name', user.name)
    user.email = data.get('email', user.email)
    user.phone_number = data.get('phone_number', user.phone_number)
    user.primary_region = data.get('primary_region', user.primary_region)
    
    # Ensure operation_areas has a default value if None
    existing_operation_areas = user.operation_areas.split(',') if user.operation_areas else []
    new_operation_areas = data.get('operation_areas', existing_operation_areas)
    user.operation_areas = ','.join(new_operation_areas)
    
    profile_picture = data.get('profile_picture')
    if profile_picture and profile_picture.startswith('data:image'):
        filename = f"profile_picture_{current_user_id}.jpg"
        file_path = save_base64_image(profile_picture, filename)
        user.profile_picture = file_path
    
    user.updated_at = datetime.now()
    db.session.commit()
    
    profile_picture_url = url_for('static', filename=user.profile_picture, _external=True) if user.profile_picture else None

    return jsonify({
        "message": "Profile updated successfully",
        "profile": {
            "name": user.name,
            "email": user.email,
            "phone_number": user.phone_number,
            "profile_picture": profile_picture_url,
            "primary_region": user.primary_region,
            "operation_areas": user.operation_areas
        }
    })