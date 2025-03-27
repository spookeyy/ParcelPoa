import random, string
from backend.model.order import Order

def generate_order_number():
    while True:
        order_number = ''.join(random.choices(string.ascii_uppercase + string.digits, k=5))
        existing_order = Order.query.filter_by(order_number=order_number).first()
        if existing_order is None:
            return order_number