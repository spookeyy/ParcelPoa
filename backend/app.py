import random
from flask import Flask, request, jsonify
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from datetime import datetime
from flask_apscheduler import APScheduler
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity, get_jwt
from models import db, User, Parcel, Delivery, Notification, Tracking, Order

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = 'sqlite:///database.db'
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["JWT_SECRET_KEY"] = "super-secret-key" 
app.config["SECRET-KEY"] = "secret-key"

migrate = Migrate(app, db)
db.init_app(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

# scheduler configurations
scheduler = APScheduler()
scheduler.init_app(app)
scheduler.start()

blacklist = set()

# JWT Configurations
@jwt.token_in_blocklist_loader
def check_if_token_in_blacklist(jwt_header, jwt_payload):
    return jwt_payload["jti"] in blacklist

# user routes
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'message': 'Email already exists'}), 400
    
    required_fields = ['name', 'email', 'phone_number', 'user_role', 'password']
    
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"'{field}' is required"}), 400
    
    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    new_user = User(
        name=data['name'],
        email=data['email'],
        phone_number=data['phone_number'],
        user_role=data['user_role'],
        created_at=datetime.now(),
        updated_at=datetime.now(),
        password_hash=hashed_password
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User registered successfully"}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    if user and bcrypt.check_password_hash(user.password_hash, data['password']):
        access_token = create_access_token(
            identity={
            'user_id': user.user_id, 
            'user_role': user.user_role})
        return jsonify({"access_token": access_token}), 200
    else:
        return jsonify({"message": "Invalid credentials"}), 401
    
#logout
@app.route('/logout', methods=['POST'])
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

@app.route('/users/<int:user_id>', methods=['PUT'])
@jwt_required()
def update_user(user_id):
    data = request.get_json()
    user = User.query.get_or_404(user_id)
    user.name = data.get('name', user.name)
    user.email = data.get('email', user.email)
    user.phone_number = data.get('phone_number', user.phone_number)
    user.updated_at = datetime.now()
    db.session.commit()
    return jsonify({"message": "User updated successfully"})

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

# user profile
@app.route('/profile', methods=['GET'])
@jwt_required()
def profile():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    return jsonify({
        'user_id': user.user_id,
        'name': user.name,
        'email': user.email,
        'phone_number': user.phone_number,
        'user_role': user.user_role
    })


# TRACKING ROUTES
@app.route('/tracking_number', methods=['POST'])
@jwt_required()
def track_parcel(tracking_number):
    parcel = Parcel.query.filter_by(tracking_number=tracking_number).first()
    if not parcel:
        return jsonify({"message": "Parcel not found"}), 404
    
    status = get_parcel_status(parcel)
    return jsonify({"status": status})

# current parcel location
@app.route('/parcels/<int:parcel_id>/location', methods=['GET'])
@jwt_required()
def get_current_location(parcel_id):
    parcel = Parcel.query.get_or_404(parcel_id)
    return jsonify({"location": parcel.current_location})




# PARCEL ROUTES
@app.route('/parcels', methods=['POST'])
@jwt_required()
def create_parcel():
    data = request.get_json()
    parcel = Parcel(
        sender_id=data['sender_id'],
        tracking_number=data['tracking_number'],
        recipient_name=data['recipient_name'],
        recipient_address=data['recipient_address'],
        recipient_phone=data['recipient_phone'],
        description=data['description'],
        weight=data['weight'],
        current_location=data['current_location'],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(parcel)
    db.session.commit()
    return jsonify({"message": "Parcel created successfully"}), 201

@app.route('/parcels', methods=['GET'])
@jwt_required()
def get_parcels():
    parcels = Parcel.query.all()
    return jsonify([parcel.to_dict() for parcel in parcels]) 

@app.route('/parcels/<int:parcel_id>', methods=['GET'])
@jwt_required()
def get_parcel_status(parcel_id):
    parcel = Parcel.query.get_or_404(parcel_id)
    return jsonify(parcel.to_dict())

# update parcel location
@app.route('/parcels/<int:parcel_id>/location', methods=['PUT'])
@jwt_required()
def update_parcel_location(parcel_id):
    user = User.query.get(get_jwt_identity())
    if user.user_role != 'Agent':
        return jsonify({"message": "Only agents can update parcel location"}), 403
    data = request.get_json()
    parcel = Parcel.query.get_or_404(parcel_id)
    parcel.current_location = data['location']
    parcel.updated_at = datetime.now()
    db.session.commit()
    return jsonify({"message": "Parcel location updated successfully"}), 200

# scheduler implementation
@scheduler.task('interval', id='update_locations', seconds=300)  # Run every 5 minutes
def update_locations():
    parcels = Parcel.query.filter(Parcel.status != 'Delivered').all()
    for parcel in parcels:
        new_location = simulate_new_location(parcel)
        parcel.current_location = new_location
        parcel.updated_at = datetime.now()
    db.session.commit()

def simulate_new_location(parcel):
    locations = ['In transit', 'Local distribution center', 'Out for delivery']
    return random.choice(locations)

@app.route('/parcels/<int:parcel_id>', methods=['DELETE'])
@jwt_required()
def delete_parcel(parcel_id):
    parcel = Parcel.query.get_or_404(parcel_id)
    if parcel.status == 'Delivered':
        return jsonify({"message": "Cannot delete delivered parcel"}), 400
    db.session.delete(parcel)
    db.session.commit()
    return jsonify({"message": "Parcel deleted successfully"}), 200


# DELIVERY ROUTES
@app.route('/deliveries', methods=['POST'])
@jwt_required()
def create_delivery():
    user = User.query.get(get_jwt_identity())
    if user.user_role != 'Business':
        return jsonify({"message": "Only businesses can create deliveries"}), 403
    data = request.get_json()
    delivery = Delivery(
        parcel_id=data['parcel_id'],
        agent_id=data['agent_id'],
        pickup_time=data['pickup_time'],
        delivery_time=data['delivery_time'],
        status=data['status'],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(delivery)
    db.session.commit()
    return jsonify({"message": "Delivery created successfully"}), 201

# get assigned deliveries
# TODO: add pagination check on this later
@app.route('/assigned_deliveries', methods=['GET'])
@jwt_required()
def get_assigned_deliveries():
    user = User.query.get(get_jwt_identity())
    if user.user_role != 'Agent':
        return jsonify({"message": "Only agents can get assigned deliveries"}), 403
    deliveries = Delivery.query.filter_by(agent_id=user.user_id).all()
    return jsonify([delivery.to_dict() for delivery in deliveries])

# update parcel status
@app.route('/update_status/<int:parcel_id>', methods=['PUT'])
@jwt_required()
def update_parcel_status(parcel_id):
    current_user = User.query.get(get_jwt_identity())
    if current_user.user_role != 'Agent':
        return jsonify({"message": "Only agents can update parcel status"}), 403
    data = request.get_json()
    parcel = Parcel.query.get_or_404(parcel_id)
    parcel.status = data['status']
    parcel.updated_at = datetime.now()
    db.session.commit()
    return jsonify({"message": "Parcel status updated successfully"}), 200

@app.route('/update_delivery_status/<int:delivery_id>', methods=['PUT'])
@jwt_required()
def update_delivery_status(delivery_id):
    current_user = User.query.get(get_jwt_identity())
    if current_user.user_role != 'Business':
        return jsonify({"message": "Only businesses can update delivery status"}), 403
    data = request.get_json()
    delivery = Delivery.query.get_or_404(delivery_id)
    delivery.status = data['status']
    delivery.updated_at = datetime.now()
    db.session.commit()
    return jsonify({"message": "Delivery status updated successfully"}), 200



if __name__ == "__main__":
    app.run(debug=True)
