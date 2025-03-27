from flask import jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from backend.model.user import User
from . import admin

# get agents
@admin.route('/get-agents', methods=['GET'])
@jwt_required()
def get_agents():
    user = User.query.get(get_jwt_identity())
    if user.user_role != 'Admin':
        return jsonify({"message": "Only admins can get agents"}), 403
    agents = User.query.filter_by(user_role='Agent').all()
    return jsonify([agent.to_dict() for agent in agents])