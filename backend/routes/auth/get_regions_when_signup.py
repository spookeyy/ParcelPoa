from flask import jsonify
from . import auth

@auth.route('/get-regions', methods=['GET'])
def get_regions():
    regions = {
        'Nairobi': ['Embakasi', 'Kasarani', 'Pangani', 'Ngara', 'Ruaraka', 'Muthaiga', 'Lavington', 'Parklands', 'Westlands', 'Ngong', 'Kibra', 'South B'],
        'Other': [] 
    }
    return jsonify(regions)