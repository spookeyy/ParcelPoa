from datetime import datetime
from backend import bcrypt
from flask import jsonify, request
from backend.model.user import User
from backend import db
from . import auth

@auth.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'message': 'Email already exists'}), 400

    elif data.get("phone_number"):
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
    
    # Handle operation_areas
    operation_areas = data.get('operation_areas', [])
    if operation_areas and isinstance(operation_areas, list):
        operation_areas_str = ','.join(operation_areas)
    else:
        operation_areas_str = None

    new_user = User(
        name=data.get('name'),
        email=data.get('email'),
        phone_number=data.get('phone_number'),
        user_role=data.get('user_role'),
        created_at=datetime.now(),
        updated_at=datetime.now(),
        password_hash=hashed_password,
        primary_region=data.get('primary_region'),
        operation_areas=operation_areas_str,
        is_open=True if data.get('user_role') == 'PickupStation' else None,
    )
    db.session.add(new_user)
    db.session.commit()

    if data['user_role'] == 'Business':
        return jsonify({"message": "Business registered successfully"}), 201
    elif data['user_role'] == 'Agent':
        return jsonify({"message": "Agent registered successfully"}), 201
    elif data['user_role'] == 'PickupStation':
        return jsonify({"message": "PickupStation registered successfully"}), 201
    
    return jsonify({"message": "User registered successfully"}), 201