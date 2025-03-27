from flask import Blueprint

notification = Blueprint('notification', __name__)

from . import all_notifications, count_unread_notifications, create_notification, delete_notification, mark_all_as_read, update_notification_status, view_specific_notification