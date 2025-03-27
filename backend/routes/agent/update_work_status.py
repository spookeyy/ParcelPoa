from datetime import datetime
from flask import jsonify, request
from . import agent
from flask_jwt_extended import jwt_required, get_jwt_identity
from backend.model.user import User
from backend import db

@agent.route('/update-status', methods=['PUT'])
@jwt_required()
def update_status():
    data = request.get_json()
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if user is None:
        return jsonify({"message": "User not found"}), 404
    
    if user.user_role != 'Agent':
        return jsonify({"message": "Only agents can update their status"}), 403
    
    new_status = data.get('status')
    if new_status not in ['Available', 'Unavailable']:
        return jsonify({"message": "Invalid status"}), 400
    
    user.status = new_status
    user.updated_at = datetime.now()
    
    db.session.commit()
    return jsonify({"message": "Status updated successfully", "status": new_status})