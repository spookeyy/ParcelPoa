from flask import Blueprint


agent = Blueprint('agent', __name__)

# routes
from . import (
    delete_parcel, 
    get_parcel_status, 
    get_parcels, 
    update_my_region, 
    update_parcel_status, 
    update_work_status, 
    view_my_parcels
)