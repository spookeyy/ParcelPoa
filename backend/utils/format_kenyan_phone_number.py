import re 

def format_kenyan_number(number):
        number = re.sub(r'\D', '', number)  # Remove non-digit characters
        if number.startswith('0'):
            number = number[1:]  # Remove leading '0'
        if not number.startswith('254'):
            number = '254' + number
        return '+' + number