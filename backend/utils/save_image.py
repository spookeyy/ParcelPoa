import base64
import os
from flask import current_app, send_from_directory
from backend.routes.auth import auth

@auth.route('/static/<path:path>')
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