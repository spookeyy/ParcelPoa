import random
import smtplib
from flask import Flask, request, jsonify,url_for
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from datetime import datetime, timezone
from flask_apscheduler import APScheduler
from itsdangerous import URLSafeTimedSerializer, SignatureExpired, BadSignature
from werkzeug.security import generate_password_hash
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity, get_jwt
from models import db, User, Parcel, Delivery, Notification, Tracking, Order
import os
from flask_cors import CORS
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

app = Flask(__name__)
CORS(app)
app.config["SQLALCHEMY_DATABASE_URI"] = 'sqlite:///database.db'
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["JWT_SECRET_KEY"] = os.environ.get("JWT_SECRET_KEY", "super-secret-key")
app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY", "another-secret-key")

CORS(app)

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

blacklist = set()

# JWT Configurations
@jwt.token_in_blocklist_loader
def check_if_token_in_blacklist(jwt_header, jwt_payload):
    return jwt_payload['jti'] in blacklist

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
    if user is None:
        return jsonify({"message": "User not found"}), 404
    return jsonify({
        'user_id': user.user_id,
        'name': user.name,
        'email': user.email,
        'phone_number': user.phone_number,
        'user_role': user.user_role
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
    user.updated_at = datetime.now()
    db.session.commit()
    return jsonify({"message": "Profile updated successfully"})

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


# PARCEL ROUTES
@app.route('/parcels', methods=['POST'])
@jwt_required()
def create_parcel():
    data = request.get_json()
    user = User.query.get(get_jwt_identity())
    if user.user_role != 'Agent':
        return jsonify({"message": "Only agentes can create parcels"}), 403
    
    parcel = Parcel(
        sender_id=data['sender_id'],
        tracking_number=data['tracking_number'],
        recipient_name=data['recipient_name'],
        recipient_address=data['recipient_address'],
        recipient_phone=data['recipient_phone'],
        description=data['description'],
        weight=data['weight'],
        status=data['status'],
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
    user = User.query.get(get_jwt_identity())
    if user.user_role != 'Agent':
        return jsonify({"message": "Only agents can view parcels"}), 403
    parcels = Parcel.query.all()
    return jsonify([parcel.to_dict() for parcel in parcels])

@app.route('/parcels/<int:parcel_id>', methods=['GET'])
@jwt_required()
def get_parcel_status(parcel_id):
    parcel = Parcel.query.get_or_404(parcel_id)
    user = User.query.get(get_jwt_identity())
    if not user:
        return jsonify({"message": "User not found"}), 404
    if parcel.status == 'Delivered':
        return jsonify({"status": "Delivered"})
    elif parcel.status == "in Transit":
        return jsonify({"status": "In Transit"})
    return jsonify({"status": "Scheduled"})
    # return jsonify(parcel.to_dict())

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

def simulate_new_location(parcel):
    locations = ['In transit', 'Local distribution center', 'Out for delivery']
    return random.choice(locations)

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
    current_user = User.query.get(get_jwt_identity())
    if current_user.user_role != 'Agent':
        return jsonify({"message": "Only agents can update parcel status"}), 403
    
    data = request.get_json()
    parcel = Parcel.query.get_or_404(parcel_id)
    if parcel.status == 'Delivered':
        return jsonify({"message": "Cannot update delivered parcel status"}), 400
    if data['status'] not in ['Scheduled', 'In Transit', 'Delivered']:
        return jsonify({"message": "Invalid status"}), 400
    
    parcel.status = data['status']
    parcel.updated_at = datetime.now()
    
    new_tracking = Tracking(
        parcel_id=parcel.parcel_id,
        location=parcel.current_location,
        status=parcel.status,
        timestamp=datetime.now()
    )
    db.session.add(new_tracking)
    db.session.commit()
    return jsonify({"message": "Parcel status updated successfully"}), 200



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
    if user.user_role != 'Agent':
        return jsonify({"message": "Only agents can get assigned deliveries"}), 403
    deliveries = Delivery.query.filter_by(agent_id=user.user_id).all()
    return jsonify([delivery.to_dict() for delivery in deliveries])


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



#TODO: TRACKING ROUTES
@app.route('/parcels-tracking/<string:tracking_number>', methods=['GET'])
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




# TODO: ORDER ROUTES

# get all orders
@app.route('/orders', methods=['GET'])
@jwt_required()
def get_orders():
    user = User.query.get(get_jwt_identity())
    if user.user_role != 'Business':
        return jsonify({"message": "Only businesses can get orders"}), 403
    orders = Order.query.all()
    return jsonify([order.to_dict() for order in orders])



# TODO: NOTIFICATION ROUTES






# RESET PASSWORD
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from itsdangerous import URLSafeTimedSerializer, SignatureExpired, BadSignature
from flask import current_app
s = URLSafeTimedSerializer(current_app.config['SECRET_KEY'])

# SendGrid settings
SENDGRID_API_KEY = os.environ.get('SENDGRID_API_KEY')
FROM_EMAIL = os.environ.get('FROM_EMAIL')
# reset password
@app.route('/request-reset-password', methods=['POST'])
def request_reset_password():
    data = request.get_json()
    email = data.get('email')
    user = User.query.filter_by(email=email).first()
    
    if not user:
        return jsonify({"message": "If a user with this email exists, a password reset link has been sent."}), 200
    
    token = s.dumps(email, salt='password-reset-salt')
    
    reset_url = url_for('reset_password', token=token, _external=True)
    
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
    Hello,

    You have requested to reset your password. Please click on the following link to reset your password:

    {reset_url}

    If you did not request this, please ignore this email and your password will remain unchanged.

    Best regards,
    Your Application Team
    """
    
    message = Mail(
        from_email=FROM_EMAIL,
        to_emails=to_email,
        subject=subject,
        plain_text_content=content)
    
    try:
        sg = SendGridAPIClient(SENDGRID_API_KEY)
        response = sg.send(message)
        print(f"Email sent successfully to {to_email}. Status code: {response.status_code}")
    except Exception as e:
        print(f"Failed to send email: {str(e)}")
        raise

    return True

if __name__ == "__main__":
    app.run(debug=True, use_reloader=False)
