from flask import Blueprint, jsonify, request
from sqlalchemy import func
from datetime import datetime, timedelta
from models import db, Order, Parcel, User, Delivery
from sklearn.linear_model import LinearRegression
import numpy as np

analytics_bp = Blueprint('analytics', __name__)

def get_date_range(date_range):
    today = datetime.now().date()
    if date_range == 'week':
        start_date = today - timedelta(days=7)
    elif date_range == 'month':
        start_date = today - timedelta(days=30)
    elif date_range == 'year':
        start_date = today - timedelta(days=365)
    else:
        start_date = today
    return start_date, today

@analytics_bp.route('/orders/<date_range>')
def get_orders_count(date_range):
    start_date, end_date = get_date_range(date_range)
    user_id = request.args.get('user_id')
    
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
    
    result = [{'date': str(item.date), 'count': item.count} for item in orders_count]
    return jsonify(result)

@analytics_bp.route('/parcels/status/<date_range>')
def get_parcels_by_status(date_range):
    start_date, end_date = get_date_range(date_range)
    user_id = request.args.get('user_id')
    
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
    
    result = [{'status': item.status, 'count': item.count} for item in parcels_status]
    return jsonify(result)

@analytics_bp.route('/users/role/<date_range>')
def get_users_by_role(date_range):
    start_date, end_date = get_date_range(date_range)
    
    users_role = db.session.query(
        User.user_role,
        func.count(User.user_id).label('count')
    ).filter(
        func.date(User.created_at).between(start_date, end_date)
    ).group_by(
        User.user_role
    ).all()
    
    result = [{'role': item.user_role, 'count': item.count} for item in users_role]
    return jsonify(result)

@analytics_bp.route('/deliveries/performance/<date_range>')
def get_delivery_performance(date_range):
    start_date, end_date = get_date_range(date_range)
    agent_id = request.args.get('agent_id')
    
    query = db.session.query(
        func.date(Delivery.pickup_time).label('date'),
        func.avg(Delivery.delivery_time - Delivery.pickup_time).label('avg_delivery_time')
    ).filter(
        func.date(Delivery.pickup_time).between(start_date, end_date),
        Delivery.delivery_time.isnot(None)
    )
    
    if agent_id:
        query = query.filter(Delivery.agent_id == agent_id)
    
    delivery_performance = query.group_by(
        func.date(Delivery.pickup_time)
    ).all()
    
    result = [{'date': str(item.date), 'avg_delivery_time': str(item.avg_delivery_time)} for item in delivery_performance]
    return jsonify(result)

@analytics_bp.route('/trend/orders/<date_range>')
def get_orders_trend(date_range):
    start_date, end_date = get_date_range(date_range)
    user_id = request.args.get('user_id')
    
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
    
    dates = [(item.date - start_date).days for item in orders_count]
    counts = [item.count for item in orders_count]
    
    X = np.array(dates).reshape(-1, 1)
    y = np.array(counts)
    
    model = LinearRegression()
    model.fit(X, y)
    
    future_dates = np.array(range(len(dates), len(dates) + 30)).reshape(-1, 1)
    future_predictions = model.predict(future_dates)
    
    result = {
        'historical': [{'date': str(item.date), 'count': item.count} for item in orders_count],
        'predictions': [{'date': str(start_date + timedelta(days=int(date))), 'count': int(count)} for date, count in zip(future_dates, future_predictions)]
    }
    return jsonify(result)

@analytics_bp.route('/business/performance/<date_range>')
def get_business_performance(date_range):
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
    
    return jsonify(result)

@analytics_bp.route('/agent/performance/<date_range>')
def get_agent_performance(date_range):
    start_date, end_date = get_date_range(date_range)
    agent_id = request.args.get('agent_id')
    
    if not agent_id:
        return jsonify({'error': 'agent_id is required'}), 400
    
    deliveries_count = db.session.query(
        func.count(Delivery.delivery_id).label('total_deliveries')
    ).filter(
        Delivery.agent_id == agent_id,
        func.date(Delivery.pickup_time).between(start_date, end_date)
    ).scalar()
    
    avg_delivery_time = db.session.query(
        func.avg(Delivery.delivery_time - Delivery.pickup_time).label('avg_delivery_time')
    ).filter(
        Delivery.agent_id == agent_id,
        func.date(Delivery.pickup_time).between(start_date, end_date),
        Delivery.delivery_time.isnot(None)
    ).scalar()
    
    on_time_deliveries = db.session.query(
        func.count(Delivery.delivery_id).label('on_time_deliveries')
    ).filter(
        Delivery.agent_id == agent_id,
        func.date(Delivery.pickup_time).between(start_date, end_date),
        Delivery.delivery_time <= Delivery.pickup_time + timedelta(days=1)  # Assuming 1 day is considered on-time
    ).scalar()
    
    result = {
        'total_deliveries': deliveries_count,
        'avg_delivery_time': str(avg_delivery_time) if avg_delivery_time else None,
        'on_time_deliveries': on_time_deliveries,
        'on_time_percentage': (on_time_deliveries / deliveries_count * 100) if deliveries_count > 0 else 0
    }
    
    return jsonify(result)

def register_analytics_routes(app):
    app.register_blueprint(analytics_bp, url_prefix='/analytics')