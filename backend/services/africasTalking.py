import africastalking
import logging
import os

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

# send_sms("+254103947514", "Hello from parcelpoa!")