from flask import jsonify
from flask_jwt_extended import get_jwt_identity, jwt_required
from backend.model.user import User
from backend.model.order import Order
from backend.model.parcel import Parcel
from backend import db

from . import business

# Route to cancel an order (if it hasn't been picked up yet)
@business.route('/business/orders/<int:order_id>/cancel', methods=['POST'])
@jwt_required()
def cancel_order(order_id):
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    if user.user_role != 'Business':
        return jsonify({"message": "Access denied"}), 403
    
    order = Order.query.filter_by(order_id=order_id, user_id=current_user_id).first()
    if not order:
        return jsonify({"message": "Order not found"}), 404
    
    parcel = Parcel.query.get(order.parcel_id)
    if parcel.status != 'Scheduled for Pickup':
        return jsonify({"message": "Cannot cancel order, parcel has already been picked up"}), 400
    
    # Cancel the order and associated parcel
    order.status = 'Cancelled'
    parcel.status = 'Cancelled'
    db.session.commit()
    
    return jsonify({"message": "Order cancelled successfully"}), 200