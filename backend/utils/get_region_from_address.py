def get_region_from_address(address):
    if address is None:
        return 'Other' 

    nairobi_regions = [
        'Embakasi', 'Kasarani', 'Pangani', 'Ngara', 
        'Ruaraka', 'Muthaiga', 'Lavington', 'Parklands', 'Westlands',
        'Ngong', 'Kibra', 'South B'
    ]
    address_lower = address.lower()
    
    for region in nairobi_regions:
        if region.lower() in address_lower:
            return 'Nairobi'
    if 'nairobi' in address_lower:
        return 'Nairobi'
    return 'Other'