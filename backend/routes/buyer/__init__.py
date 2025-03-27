from flask import Blueprint

buyer = Blueprint('buyer', __name__)

from . import get_parcel_location, track_parcel