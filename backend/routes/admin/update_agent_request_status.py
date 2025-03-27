from . import admin
from flask import jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from backend.model.user import User
from backend import db

#/update-agent-status
@admin.route('/update-agent-status/<int:agent_id>', methods=['PUT'])
@jwt_required()
def update_agent_status(agent_id):
    current_user = User.query.get(get_jwt_identity())
    if current_user.user_role != 'Admin':
        return jsonify({"message": "Only admins can update agent request status"}), 403
    if not current_user:
        return jsonify({"message": "User not found, please login"}), 403
    agent = User.query.filter_by(user_role='Agent', user_id=agent_id).first()
    if not agent:
        return jsonify({"message": "Agent not found"}), 404
    data = request.get_json()
    agent.Request = data.get('Request')
    db.session.commit()
    return jsonify({"message": "Agent Request status updated successfully"})