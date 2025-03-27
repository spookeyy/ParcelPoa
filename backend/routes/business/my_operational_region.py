from flask import jsonify
from flask_jwt_extended import get_jwt_identity, jwt_required
from backend.model.user import User

from . import business

# get-business-primary-region
@business.route('/get-business-primary-region', methods=['GET'])
@jwt_required()
def get_business_primary_region():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    if user.user_role != 'Business':
        return jsonify({"message": "Only businesses can get their primary region"}), 403
    
    return jsonify({"primary_region": user.primary_region}) 