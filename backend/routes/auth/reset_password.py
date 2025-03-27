from flask import Blueprint, request, jsonify, current_app
from flask_mail import Message
from backend import mail, db, bcrypt
from backend.model.user import User
import os
from itsdangerous import BadSignature, URLSafeTimedSerializer

auth = Blueprint('auth', __name__)

# Use `current_app` inside a request context
def send_email(to_email, reset_url):
    with current_app.app_context():
        subject = "Password Reset Request"
        html_content = f"""
        <html>
        <body>
        <p>Hello from parcelpoa!,</p>
        <p>You have requested to reset your password. Please click on the following link to reset your password:</p>
        <p><a href="{reset_url}">Reset Password</a></p>
        <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
        <p>Best regards,<br>
        The ParcelPoa Team</p>
        </body>
        </html>
        """
        
        msg = Message(subject=subject, recipients=[to_email], html=html_content)
        
        try:
            mail.send(msg)
            return True
        except Exception as e:
            print(f"Failed to send email: {str(e)}")
            raise

@auth.route('/request-reset-password', methods=['POST'])
def request_reset_password():
    data = request.get_json()
    email = data.get('email')
    frontend_url = data.get('frontend_url')

    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({"message": "If a user with this email exists, a password reset link has been sent."}), 200

    with current_app.app_context():
        s = URLSafeTimedSerializer(current_app.config['SECRET_KEY'])
        token = s.dumps(email, salt='password-reset-salt')
    
    reset_url = f"{frontend_url}/reset-password/{token}"

    try:
        send_email(user.email, reset_url)
        return jsonify({"message": "If a user with this email exists, a password reset link has been sent."}), 200
    except Exception:
        return jsonify({"message": "An error occurred while processing your request."}), 500
