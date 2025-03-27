from flask import Blueprint

business = Blueprint('business', __name__)

from . import cancel_order, create_order_schedule_pickup, my_operational_region, view_available_agents, view_open_pickupstations, view_order_details, view_orders, view_region_available_pickupstations