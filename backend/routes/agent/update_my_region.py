from flask_jwt_extended import jwt_required, get_jwt_identity
from flask import jsonify, request
from backend.model.user import User
from backend import db

from . import agent

@agent.route('/update-agent-regions', methods=['PUT'])
@jwt_required()
def update_agent_regions():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    if user.user_role != 'Agent':
        return jsonify({"message": "Only agents can update their regions"}), 403
    
    data = request.get_json()
    user.primary_region = data.get('primary_region', user.primary_region)
    user.operation_areas = ','.join(data.get('operation_areas', []))
    db.session.commit()
    
    return jsonify({"message": "Agent regions updated successfully"})