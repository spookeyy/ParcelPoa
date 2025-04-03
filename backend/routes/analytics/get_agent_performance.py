from flask import request, jsonify
from datetime import timedelta
from sqlalchemy import func
from backend.model.delivery import Delivery
from backend import db

from .date_range import get_date_range
from . import analytics

@analytics.route('/agent/performance/<date_range>' , methods=['GET', 'OPTIONS'])
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
    
    if not result:
        return jsonify({'error': 'No data available for the specified date range'}), 404
    return jsonify(result)