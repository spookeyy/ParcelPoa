from flask import jsonify
from flask_jwt_extended import get_jwt_identity, jwt_required
from . import admin
from backend.model.user import User
from backend.utils.send_notification import send_notification
from backend.utils.valid_email import is_valid_email
from backend import db

@admin.route('/reject-agent/<int:agent_id>', methods=['PUT'])
@jwt_required()
def reject_agent(agent_id):
    current_user = User.query.get(get_jwt_identity())
    
    # Check if the current user is an admin
    if current_user.user_role != 'Admin':
        return jsonify({"message": "Only admins can reject agent requests"}), 403
    
    agent = User.query.get(agent_id)
    if not agent:
        return jsonify({"message": "Agent not found"}), 404
    
    if agent.Request != 'Pending':
        return jsonify({"message": "Agent is not in pending status"}), 400
    
    agent.Request = 'Rejected'
    agent.status = 'Unavailable'  # Set the status to Unavailable
    db.session.commit()
    
    # Send notification to the agent
    if is_valid_email(agent.email):
        send_notification(agent.email, 'Agent Request Rejected', 
                          f'Your agent request has been rejected. Please try again later.')
    else:
        print(f"Invalid email for agent {agent_id}: {agent.email}. Notification not sent.")
    
    return jsonify({"message": "Agent request rejected successfully"}), 200