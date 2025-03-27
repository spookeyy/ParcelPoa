from flask import jsonify, request
from flask_jwt_extended import jwt_required
from backend.model.user import User
from . import business

#available agents
@business.route('/get-available-agents', methods=['GET'])
@jwt_required()
def get_available_agents():
    primary_region = request.args.get('primary_region')
    operational_area = request.args.get('operational_area')
    
    if not primary_region:
        return jsonify({"message": "Primary region parameter is required"}), 400

    query = User.query.filter(
        User.user_role == 'Agent',
        User.status == 'Available',
        User.Request == 'Approved'
    )

    if primary_region != 'Other':
        query = query.filter(
            (User.primary_region == primary_region) |
            (User.operation_areas.like(f'%{primary_region}%'))
        )

    if operational_area and operational_area != 'Other':
        query = query.filter(User.operation_areas.like(f'%{operational_area}%'))

    agents = query.all()

    return jsonify([agent.to_dict() for agent in agents])