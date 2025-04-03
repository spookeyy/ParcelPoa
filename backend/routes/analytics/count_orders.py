from datetime import datetime, timedelta
from flask import request, jsonify
from sqlalchemy import func, and_
from backend.model.order import Order
from .date_range import get_date_range
from backend import db

from . import analytics

@analytics.route('/orders/<date_range>', methods=['GET', 'OPTIONS'])
def get_orders_count(date_range):
    if request.method == 'OPTIONS':
        return {}, 200
    
    try:
        start_date, end_date = get_date_range(date_range)
        user_id = request.args.get('user_id', type=int)  # Get as integer
        
        # Base query
        query = db.session.query(
            func.date(Order.created_at).label('date'),
            func.count(Order.order_id).label('count')
        ).filter(
            func.date(Order.created_at).between(start_date, end_date)
        )
        
        # Apply user filter if provided
        if user_id:
            query = query.filter(Order.user_id == user_id)
        
        # Execute query
        orders_count = query.group_by(
            func.date(Order.created_at)
        ).order_by(
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
        
        return jsonify(results)
        
    except Exception as e:
        return jsonify({
            'error': str(e),
            'message': 'Failed to fetch order counts'
        }), 500