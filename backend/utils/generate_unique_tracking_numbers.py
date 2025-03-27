import random, string

# generate tracking numbers
def generate_unique_tracking_number(existing_numbers):
    """Generate a unique tracking number not in the existing_numbers set."""
    while True:
        tracking_number = ''.join(random.choices(string.ascii_uppercase + string.digits, k=10))
        if tracking_number not in existing_numbers:
            return tracking_number