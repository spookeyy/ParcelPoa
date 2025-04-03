from flask import request, jsonify
from sqlalchemy import func
from backend.model.parcel import Parcel
from .date_range import get_date_range
from backend import db
from . import analytics

@analytics.route('/parcels/status/<date_range>' , methods=['GET', 'OPTIONS'])
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
    if not result:
        return jsonify({'error': 'No data available for the specified date range'}), 404
    return jsonify(result)