from date_range import get_date_range
from backend.model.user import User
from sqlalchemy import func
from flask import jsonify
from backend import db
from . import analytics

@analytics.route('/users/role/<date_range>' , methods=['GET', 'OPTIONS'])
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
    if not result:
        return jsonify({'error': 'No data available for the specified date range'}), 404
    return jsonify(result)