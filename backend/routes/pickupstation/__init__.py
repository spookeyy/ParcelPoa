from flask import Blueprint

pickupstation = Blueprint('pickupstation', __name__)

from . import dashboard_data, update_parcel_status_at_station, update_station_status, view_allocated_parcels