from flask_jwt_extended import jwt_required, get_jwt_identity
from backend.model.user import User
from backend.model.order import Order
from flask import jsonify
from . import business

# Route to get all orders for a business
@business.route('/business/orders', methods=['GET'])
@jwt_required()
def get_business_orders():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    if user.user_role != 'Business':
        return jsonify({"message": "Access denied"}), 403
    
    orders = Order.query.filter_by(user_id=current_user_id).all()
    return jsonify([order.to_dict() for order in orders]), 200