from flask import Blueprint, request, jsonify
from sqlalchemy import func
from datetime import timedelta, datetime
from backend.model.order import Order
from backend.model.parcel import Parcel
from backend.model.delivery import Delivery
from backend.model.user import User
from backend import db
from .date_range import get_date_range
from sklearn.linear_model import LinearRegression
import numpy as np

analytics = Blueprint('analytics', __name__)


from . import count_orders, date_range, delivery_performance, get_agent_performance, get_business_performance, get_orders_trend, group_parcels_by_status, number_of_users_by_role

    

    # Convert your existing endpoint functions to internal functions
def get_orders_count_internal(date_range, user_id):
    start_date, end_date = get_date_range(date_range)
    
    query = db.session.query(
        func.date(Order.created_at).label('date'),
        func.count(Order.order_id).label('count')
    ).filter(
        func.date(Order.created_at).between(start_date, end_date)
    )
    
    if user_id:
        query = query.filter(Order.user_id == user_id)
    
    orders_count = query.group_by(
        func.date(Order.created_at)
    ).all()
    
    # Format results with zero-filled dates
    results = []
    current_date = start_date
    date_counts = {str(item.date): item.count for item in orders_count}
    
    while current_date <= end_date:
        date_str = str(current_date)
        results.append({
            'date': date_str,
            'count': date_counts.get(date_str, 0)
        })
        current_date += timedelta(days=1)
    
    return results

def get_parcels_by_status_internal(date_range, user_id):
    start_date, end_date = get_date_range(date_range)
    
    query = db.session.query(
        Parcel.status,
        func.count(Parcel.parcel_id).label('count')
    ).filter(
        func.date(Parcel.created_at).between(start_date, end_date)
    )
    
    if user_id:
        query = query.filter(Parcel.sender_id == user_id)
    
    parcels_status = query.group_by(
        Parcel.status
    ).all()
    
    return [{'status': item.status, 'count': item.count} for item in parcels_status]

def get_orders_trend_internal(date_range, user_id):
    start_date, end_date = get_date_range(date_range)
    
    query = db.session.query(
        func.date(Order.created_at).label('date'),
        func.count(Order.order_id).label('count')
    ).filter(
        func.date(Order.created_at).between(start_date, end_date)
    )
    
    if user_id:
        query = query.filter(Order.user_id == user_id)
    
    orders_count = query.group_by(
        func.date(Order.created_at)
    ).all()
    
    if not orders_count:
        return {
            'historical': [],
            'predictions': []
        }
    
    dates = [(datetime.strptime(str(item.date), '%Y-%m-%d').date() - start_date).days 
             for item in orders_count]
    counts = [item.count for item in orders_count]
    
    X = np.array(dates).reshape(-1, 1)
    y = np.array(counts)
    
    model = LinearRegression()
    model.fit(X, y)
    
    future_dates = np.array(range(len(dates), len(dates) + 30)).reshape(-1, 1)
    future_predictions = model.predict(future_dates)
    
    return {
        'historical': [{'date': str(item.date), 'count': item.count} for item in orders_count],
        'predictions': [{
            'date': str(start_date + timedelta(days=int(date[0]))), 
            'count': max(0, int(count))
        } for date, count in zip(future_dates, future_predictions)]
    }

def get_business_performance_internal(date_range, user_id):
    start_date, end_date = get_date_range(date_range)
    
    orders_count = db.session.query(
        func.count(Order.order_id).label('total_orders')
    ).filter(
        Order.user_id == user_id,
        func.date(Order.created_at).between(start_date, end_date)
    ).scalar() or 0
    
    parcels_count = db.session.query(
        func.count(Parcel.parcel_id).label('total_parcels')
    ).filter(
        Parcel.sender_id == user_id,
        func.date(Parcel.created_at).between(start_date, end_date)
    ).scalar() or 0
    
    # TODO: since Delivery model is not optimized, this is not efficient
    avg_delivery_time = db.session.query(
        func.avg(Delivery.delivery_time - Delivery.pickup_time).label('avg_delivery_time')
    ).join(Parcel, Parcel.parcel_id == Delivery.parcel_id).filter(
        Parcel.sender_id == user_id,
        func.date(Delivery.pickup_time).between(start_date, end_date),
        Delivery.delivery_time.isnot(None)
    ).scalar()
    
    return {
        'total_orders': orders_count,
        'total_parcels': parcels_count,
        'avg_delivery_time': str(avg_delivery_time) if avg_delivery_time else None
    }


# new consolidated endpoint
@analytics.route('/business-dashboard/<date_range>', methods=['GET', 'OPTIONS'])
def get_business_dashboard(date_range):
    if request.method == 'OPTIONS':
        return {}, 200
    
    user_id = request.args.get('user_id', type=int)
    if not user_id:
        return jsonify({'error': 'user_id is required'}), 400
    
    try:
        # Get all data in parallel (you might want to use threading for better performance)
        orders = get_orders_count_internal(date_range, user_id)
        parcels = get_parcels_by_status_internal(date_range, user_id)
        trend = get_orders_trend_internal(date_range, user_id)
        performance = get_business_performance_internal(date_range, user_id)
        
        return jsonify({
            'orders': orders,
            'parcels': parcels,
            'trend': trend,
            'performance': performance
        })
    except Exception as e:
        return jsonify({
            'error': str(e),
            'message': 'Failed to fetch dashboard data'
        }), 500