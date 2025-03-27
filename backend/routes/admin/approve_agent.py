from flask import jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from backend.utils.valid_email import is_valid_email
from backend.utils.send_notification import send_notification
from backend.model.user import User
from backend import db
from . import admin

# approve agent 
@admin.route('/approve-agent/<int:agent_id>', methods=['PUT'])
@jwt_required()
def approve_agent(agent_id):
    current_user = User.query.get(get_jwt_identity())
    
    if current_user.user_role != 'Admin':
        return jsonify({"message": "Only admins can approve agent requests"}), 403
    
    agent = User.query.get(agent_id)
    if not agent:
        return jsonify({"message": "Agent not found"}), 404
    
    if agent.Request != 'Pending':
        return jsonify({"message": "Agent is not in pending status"}), 400
    
    agent.Request = 'Approved'
    agent.status = 'Available'
    db.session.commit()
    
    # Send notification to the agent
    if is_valid_email(agent.email):
        send_notification(agent.email, 'Agent Request Approved', 
                          f'Your agent request has been approved. Welcome to our system!')
    else:
        print(f"Invalid email for agent {agent_id}: {agent.email}. Notification not sent.")
    
    return jsonify({"message": "Agent request approved successfully"}), 200