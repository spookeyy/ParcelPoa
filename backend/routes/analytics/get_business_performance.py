from flask import request, jsonify
from sqlalchemy import func
from backend.model.order import Order
from backend.model.parcel import Parcel
from backend.model.delivery import Delivery
from backend import db
from .date_range import get_date_range
from . import analytics
from flask import make_response

@analytics.route('/business/performance/<date_range>' , methods=['GET', 'OPTIONS'])
def get_business_performance(date_range):
    # Handle OPTIONS request
    if request.method == 'OPTIONS':
        response = make_response()
        response.headers.add('Access-Control-Allow-Origin', 'http://localhost:5173')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
        response.headers.add('Access-Control-Allow-Methods', 'GET,OPTIONS')
        return response

    start_date, end_date = get_date_range(date_range)
    user_id = request.args.get('user_id')
    
    if not user_id:
        return jsonify({'error': 'user_id is required'}), 400
    
    orders_count = db.session.query(
        func.count(Order.order_id).label('total_orders')
    ).filter(
        Order.user_id == user_id,
        func.date(Order.created_at).between(start_date, end_date)
    ).scalar()
    
    parcels_count = db.session.query(
        func.count(Parcel.parcel_id).label('total_parcels')
    ).filter(
        Parcel.sender_id == user_id,
        func.date(Parcel.created_at).between(start_date, end_date)
    ).scalar()
    
    avg_delivery_time = db.session.query(
        func.avg(Delivery.delivery_time - Delivery.pickup_time).label('avg_delivery_time')
    ).join(Parcel, Parcel.parcel_id == Delivery.parcel_id).filter(
        Parcel.sender_id == user_id,
        func.date(Delivery.pickup_time).between(start_date, end_date),
        Delivery.delivery_time.isnot(None)
    ).scalar()
    
    result = {
        'total_orders': orders_count,
        'total_parcels': parcels_count,
        'avg_delivery_time': str(avg_delivery_time) if avg_delivery_time else None
    }
    
    if not result:
        return jsonify({'error': 'No data available for the specified date range'}), 404
    
    # Add CORS headers to the response
    response = jsonify(result)
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:5173')
    return response