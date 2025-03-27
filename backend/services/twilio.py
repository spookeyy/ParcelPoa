import os
from twilio.rest import Client
from flask import request, jsonify
from backend.utils.format_kenyan_phone_number import format_kenyan_number
from . import services

# Twilio credentials
account_sid = os.environ.get('TWILIO_ACCOUNT_SID')
auth_token = os.environ.get('TWILIO_AUTH_TOKEN')
twilio_phone_number = os.environ.get('TWILIO_PHONE_NUMBER')

client = Client(account_sid, auth_token)

@services.route('/send-sms', methods=['POST'])
def send_sms():
    data = request.json
    to_number = data.get('to')
    message = data.get('message')

    if not to_number or not message:
        return jsonify({'success': False, 'error': 'Missing phone number or message'}), 400

    # Format the 'to' number
    to_number = format_kenyan_number(to_number)

    try:
        message = client.messages.create(
            body=message,
            from_=twilio_phone_number,
            to=to_number
        )
        return jsonify({'success': True, 'message_sid': message.sid}), 200
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 400