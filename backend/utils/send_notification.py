from flask import current_app
from flask_mail import Message
from backend.utils.valid_email import is_valid_email
import logging

def send_notification(email, subject, body, html=False):
    if not is_valid_email(email):
        logging.error(f"Invalid email address: {email}")
        return

    try:
        mail = current_app.extensions.get('mail')
        if not mail:
            raise RuntimeError("Mail extension not initialized")
            
        if html:
            msg = Message(subject, recipients=[email], html=body)
        else:
            msg = Message(subject, recipients=[email], body=body)
        
        mail.send(msg)
        logging.info(f"Notification sent to {email}")
    except Exception as e:
        logging.error(f"Failed to send notification to {email}: {str(e)}")