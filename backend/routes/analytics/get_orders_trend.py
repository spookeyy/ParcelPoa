from datetime import datetime, timedelta
from . import analytics
from flask import request, jsonify
from sqlalchemy import func
from backend.model.order import Order
from date_range import get_date_range
from backend import db
from sklearn.linear_model import LinearRegression
import numpy as np

@analytics.route('/trend/orders/<date_range>' , methods=['GET', 'OPTIONS'])
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
    
    if not orders_count:
        return jsonify({
            'error': 'No data available for the specified date range and user ID.',
            'historical': [],
            'predictions': []
        }), 404
    
    dates = [(datetime.strptime(str(item.date), '%Y-%m-%d').date() - start_date).days for item in orders_count]
    counts = [item.count for item in orders_count]
    
    X = np.array(dates).reshape(-1, 1)
    y = np.array(counts)
    
    model = LinearRegression()
    model.fit(X, y)
    
    future_dates = np.array(range(len(dates), len(dates) + 30)).reshape(-1, 1)
    future_predictions = model.predict(future_dates)
    
    result = {
        'historical': [{'date': str(item.date), 'count': item.count} for item in orders_count],
        'predictions': [{'date': str(start_date + timedelta(days=int(date[0]))), 'count': max(0, int(count))} for date, count in zip(future_dates, future_predictions)]
    }
    if not result:
        return jsonify({'error': 'No data available for the specified date range'}), 404
    return jsonify(result)