from flask import jsonify
from flask_jwt_extended import get_jwt_identity, jwt_required
from backend.model.delivery import Delivery
from backend.model.user import User
from . import agent

# agent associated parcels:
@agent.route('/agent_parcels', methods=['GET'])
@jwt_required()
def get_agent_parcels():
    user = User.query.get(get_jwt_identity())
    
    if user.user_role != 'Agent':
        return jsonify({"message": "Only agents can view their assigned parcels"}), 403
    
    deliveries = Delivery.query.filter_by(agent_id=user.user_id).all()

    parcels = [delivery.parcel for delivery in deliveries if delivery.parcel]
    
    parcels_data = [parcel.to_dict() for parcel in parcels]
    
    return jsonify(parcels_data)