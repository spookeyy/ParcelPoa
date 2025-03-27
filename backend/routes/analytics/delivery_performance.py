from flask import jsonify, request
from sqlalchemy import func
from backend.model.delivery import Delivery
from backend import db
from date_range import get_date_range
from . import analytics

@analytics.route('/deliveries/performance/<date_range>' , methods=['GET', 'OPTIONS'])
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
    if not result:
        return jsonify({'error': 'No data available for the specified date range'}), 404
    return jsonify(result)