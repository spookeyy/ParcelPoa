from datetime import datetime, timezone
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask import jsonify, request
from backend.model.user import User
from backend.model.delivery import Delivery
from backend.model.parcel import Parcel
from backend.model.order import Order
from backend.model.tracking import Tracking
from backend.utils.send_notification import send_notification
from backend.utils.generate_order_number import generate_order_number
from backend.utils.get_region_from_address import get_region_from_address
from backend.utils.generate_unique_tracking_numbers import generate_unique_tracking_number
from backend import db
from . import business

@business.route('/schedule_pickup', methods=['POST'])
@jwt_required()
def schedule_pickup():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    if user.user_role != 'Business':
        return jsonify({"message": "Only businesses can schedule pickups"}), 403
    
    data = request.get_json()
    
    sender_location = data.get('current_location', user.primary_region)
    sender_region = get_region_from_address(sender_location)

    delivery_type = data.get('delivery_type')
    if delivery_type not in ['PickupStation', 'DoorDelivery']:
        return jsonify({"message": "Invalid delivery type"}), 400

    if delivery_type == 'PickupStation':
        pickup_station_id = data.get('pickup_station_id')
        if not pickup_station_id:
            return jsonify({"message": "Pickup station ID is required for pickup station delivery"}), 400
        
        pickup_station = User.query.filter_by(user_id=pickup_station_id, user_role='PickupStation').first()
        if not pickup_station or not pickup_station.is_open:
            return jsonify({"message": "Invalid or closed pickup station"}), 400
        
        recipient_address = pickup_station.primary_region
    else:
        recipient_address = data['recipient_address']

    new_parcel = Parcel(
        sender_id=current_user_id,
        tracking_number=generate_unique_tracking_number(existing_numbers=Parcel.query.with_entities(Parcel.tracking_number).all()),
        recipient_name=data['recipient_name'],
        recipient_address=recipient_address,
        recipient_phone=data['recipient_phone'],
        description=data['description'],
        weight=data['weight'],
        category=data['category'],
        status='Scheduled for Pickup',
        current_location=sender_location,
        delivery_type=delivery_type,
        pickup_station_id=pickup_station_id if delivery_type == 'PickupStation' else None,
        sender_email=user.email,
        recipient_email=data['recipient_email']
    )
    db.session.add(new_parcel)
    db.session.flush()

    new_order = Order(
        user_id=current_user_id,
        order_number=generate_order_number(),
        parcel_id=new_parcel.parcel_id,
        created_at=datetime.now(timezone.utc),
        updated_at=datetime.now(timezone.utc)
    )
    db.session.add(new_order)
    
    pickup_time_str = data['pickup_time']
    if pickup_time_str.endswith('Z'):
        pickup_time_str = pickup_time_str[:-1]
    pickup_time = datetime.fromisoformat(pickup_time_str).replace(tzinfo=timezone.utc)
    
    # Format pickup time as "2024-08-12 Time: 12:20 PM"
    formatted_pickup_time = pickup_time.strftime('%Y-%m-%d Time: %I:%M %p')

    selected_agent_id = data.get('agent_id')
    if not selected_agent_id:
        return jsonify({"message": "Agent ID must be provided"}), 400

    try:
        selected_agent_id = int(selected_agent_id)
    except ValueError:
        return jsonify({"message": "Invalid agent ID format"}), 400

    available_agents = User.query.filter(
        User.user_role == 'Agent',
        User.status == 'Available',
        User.Request == 'Approved',
        (User.primary_region == sender_region) | (User.operation_areas.like(f'%{sender_region}%'))
    ).all()

    if not available_agents:
        return jsonify({"message": f"No available agents in the region: {sender_region}"}), 400

    selected_agent = next((agent for agent in available_agents if agent.user_id == selected_agent_id), None)

    if not selected_agent:
        return jsonify({"message": "Provided agent ID is not available in the specified region"}), 400

    new_delivery = Delivery(
        parcel_id=new_parcel.parcel_id,
        agent_id=selected_agent.user_id,
        pickup_time=pickup_time,
        status='At Pickup Station'  # Initial status
    )
    db.session.add(new_delivery)

    new_tracking = Tracking(
        parcel_id=new_parcel.parcel_id,
        location=new_parcel.current_location,
        status=new_parcel.status
    )
    db.session.add(new_tracking)
    
    db.session.commit()

    recipient_email = data.get('recipient_email')
    if recipient_email:
        subject = f"Your parcel {new_parcel.tracking_number} is scheduled for pickup on {formatted_pickup_time}"
        body = f"Dear {data.get('recipient_name')},\n\nYour parcel {new_parcel.tracking_number} is scheduled for pickup on {formatted_pickup_time}."
        send_notification(recipient_email, subject, body)
    
    if selected_agent:
        agent_email = selected_agent.email
        subject = f"New parcel {new_parcel.tracking_number} scheduled for pickup"
        body = f"A new parcel {new_parcel.tracking_number} is scheduled for you to pickup on {formatted_pickup_time}.\nPlease log in to your dashboard to accept the pickup.\nLocation: {new_parcel.current_location}"
        send_notification(agent_email, subject, body)


    return jsonify({
        "message": "Pickup scheduled successfully",
        "tracking_number": new_parcel.tracking_number,
        "pickup_time": formatted_pickup_time
    }), 201