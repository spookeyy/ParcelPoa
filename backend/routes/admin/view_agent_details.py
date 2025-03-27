from . import admin
from flask_jwt_extended import jwt_required, get_jwt_identity
from backend.model.user import User
from flask import jsonify

#/agent-details
@admin.route('/agent-details/<int:agent_id>', methods=['GET'])
@jwt_required()
def get_agent_details(agent_id):
    current_user = User.query.get(get_jwt_identity())
    if not current_user:
        return jsonify({"message": "User not found, please login"}), 403
    agent = User.query.filter_by(user_role='Agent', user_id=agent_id).first()
    if not agent:
        return jsonify({"message": "Agent not found"}), 404
    return jsonify(agent.to_dict())