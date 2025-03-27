from flask import jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from backend.model.order import Order
from backend.model.user import User
from . import business

# Route to get details of a specific order
@business.route('/business/orders/<int:order_id>', methods=['GET'])
@jwt_required()
def get_order_details(order_id):
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    if user.user_role != 'Business':
        return jsonify({"message": "Access denied"}), 403
    
    order = Order.query.filter_by(order_id=order_id, user_id=current_user_id).first()
    if not order:
        return jsonify({"message": "Order not found"}), 404
    
    return jsonify(order.to_dict()), 200