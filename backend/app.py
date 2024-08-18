import os
import random
import string
from dotenv import dotenv_values, load_dotenv
# from geopy.geocoders import Nominatim
import smtplib
from flask import Flask, redirect, request, jsonify,url_for
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from datetime import datetime, timedelta, timezone
from flask_apscheduler import APScheduler
from itsdangerous import URLSafeTimedSerializer, SignatureExpired, BadSignature
from requests_oauthlib import OAuth1
from werkzeug.security import generate_password_hash
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity, get_jwt
from models import db, User, Parcel, Delivery, Notification, Tracking, Order
from flask_cors import CORS
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from sqlalchemy.orm import joinedload
import logging

logging.basicConfig(level=logging.DEBUG)
logging.info("Application starting...")

load_dotenv()

# config = dotenv_values(".env")
logging.basicConfig(level=logging.INFO)


app = Flask(__name__, static_folder='static')
CORS(app)
# app.config["SQLALCHEMY_DATABASE_URI"] = 'sqlite:///database.db?mode=rw'
app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get('DATABASE_URL')
print(f"Connecting to database: {app.config['SQLALCHEMY_DATABASE_URI']}")

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["JWT_SECRET_KEY"] = os.environ.get("JWT_SECRET_KEY", "super-secret-key")
app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY", "another-secret-key")
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(days=1) # expires in 1 day


migrate = Migrate(app, db)
db.init_app(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

s = URLSafeTimedSerializer(app.config['SECRET_KEY'])

# scheduler configurations
# with app.app_context():
#     scheduler = APScheduler()
#     scheduler.init_app(app)
#     scheduler.start()


logging.info("Database initialized")
    
# JWT Configurations
blacklist = set()
@jwt.token_in_blocklist_loader
def check_if_token_in_blacklist(jwt_header, jwt_payload):
    return jwt_payload['jti'] in blacklist

# user routes
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'message': 'Email already exists'}), 400

    elif data.get("phone_number"): # check if phone_number = data.get("phone_number")
        phone_number_exists = User.query.filter_by(phone_number=data.get("phone_number")).first()
        if phone_number_exists:
            return jsonify({"message": "Phone number already exists"}), 400

    
    required_fields = ['name', 'email', 'phone_number', 'user_role', 'password']
    
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"'{field}' is required"}), 400
    password = data.get("password")
    if not password:
        return jsonify({"error": "Password is required and must not be empty"}), 400

    if len(password) < 8:
        return jsonify({"error": "Password must be at least 8 characters long"}), 400
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    new_user = User(
        name=data.get('name'),
        email=data.get('email'),
        phone_number=data.get('phone_number'),
        user_role=data.get('user_role'),
        # region=data.get('region'), 
        created_at=datetime.now(),
        updated_at=datetime.now(),
        password_hash=hashed_password,
        primary_region=data.get('primary_region'),
        operation_areas=','.join(data.get('operation_areas', [])),
    )
    db.session.add(new_user)
    db.session.commit()
    if data['user_role'] == 'Business':
        return jsonify({"message": "Business registered successfully"}), 201
    elif data['user_role'] == 'Agent':
        return jsonify({"message": "Agent registered successfully"}), 201
    
    return jsonify({"message": "User registered successfully"}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    if user and bcrypt.check_password_hash(user.password_hash, data['password']):
        access_token = create_access_token(identity=user.user_id)
        return jsonify({
            "access_token": access_token,
            "user": {
                "id": user.user_id,
                "email": user.email,
                "role": user.user_role
            }
        }), 200
    elif user and not bcrypt.check_password_hash(user.password_hash, data['password']):
        return jsonify({"message": "Invalid credentials"}), 401
    else:
        return jsonify({"message": "User not found"}), 401


@app.route('/current_user', methods=['GET'])
@jwt_required()
def get_current_user():
    current_user = User.query.get(get_jwt_identity())
    return jsonify(current_user.to_dict())

    
#logout
@app.route('/logout', methods=['DELETE'])
@jwt_required()
def logout():
    jti = get_jwt()["jti"]
    blacklist.add(jti)
    return jsonify({"message": "Successfully logged out"}), 200


@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([user.to_dict() for user in users])

@app.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.get_or_404(user_id)
    return jsonify(user.to_dict())


@app.route('/users/<int:user_id>', methods=['DELETE'])
@jwt_required()
def delete_user(user_id):
    data = request.get_json()
    user = User.query.get_or_404(user_id)
    if user.user_id != get_jwt_identity():
        return jsonify({"message": "You are not authorized to delete this user"}), 403

    if user.orders:
        return jsonify({"message": "Cannot delete user with orders"}), 400
    
    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": "User deleted successfully"})


# get profile 
@app.route('/profile', methods=['GET'])
@jwt_required()
def profile():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if user is None:
        return jsonify({"message": "User not found"}), 404
    
    profile_picture_url = url_for('static', filename=f'/{user.profile_picture}', _external=True) if user.profile_picture else None
    
    return jsonify({
        'user_id': user.user_id,
        'name': user.name,
        'email': user.email,
        'phone_number': user.phone_number,
        'user_role': user.user_role,
        'profile_picture': profile_picture_url,
        'status': user.status if user.status else 'Available',
        'primary_region': user.primary_region,
        'operation_areas': user.operation_areas.split(',') if user.operation_areas else []

    })

# update profile
@app.route('/profile', methods=['PUT'])
@jwt_required()
def update_profile():
    data = request.get_json()
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if user is None:
        return jsonify({"message": "User not found"}), 404
    
    user.name = data.get('name', user.name)
    user.email = data.get('email', user.email)
    user.phone_number = data.get('phone_number', user.phone_number)
    user.primary_region = data.get('primary_region', user.primary_region)
    user.operation_areas = ','.join(data.get('operation_areas', user.operation_areas.split(',')))
    
    profile_picture = data.get('profile_picture')
    if profile_picture and profile_picture.startswith('data:image'):
        filename = f"profile_picture_{current_user_id}.jpg"
        file_path = save_base64_image(profile_picture, filename)
        user.profile_picture = file_path
    
    user.updated_at = datetime.now()
    db.session.commit()
    
    profile_picture_url = url_for('static', filename=user.profile_picture, _external=True) if user.profile_picture else None

    
    return jsonify({
        "message": "Profile updated successfully",
        "profile": {
            "name": user.name,
            "email": user.email,
            "phone_number": user.phone_number,
            "profile_picture": profile_picture_url,
            "primary_region": user.primary_region,
            "operation_areas": user.operation_areas
        }
    })

@app.route('/update-status', methods=['PUT'])
@jwt_required()
def update_status():
    data = request.get_json()
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if user is None:
        return jsonify({"message": "User not found"}), 404
    
    if user.user_role != 'Agent':
        return jsonify({"message": "Only agents can update their status"}), 403
    
    new_status = data.get('status')
    if new_status not in ['Available', 'Unavailable']:
        return jsonify({"message": "Invalid status"}), 400
    
    user.status = new_status
    user.updated_at = datetime.now()
    
    db.session.commit()
    return jsonify({"message": "Status updated successfully", "status": new_status})

# change password
@app.route('/change_password', methods=['PUT'])
@jwt_required()
def change_password():
    data = request.get_json()
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if user is None:
        return jsonify({"message": "User not found"}), 404
    if not bcrypt.check_password_hash(user.password_hash, data['old_password']):
        return jsonify({"message": "Old password is incorrect"}), 400
    user.password_hash = bcrypt.generate_password_hash(data['new_password']).decode('utf-8')
    db.session.commit()
    return jsonify({"message": "Password changed successfully"})

#ADMIN
# approve agent 
@app.route('/approve-agent/<int:agent_id>', methods=['PUT'])
@jwt_required()
def approve_agent(agent_id):
    current_user = User.query.get(get_jwt_identity())
    
    if current_user.user_role != 'Admin':
        return jsonify({"message": "Only admins can approve agent requests"}), 403
    
    agent = User.query.get(agent_id)
    if not agent:
        return jsonify({"message": "Agent not found"}), 404
    
    if agent.Request != 'Pending':
        return jsonify({"message": "Agent is not in pending status"}), 400
    
    agent.Request = 'Approved'
    agent.status = 'Available'
    db.session.commit()
    
    # Send notification to the agent
    if is_valid_email(agent.email):
        send_notification(agent.email, 'Agent Request Approved', 
                          f'Your agent request has been approved. Welcome to our system!')
    else:
        print(f"Invalid email for agent {agent_id}: {agent.email}. Notification not sent.")
    
    return jsonify({"message": "Agent request approved successfully"}), 200

@app.route('/reject-agent/<int:agent_id>', methods=['PUT'])
@jwt_required()
def reject_agent(agent_id):
    current_user = User.query.get(get_jwt_identity())
    
    # Check if the current user is an admin
    if current_user.user_role != 'Admin':
        return jsonify({"message": "Only admins can reject agent requests"}), 403
    
    agent = User.query.get(agent_id)
    if not agent:
        return jsonify({"message": "Agent not found"}), 404
    
    if agent.Request != 'Pending':
        return jsonify({"message": "Agent is not in pending status"}), 400
    
    agent.Request = 'Rejected'
    agent.status = 'Unavailable'  # Set the status to Unavailable
    db.session.commit()
    
    # Send notification to the agent
    if is_valid_email(agent.email):
        send_notification(agent.email, 'Agent Request Rejected', 
                          f'Your agent request has been rejected. Please try again later.')
    else:
        print(f"Invalid email for agent {agent_id}: {agent.email}. Notification not sent.")
    
    return jsonify({"message": "Agent request rejected successfully"}), 200


#/agent-details
@app.route('/agent-details/<int:agent_id>', methods=['GET'])
@jwt_required()
def get_agent_details(agent_id):
    current_user = User.query.get(get_jwt_identity())
    if not current_user:
        return jsonify({"message": "User not found, please login"}), 403
    agent = User.query.filter_by(user_role='Agent', user_id=agent_id).first()
    if not agent:
        return jsonify({"message": "Agent not found"}), 404
    return jsonify(agent.to_dict())

#/update-agent-status
@app.route('/update-agent-status/<int:agent_id>', methods=['PUT'])
@jwt_required()
def update_agent_status(agent_id):
    current_user = User.query.get(get_jwt_identity())
    if current_user.user_role != 'Admin':
        return jsonify({"message": "Only admins can update agent request status"}), 403
    if not current_user:
        return jsonify({"message": "User not found, please login"}), 403
    agent = User.query.filter_by(user_role='Agent', user_id=agent_id).first()
    if not agent:
        return jsonify({"message": "Agent not found"}), 404
    data = request.get_json()
    agent.Request = data.get('Request')
    db.session.commit()
    return jsonify({"message": "Agent Request status updated successfully"})

# get all businesses as an admin
@app.route('/get-businesses', methods=['GET'])
@jwt_required()
def get_businesses():
    current_user = User.query.get(get_jwt_identity())
    if current_user.user_role != 'Admin':
        return jsonify({"message": "Only admins can get businesses"}), 403
    businesses = User.query.filter_by(user_role='Business').all()
    return jsonify([business.to_dict() for business in businesses])


@app.route('/parcels', methods=['GET'])
@jwt_required()
def get_parcels():
    user = User.query.get(get_jwt_identity())
    if user.user_role != 'Agent':
        return jsonify({"message": "Only agents can view parcels"}), 403
    parcels = Parcel.query.all()
    return jsonify([parcel.to_dict() for parcel in parcels])

# TODO: check on this later
@app.route('/parcels/<int:parcel_id>', methods=['GET'])
@jwt_required()
def get_parcel_status(parcel_id):
    parcel = Parcel.query.get_or_404(parcel_id)
    user = User.query.get(get_jwt_identity())
    if not user:
        return jsonify({"message": "User not found"}), 404
    if user.user_role != 'Agent':
        return jsonify({"message": "Only agents can view parcel status"}), 403
    return jsonify({"status": parcel.status})


# # update parcel location
# @app.route('/parcels/<int:parcel_id>/location', methods=['PUT'])
# @jwt_required()
# def update_parcel_location(parcel_id):
#     user = User.query.get(get_jwt_identity())
#     if user.user_role != 'Agent':
#         return jsonify({"message": "Only agents can update parcel location"}), 403
#     data = request.get_json()
#     parcel = Parcel.query.get_or_404(parcel_id)
#     parcel.current_location = data['location']
#     parcel.updated_at = datetime.now()
#     db.session.commit()
#     return jsonify({"message": "Parcel location updated successfully"}), 200

# scheduler implementation
# @scheduler.task('interval', id='update_locations', seconds=300)  # Run every 5 minutes
# def update_locations():
#     parcels = Parcel.query.filter(Parcel.status != 'Delivered').all()
#     for parcel in parcels:
#         new_location = simulate_new_location(parcel)
#         parcel.current_location = new_location
#         parcel.updated_at = datetime.now()
#     db.session.commit()

#     print('Parcels updated successfully')

#     return jsonify({"message": "Parcels updated successfully"}), 200
# scheduler.add_job(func=update_locations, trigger='interval', seconds=300, id='update_locations')

# def simulate_new_location(parcel):
#     locations = ['In transit', 'Local distribution center', 'Out for delivery']
#     return random.choice(locations)

@app.route('/parcels/<int:parcel_id>', methods=['DELETE'])
@jwt_required()
def delete_parcel(parcel_id):
    parcel = Parcel.query.get_or_404(parcel_id)
    user = User.query.get(get_jwt_identity())
    if user.user_role != 'Agent':
        return jsonify({"message": "Only agents can delete parcels"}), 403
    if parcel.status == 'Delivered':
        return jsonify({"message": "Cannot delete delivered parcel"}), 400
    db.session.delete(parcel)
    db.session.commit()
    return jsonify({"message": "Parcel deleted successfully"}), 200

# update parcel status
@app.route('/update_status/<int:parcel_id>', methods=['PUT'])
@jwt_required()
def update_parcel_status(parcel_id):
    logging.debug(f"Updating status for parcel ID: {parcel_id}")
    logging.debug(f"Received data: {request.get_json()}")
    current_user = User.query.get(get_jwt_identity())
    if current_user.user_role != 'Agent':
        return jsonify({"message": "Only agents can update parcel status"}), 403
    
    # Find the parcel based on the parcel_id
    parcel = Parcel.query.get(parcel_id)
    logging.debug(f"Queried parcel: {parcel}")
    if not parcel:
        return jsonify({"message": "Parcel not found"}), 404
    
    data = request.get_json()
    if parcel.status == 'Delivered':
        return jsonify({"message": "Cannot update delivered parcel status"}), 400
    if data['status'] not in ['Picked Up', 'Out for Delivery', 'In Transit', 'Delivered']:
        return jsonify({"message": "Invalid status"}), 400
    
    old_status = parcel.status
    parcel.status = data['status']
    parcel.updated_at = datetime.now()
    
    new_tracking = Tracking(
        parcel_id=parcel.parcel_id,
        location=data['location'],
        status=parcel.status,
        timestamp=datetime.now()
    )
    db.session.add(new_tracking)
    db.session.commit()

    # Send notifications
    if old_status != parcel.status:
        send_notification(parcel.sender.email, 'Parcel Status Update', f'Your parcel with tracking number {parcel.tracking_number} is now {parcel.status}.')
        send_notification(parcel.recipient_email, 'Parcel Status Update', f'The parcel with tracking number {parcel.tracking_number} is now {parcel.status}. \n visit https://parcelpoa.netlify.app/track/{parcel.tracking_number} to track your parcel.')

    return jsonify({"message": "Parcel status updated successfully"}), 200

# agent associated parcels:
@app.route('/agent_parcels', methods=['GET'])
@jwt_required()
def get_agent_parcels():
    user = User.query.get(get_jwt_identity())
    
    if user.user_role != 'Agent':
        return jsonify({"message": "Only agents can view their assigned parcels"}), 403
    
    deliveries = Delivery.query.filter_by(agent_id=user.user_id).all()

    parcels = [delivery.parcel for delivery in deliveries if delivery.parcel]
    
    parcels_data = [parcel.to_dict() for parcel in parcels]
    
    return jsonify(parcels_data)


# DELIVERY ROUTES
@app.route('/deliveries', methods=['POST'])
@jwt_required()
def create_delivery():
    user = User.query.get(get_jwt_identity())
    if user.user_role != 'Business':
        return jsonify({"message": "Only businesses can create deliveries"}), 403
    
    data = request.get_json()
    
    # Parse the date strings into datetime objects
    pickup_time = datetime.fromisoformat(data['pickup_time'].replace('Z', '+00:00'))
    delivery_time = datetime.fromisoformat(data['delivery_time'].replace('Z', '+00:00'))
    
    delivery = Delivery(
        parcel_id=data['parcel_id'],
        agent_id=data['agent_id'],
        pickup_time=pickup_time,
        delivery_time=delivery_time,
        status=data['status'],
        created_at=datetime.now(timezone.utc),
        updated_at=datetime.now(timezone.utc)
    )
    db.session.add(delivery)
    db.session.commit()
    return jsonify({"message": "Delivery created successfully"}), 201

# get assigned deliveries
@app.route('/assigned_deliveries', methods=['GET'])
@jwt_required()
def get_assigned_deliveries():
    user = User.query.get(get_jwt_identity())
    print(f"User: {user}")
    if user.user_role != 'Agent':
        return jsonify({"message": "Only agents can get assigned deliveries"}), 403
    # Load the parcel relationship
    deliveries = Delivery.query.options(joinedload(Delivery.parcel)).filter_by(agent_id=user.user_id).all()
    print(f"Deliveries: {deliveries}")
    deliveries_data = [
        {
            **delivery.to_dict(),
            'parcel': delivery.parcel.to_dict() if delivery.parcel else None
        } for delivery in deliveries
    ]
    return jsonify(deliveries_data)

@app.route('/update_delivery_status/<int:delivery_id>', methods=['PUT'])
@jwt_required()
def update_delivery_status(delivery_id):
    current_user = User.query.get(get_jwt_identity())
    if current_user.user_role not in ['Business', 'Agent']:
        return jsonify({"message": "Only agents and businesses can update delivery status"}), 403

    data = request.get_json()
    delivery = Delivery.query.get_or_404(delivery_id)

    if 'status' not in data:
        return jsonify({"message": "Status is required"}), 400

    delivery.status = data['status']
    delivery.updated_at = datetime.now()
    db.session.commit()
    
    return jsonify({"message": "Delivery status updated successfully"}), 200


# mark parcel as delivered
@app.route('/mark_as_delivered/<int:parcel_id>', methods=['PUT'])
@jwt_required()
def mark_as_delivered(parcel_id):
    current_user = User.query.get(get_jwt_identity())
    if current_user.user_role != 'Agent':
        return jsonify({"message": "Only agents can mark parcel as delivered"}), 403
    parcel = Parcel.query.get_or_404(parcel_id)
    if parcel.status == 'Delivered':
        return jsonify({"message": "Parcel already marked as delivered"}), 400
    parcel.status = 'Delivered'
    parcel.updated_at = datetime.now()
    db.session.commit()
    return jsonify({"message": "Parcel marked as delivered successfully"}), 200



# TRACKING ROUTES
@app.route('/track/<string:tracking_number>', methods=['GET', 'POST'])
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


# current parcel location
# @app.route('/parcels/<int:parcel_id>/locations', methods=['GET'])
# @jwt_required()
# def get_current_location(parcel_id):
#     parcel = Parcel.query.get_or_404(parcel_id)
#     return jsonify({"location": parcel.current_location})

# @app.route('/parcels/<int:parcel_id>/location', methods=['GET'])
# @jwt_required()
# def get_current_location(parcel_id):
#     parcel = Parcel.query.get_or_404(parcel_id)
#     return jsonify({"location": {
#         "latitude": parcel.latitude,
#         "longitude": parcel.longitude
#     }})

@app.route('/location', methods=['POST'])
def receive_location():
    data = request.get_json()
    parcel_id = data.get('parcel_id')
    latitude = data.get('latitude')
    longitude = data.get('longitude')
    current_location = data.get('locationName')

    if not parcel_id:
        return jsonify({'error': 'Parcel ID is required'}), 400

    parcel = Parcel.query.get(parcel_id)
    if not parcel:
        return jsonify({'error': 'Parcel not found'}), 404

    parcel.latitude = latitude
    parcel.longitude = longitude
    parcel.current_location = current_location
    parcel.updated_at = datetime.now()
    db.session.commit()

    # Check if the status has changed before creating a new tracking entry
    last_tracking = Tracking.query.filter_by(parcel_id=parcel_id).order_by(Tracking.timestamp.desc()).first()
    if not last_tracking or last_tracking.status != parcel.status:
        tracking_entry = Tracking(
            parcel_id=parcel_id,
            timestamp=datetime.now(),
            location=parcel.current_location,
            status=parcel.status
        )
        db.session.add(tracking_entry)

    db.session.commit()
    return jsonify({'status': 'success'}), 200


@app.route('/location', methods=['GET'])
def get_location():
    parcel_id = request.args.get('parcel_id')
    if not parcel_id:
        return jsonify({'error': 'Parcel ID is required'}), 400

    parcel = Parcel.query.get(parcel_id)
    if not parcel:
        return jsonify({'error': 'Parcel not found'}), 404

    return jsonify({
        'latitude': parcel.latitude,
        'longitude': parcel.longitude
    })


# delete tracking entries in range using parcel id
@app.route('/delete_tracking_entries', methods=['POST'])
def delete_tracking_entries():
    data = request.get_json()
    parcel_id = data.get('parcel_id')
    if not parcel_id:
        return jsonify({'error': 'Parcel ID is required'}), 400

    parcel = Parcel.query.get(parcel_id)
    if not parcel:
        return jsonify({'error': 'Parcel not found'}), 404

    Tracking.query.filter_by(parcel_id=parcel_id).delete()
    db.session.commit()

    return jsonify({'message': 'Tracking entries deleted successfully'}), 200  

# BUSINESS ROUTES
# Route to schedule a pickup
from datetime import datetime, timezone

@app.route('/schedule_pickup', methods=['POST'])
@jwt_required()
def schedule_pickup():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    if user.user_role != 'Business':
        return jsonify({"message": "Only businesses can schedule pickups"}), 403
    
    data = request.get_json()
    
    sender_location = data.get('current_location', user.primary_region)  # Use business's primary region if not provided
    sender_region = get_region_from_address(sender_location)

    # Create a new parcel
    new_parcel = Parcel(
        sender_id=current_user_id,
        tracking_number=generate_unique_tracking_number(existing_numbers=Parcel.query.with_entities(Parcel.tracking_number).all()),
        recipient_name=data['recipient_name'],
        recipient_address=data['recipient_address'],
        recipient_phone=data['recipient_phone'],
        description=data['description'],
        weight=data['weight'],
        category=data['category'],
        status='Scheduled for Pickup',
        current_location=sender_location,
        sender_email=user.email,
        recipient_email=data['recipient_email']
    )
    db.session.add(new_parcel)
    db.session.flush()  # This will assign an ID to the new_parcel
    
    # Create a new order
    new_order = Order(
        user_id=current_user_id,
        order_number=generate_order_number(),
        parcel_id=new_parcel.parcel_id,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(new_order)
    
    # Parse the pickup time
    pickup_time_str = data['pickup_time']
    if pickup_time_str.endswith('Z'):
        pickup_time_str = pickup_time_str[:-1]  # Remove the 'Z'
    pickup_time = datetime.fromisoformat(pickup_time_str).replace(tzinfo=timezone.utc)
    
    # Format pickup time as "2024-08-12 Time: 12:20 PM"
    formatted_pickup_time = pickup_time.strftime('%Y-%m-%d Time: %I:%M %p')

    selected_agent_id = data.get('agent_id')
    if not selected_agent_id:
        return jsonify({"message": "Agent ID must be provided"}), 400

    # Convert selected_agent_id to an integer
    try:
        selected_agent_id = int(selected_agent_id)
    except ValueError:
        return jsonify({"message": "Invalid agent ID format"}), 400

    sender_region = get_region_from_address(new_parcel.current_location)

    if sender_region == 'Other':
        available_agents = User.query.filter_by(
            user_role='Agent',
            status='Available',
            Request='Approved'
        ).all()
    else:
        available_agents = User.query.filter(
            User.user_role == 'Agent',
            User.status == 'Available',
            User.Request == 'Approved',
            (User.primary_region == sender_region) | (User.operation_areas.like(f'%{sender_region}%'))
        ).all()

    if not available_agents:
        return jsonify({"message": f"No available agents in the region: {sender_region}"}), 400

    # Check if the provided agent_id is among the available agents
    selected_agent = next((agent for agent in available_agents if agent.user_id == selected_agent_id), None)

    if not selected_agent:
        return jsonify({"message": "Provided agent ID is not available in the specified region"}), 400

    new_delivery = Delivery(
        parcel_id=new_parcel.parcel_id,
        agent_id=selected_agent.user_id,
        pickup_time=pickup_time,
        status='Scheduled'
    )
    db.session.add(new_delivery)

    new_tracking = Tracking(
        parcel_id=new_parcel.parcel_id,
        location=new_parcel.current_location,
        status=new_parcel.status
    )
    db.session.add(new_tracking)
    
    # # Update the status of the selected agent to 'Unavailable'
    # agent = User.query.get(selected_agent)
    # if agent:
    #     agent.status = 'Unavailable'
    # else:
    #     return jsonify({"message": "Invalid agent ID provided"}), 400
    

    
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


# Route to get all orders for a business
@app.route('/business/orders', methods=['GET'])
@jwt_required()
def get_business_orders():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    if user.user_role != 'Business':
        return jsonify({"message": "Access denied"}), 403
    
    orders = Order.query.filter_by(user_id=current_user_id).all()
    return jsonify([order.to_dict() for order in orders]), 200

# Route to get details of a specific order
@app.route('/business/orders/<int:order_id>', methods=['GET'])
@jwt_required()
def get_order_details(order_id):
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    if user.user_role != 'Business':
        return jsonify({"message": "Access denied"}), 403
    
    order = Order.query.filter_by(order_id=order_id, user_id=current_user_id).first()
    if not order:
        return jsonify({"message": "Order not found"}), 404
    
    return jsonify(order.to_dict()), 200

# Route to cancel an order (if it hasn't been picked up yet)
@app.route('/business/orders/<int:order_id>/cancel', methods=['POST'])
@jwt_required()
def cancel_order(order_id):
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    if user.user_role != 'Business':
        return jsonify({"message": "Access denied"}), 403
    
    order = Order.query.filter_by(order_id=order_id, user_id=current_user_id).first()
    if not order:
        return jsonify({"message": "Order not found"}), 404
    
    parcel = Parcel.query.get(order.parcel_id)
    if parcel.status != 'Scheduled for Pickup':
        return jsonify({"message": "Cannot cancel order, parcel has already been picked up"}), 400
    
    # Cancel the order and associated parcel
    order.status = 'Cancelled'
    parcel.status = 'Cancelled'
    db.session.commit()
    
    return jsonify({"message": "Order cancelled successfully"}), 200

# get agents
@app.route('/get-agents', methods=['GET'])
@jwt_required()
def get_agents():
    user = User.query.get(get_jwt_identity())
    if user.user_role != 'Admin':
        return jsonify({"message": "Only admins can get agents"}), 403
    agents = User.query.filter_by(user_role='Agent').all()
    print('agents', agents)
    return jsonify([agent.to_dict() for agent in agents])


#available agents
@app.route('/get-available-agents', methods=['GET'])
@jwt_required()
def get_available_agents():
    primary_region = request.args.get('primary_region')
    operational_area = request.args.get('operational_area')
    
    if not primary_region:
        return jsonify({"message": "Primary region parameter is required"}), 400

    query = User.query.filter(
        User.user_role == 'Agent',
        User.status == 'Available',
        User.Request == 'Approved'
    )

    if primary_region != 'Other':
        query = query.filter(
            (User.primary_region == primary_region) |
            (User.operation_areas.like(f'%{primary_region}%'))
        )

    if operational_area and operational_area != 'Other':
        query = query.filter(User.operation_areas.like(f'%{operational_area}%'))

    agents = query.all()

    return jsonify([agent.to_dict() for agent in agents])



@app.route('/update-agent-regions', methods=['PUT'])
@jwt_required()
def update_agent_regions():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    if user.user_role != 'Agent':
        return jsonify({"message": "Only agents can update their regions"}), 403
    
    data = request.get_json()
    user.primary_region = data.get('primary_region', user.primary_region)
    user.operation_areas = ','.join(data.get('operation_areas', []))
    db.session.commit()
    
    return jsonify({"message": "Agent regions updated successfully"})

# get-business-primary-region
@app.route('/get-business-primary-region', methods=['GET'])
@jwt_required()
def get_business_primary_region():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    if user.user_role != 'Business':
        return jsonify({"message": "Only businesses can get their primary region"}), 403
    
    return jsonify({"primary_region": user.primary_region}) 


# TODO: ORDER ROUTES

# get all orders
@app.route('/orders', methods=['GET'])
@jwt_required()
def get_orders():
    user = User.query.get(get_jwt_identity())
    if user.user_role != 'Business':
        return jsonify({"message": "Only businesses can get orders"}), 403
    orders = Order.query.filter_by(user_id=user.user_id).all()
    return jsonify([order.to_dict() for order in orders])



# TODO: NOTIFICATION
# Get all notifications for the current user
@app.route('/notifications', methods=['GET'])
@jwt_required()
def get_notifications():
    current_user_id = get_jwt_identity()
    notifications = Notification.query.filter_by(user_id=current_user_id).order_by(Notification.created_at.desc()).all()
    return jsonify([notification.to_dict() for notification in notifications])

# Create a new notification TODO:
@app.route('/notifications', methods=['POST'])
@jwt_required()
def create_notification():
    current_user_id = get_jwt_identity()
    data = request.json
    recipient_id = data.get('recipient_id')
    if not recipient_id:
        return jsonify({"message": "recipient_id is required"}), 400

    recipient = User.query.get(recipient_id)
    if not recipient:
        return jsonify({"message": "Recipient not found"}), 404

    notification = Notification(
        user_id=recipient_id,
        message=data['message'],
        type=data['type'],
        status='Sent'
    )
    db.session.add(notification)
    db.session.commit()
    
    return jsonify(notification.to_dict()), 201

# Get a specific notification
@app.route('/notifications/<int:notification_id>', methods=['GET'])
@jwt_required()
def get_notification(notification_id):
    current_user_id = get_jwt_identity()
    notification = Notification.query.filter_by(notification_id=notification_id, user_id=current_user_id).first()
    
    if not notification:
        return jsonify({"message": "Notification not found"}), 404

    return jsonify(notification.to_dict())

# Update a notification's status
@app.route('/notifications/<int:notification_id>', methods=['PUT'])
@jwt_required()
def update_notification(notification_id):
    current_user_id = get_jwt_identity()
    notification = Notification.query.filter_by(notification_id=notification_id, user_id=current_user_id).first()
    
    if not notification:
        return jsonify({"message": "Notification not found"}), 404

    data = request.json
    if 'status' in data:
        notification.status = data['status']
        db.session.commit()
        return jsonify(notification.to_dict())
    
    return jsonify({"message": "No changes made"}), 400

# Delete a notification
@app.route('/notifications/<int:notification_id>', methods=['DELETE'])
@jwt_required()
def delete_notification(notification_id):
    current_user_id = get_jwt_identity()
    notification = Notification.query.filter_by(notification_id=notification_id, user_id=current_user_id).first()
    
    if not notification:
        return jsonify({"message": "Notification not found"}), 404

    db.session.delete(notification)
    db.session.commit()
    return jsonify({"message": "Notification deleted successfully"}), 200

# Mark all notifications as read
@app.route('/notifications/mark-all-read', methods=['PUT'])
@jwt_required()
def mark_all_notifications_read():
    current_user_id = get_jwt_identity()
    notifications = Notification.query.filter_by(user_id=current_user_id, status='Delivered').all()
    
    for notification in notifications:
        notification.status = 'Read'
    
    db.session.commit()
    return jsonify({"message": "All notifications marked as read"}), 200

# Get unread notification count
@app.route('/notifications/unread-count', methods=['GET'])
@jwt_required()
def get_unread_notification_count():
    current_user_id = get_jwt_identity()
    unread_count = Notification.query.filter_by(user_id=current_user_id, status='Delivered').count()
    return jsonify({"unread_count": unread_count})


# send email notifications to users/parties
def send_notification(email, subject, body):
    if not is_valid_email(email):
        logging.error(f"Invalid email address: {email}")
        return

    with app.app_context():
        try:
            msg = Message(subject, recipients=[email], body=body)
            mail.send(msg)
            logging.info(f"Notification sent to {email}.")
        except Exception as e:
            logging.error(f"Failed to send notification to {email}: {str(e)}")

# generate tracking numbers
def generate_unique_tracking_number(existing_numbers):
    """Generate a unique tracking number not in the existing_numbers set."""
    while True:
        tracking_number = ''.join(random.choices(string.ascii_uppercase + string.digits, k=10))
        if tracking_number not in existing_numbers:
            return tracking_number


def generate_order_number():
    while True:
        order_number = ''.join(random.choices(string.ascii_uppercase + string.digits, k=5))
        existing_order = Order.query.filter_by(order_number=order_number).first()
        if existing_order is None:
            return order_number

# def get_region_from_address(address):
#     geolocator = Nominatim(user_agent="my_user_agent")
#     location = geolocator.geocode(address)
#     if location:
#         return location.address
#     else:
#         return None

def get_region_from_address(address):
    if address is None:
        return 'Other'  # or handle None as needed

    nairobi_regions = [
        'Embakasi', 'Kasarani', 'Pangani', 'Ngara', 
        'Ruaraka', 'Muthaiga', 'Lavington', 'Parklands', 'Westlands',
        'Ngong', 'Kibra', 'South B'
    ]
    address_lower = address.lower()
    
    for region in nairobi_regions:
        if region.lower() in address_lower:
            return 'Nairobi'
    if 'nairobi' in address_lower:
        return 'Nairobi'
    return 'Other'


# @app.route('/get-regions', methods=['GET'])
# def get_regions():
#     regions = {
#         'Primary': ['Nairobi', 'Other'],
#         'Operational': ['Embakasi', 'Kasarani', 'Pangani', 'Ngara', 'Ruaraka', 'Muthaiga', 'Lavington', 'Parklands', 'Westlands']
#     }
#     return jsonify(regions)


@app.route('/get-regions', methods=['GET'])
def get_regions():
    regions = {
        'Nairobi': ['Embakasi', 'Kasarani', 'Pangani', 'Ngara', 'Ruaraka', 'Muthaiga', 'Lavington', 'Parklands', 'Westlands', 'Ngong', 'Kibra', 'South B'],
        'Other': []  # You can add other primary regions here if needed
    }
    return jsonify(regions)



# RESET PASSWORD
from flask_mail import Mail, Message
# from itsdangerous import URLSafeTimedSerializer

app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
app.config['MAIL_USERNAME'] = os.environ.get('GMAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.environ.get('GMAIL_APP_PASSWORD')
app.config['MAIL_DEFAULT_SENDER'] = os.environ.get('MAIL_DEFAULT_SENDER')

mail = Mail(app)

with app.app_context():
    # serializer for generating secure tokens
    s = URLSafeTimedSerializer(app.config['SECRET_KEY'])


# reset password
@app.route('/request-reset-password', methods=['POST'])
def request_reset_password():
    data = request.get_json()
    email = data.get('email')
    frontend_url = data.get('frontend_url')
    
    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({"message": "If a user with this email exists, a password reset link has been sent."}), 200

    token = s.dumps(email, salt='password-reset-salt') 

    # seting reset URL to use frontend URL
    reset_url = f"{frontend_url}/reset-password/{token}"

    try:
        send_email(user.email, reset_url)
        return jsonify({"message": "If a user with this email exists, a password reset link has been sent."}), 200
    except Exception as e:
        print(f"Error sending email: {str(e)}")
        return jsonify({"message": "An error occurred while processing your request."}), 500
    
    
@app.route('/reset-password/<token>', methods=['POST'])
def reset_password(token):
    try:
        email = s.loads(token, salt='password-reset-salt', max_age=3600)
    except SignatureExpired:
        return jsonify({"message": "The reset link has expired"}), 400
    except BadSignature:
        return jsonify({"message": "The reset link is invalid"}), 400
    
    data = request.get_json()
    new_password = data.get('new_password')
    
    if not new_password:
        return jsonify({"message": "New password is required"}), 400
    
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"message": "User with this email does not exist"}), 404
    
    # hash new password
    hashed_password = bcrypt.generate_password_hash(new_password).decode('utf-8')
    user.password_hash = hashed_password
    db.session.commit()
    
    return jsonify({"message": "Password has been reset successfully"}), 200


def send_email(to_email, reset_url):
    subject = "Password Reset Request"
    content = f"""
    Hello from parcelpoa!,

    You have requested to reset your password. Please click on the following link to reset your password:

    {reset_url}

    If you did not request this, please ignore this email and your password will remain unchanged.

    Best regards,
    The parcelpoa Team
    """
    
    msg = Message(subject=subject,
                  recipients=[to_email],
                  body=content)
    
    try:
        print(f"Attempting to send email to {to_email}")
        mail.send(msg)
        print(f"Email sent successfully to {to_email}.")
    except Exception as e:
        print(f"Failed to send email: {str(e)}")
        print(f"Error type: {type(e).__name__}")
        print(f"MAIL_USERNAME: {app.config['MAIL_USERNAME']}")
        print(f"MAIL_PASSWORD set: {'Yes' if app.config['MAIL_PASSWORD'] else 'No'}")
        raise

    return True


import re

def is_valid_email(email):
    pattern = r'^[\w\.-]+@[\w\.-]+\.\w+$'
    return re.match(pattern, email) is not None

# Handle image upload:
import base64
import os
from flask import current_app, send_from_directory

@app.route('/static/<path:path>')
def send_static(path):
    return send_from_directory('static', path)

def save_base64_image(base64_string, filename):
    if ',' in base64_string:
        base64_string = base64_string.split(',', 1)[1]
    
    image_data = base64.b64decode(base64_string)
    
    upload_dir = os.path.join(current_app.root_path, 'static', 'uploads')
    if not os.path.exists(upload_dir):
        os.makedirs(upload_dir)
    
    file_path = os.path.join(upload_dir, filename)
    
    with open(file_path, 'wb') as f:
        f.write(image_data)
    
    return os.path.join('uploads', filename)


# Africastalking SMS
import africastalking
from flask import request

username = os.environ.get('AT_USERNAME')
api_key = os.environ.get('AT_API_KEY')

africastalking.initialize(username, api_key)

sms = africastalking.SMS

def send_sms(phone_number, message):
    try:
        # response = sms.send(message, to=[phone_number])
        response = sms.send(message, [phone_number])
        logging.info(f"SMS sent to {phone_number}: {response}")
        return True
    except Exception as e:
        logging.error(f"Failed to send SMS to {phone_number}: {str(e)}")
        return False

send_sms("+254755854832", "Hello from parcelpoa!")


# sendchamp SMS
from flask import request
import sendchamp

api_key = os.environ.get('SENDCHAMP_API_KEY')
sendchamp.api_key = api_key

def send_sms(phone_number, message, sender_name="YourSenderID"):
    try:
        response = sendchamp.SMS.send(
            to=[phone_number],
            message=message,
            sender_name=sender_name,
            route="dnd"
        )
        logging.info(f"SMS sent to {phone_number}: {response}")
        return True
    except Exception as e:
        logging.error(f"Failed to send SMS to {phone_number}: {str(e)}")
        return False

# send_sms("+254755854832", "Hello from parcelpoa!", "YourSenderID")

# Google oauth
# from flask_dance.contrib.google import make_google_blueprint, google

# blueprint = make_google_blueprint(
#     client_id=os.environ.get("GOOGLE_CLIENT_ID"),
#     client_secret=os.environ.get("GOOGLE_CLIENT_SECRET"),
#     redirect_to="google-login"
# )
# app.register_blueprint(blueprint)

# @app.route("/google-login")
# def google_login():
#     if not google.authorized:
#         return redirect(url_for("google.login"))
#     resp = google.get("/oauth2/v2/userinfo")
#     assert resp.ok, resp.text
#     return resp.text


# FACEBOOK webhook
# oauth = OAuth1(app)

# facebook = oauth.remote_app(
#     'facebook',
#     consumer_key='1407483346114437',
#     consumer_secret='9a0...b4',
#     request_token_params={
#         'scope': 'email,public_profile'
#     },
#     base_url='https://graph.facebook.com/',
#     request_token_url=None,
#     access_token_method='POST',
#     access_token_url='/oauth/access_token',
#     authorize_url='https://www.facebook.com/dialog/oauth'
# )
# db_check()
logging.info("Application setup completed")

if __name__ == "__main__":
    app.run(debug=True, use_reloader=False)