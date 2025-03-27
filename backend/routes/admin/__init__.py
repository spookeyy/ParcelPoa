import os

from flask import Blueprint

admin = Blueprint('admin', __name__)

# routes
from . import approve_agent, delete_user, get_agents, get_all_business, get_all_pickupstations, get_users, reject_agent, update_agent_request_status, view_agent_details