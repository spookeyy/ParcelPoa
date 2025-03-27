from flask import Blueprint

auth = Blueprint('auth', __name__)

# routes
from . import change_password, current_user, get_profile,get_regions_when_signup, login, logout, register, reset_password, update_profile