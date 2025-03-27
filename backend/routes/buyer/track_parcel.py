from flask import jsonify
from . import buyer
from backend.model.parcel import Parcel
from backend.model.tracking import Tracking

@buyer.route('/track/<string:tracking_number>', methods=['GET', 'POST'])
def track_parcel(tracking_number):
    parcel = Parcel.query.filter_by(tracking_number=tracking_number).first()
    if parcel is None:
        return jsonify({"message": "Parcel not found"}), 404
    
    tracking_info = Tracking.query.filter_by(parcel_id=parcel.parcel_id).order_by(Tracking.timestamp.desc()).all()
    
    # Group tracking entries by status
    grouped_tracking = {}
    for track in tracking_info:
        if track.status not in grouped_tracking:
            grouped_tracking[track.status] = track.to_dict()

    tracking_data = list(grouped_tracking.values())

    response_data = {
        "parcel": {
            "parcel_id": parcel.parcel_id,
            "tracking_number": parcel.tracking_number,
            "status": parcel.status,
            "current_location": parcel.current_location,
            "sender_name": parcel.sender.name if parcel.sender else "Unknown",
            "recipient_name": parcel.recipient_name,
            "description": parcel.description,
            "category": parcel.category,
            "latitude": parcel.latitude,
            "longitude": parcel.longitude
        },
        "tracking_history": tracking_data
    }

    return jsonify(response_data)
