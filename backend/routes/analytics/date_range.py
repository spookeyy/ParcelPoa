from datetime import datetime, timedelta

def get_date_range(date_range):
    today = datetime.now().date()
    
    if date_range == 'today':
        start_date = today
    elif date_range == 'yesterday':
        start_date = today - timedelta(days=1)
    elif date_range == 'week':
        start_date = today - timedelta(days=7)
    elif date_range == 'month':
        start_date = today - timedelta(days=30)
    elif date_range == 'year':
        start_date = today - timedelta(days=365)
    elif date_range == 'all':
        start_date = datetime.min.date()
    else:
        # Default to today if invalid range provided
        start_date = today
    
    return start_date, today