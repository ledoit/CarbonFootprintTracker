import requests

def coords_to_carbon(origin: str, destination: str, transportation_type: str, frequency: str):
    api_key = 'AIzaSyCdx1udUFaXQ_DfGbKIM4j4YpEAO_IgEgk'
    frequency = float(frequency)
    transit_modes = {'Gasoline SUV': 'driving',
                    'Hybrid SUV': 'driving',
                    'Electric SUV': 'driving',
                    'Gasoline Sedan': 'driving',
                    'Hybrid Sedan': 'driving',
                    'Electric Sedan': 'driving',
                    'Motorcycle': 'driving',
                    'T': 'transit',
                    'Bus': 'transit',
                    'Public Transportation': 'transit'}

    assert(transportation_type in transit_modes)

    if transit_modes[transportation_type] == 'transit':
        if transportation_type == 'T':
            resp = requests.get(
                f'https://maps.googleapis.com/maps/api/directions/json?origin={origin}&destination={destination}&mode=transit&transit_mode=tram|subway&key={api_key}').json()
        elif transportation_type == 'Bus':
            resp = requests.get(
                f'https://maps.googleapis.com/maps/api/directions/json?origin={origin}&destination={destination}&mode=transit&transit_mode=bus&key={api_key}').json()
        else:
            resp = requests.get(
                f'https://maps.googleapis.com/maps/api/directions/json?origin={origin}&destination={destination}&mode=transit&key={api_key}').json()
    else:
        resp = requests.get(f'https://maps.googleapis.com/maps/api/directions/json?origin={origin}&destination={destination}&mode={transit_modes[transportation_type]}&key={api_key}').json()

    if resp['geocoded_waypoints'][1]['geocoder_status'] != 'OK':
        return resp['geocoded_waypoints'][1]['geocoder_status']

    try:
        distance = resp['routes'][0]['legs'][0]['distance']['text']
    except Exception as e:
        return e

    if distance.split()[1] == 'mi':
        miles = float(distance.split()[0])
    elif distance.split()[1] == 'ft':
        miles = float(distance.split()[0]) / 0.000189394

    if transportation_type == 'Gasoline SUV':
        return miles * 404 * frequency
    elif transportation_type == 'Hybrid SUV':
        return miles * 270 * frequency
    elif transportation_type == 'Electric SUV':
        return miles * 250 * frequency
    elif transportation_type == 'Gasoline Sedan':
        return miles * 345 * frequency
    elif transportation_type == 'Hybrid Sedan':
        return miles * 225 * frequency
    elif transportation_type == 'Electric Sedan':
        return miles * 200 * frequency
    elif transportation_type == 'Motorcycle':
        return miles * 150 * frequency
    elif transportation_type == 'T':
        return miles * 1.02 * frequency
    elif transportation_type == 'Bus':
        return miles * 3.88 * frequency
    elif transportation_type == 'Public Transportation':
        return miles * 2.45 * frequency
    else:
        return 0

def compare_to_context(user_co2):
    description = [
        "bottles being recycled",
        "hours on a cruise ship",
        "days of tree CO2 absorption",
        "days of cell phone usage",
        "hours on a jet plane",
        "tons of paper made",
    ]

    numbers = [41.4, 420000, 60, 1500, 1000000, 2000]
    string = f"{user_co2} grams CO2 is equivalent to: \n<br>"

    for i in range(len(description)):
        comparison = user_co2 / numbers[i]
        string += str(i + 1) + f": {comparison:.2f} {description[i]}\n<br>"
    return string

# carbon.py
def calculate_results(data):
    activities = data.get('activities', [])
    return {activity['name']: coords_to_carbon(activity['start'], activity['end'], activity['mode'], activity['frequency']) for activity in activities}

def res_to_string(results) -> str:
    return_string = ''
    weekly_total = sum(results.values())

    for key in results:
        return_string += f'{key} = {results[key]}g C02\n<br>'
    return_string += f'------------------------------\n<br>Weekly Total: {weekly_total}g C02\n\n<br><br>'

    comparisons = compare_to_context(weekly_total)

    return_string += comparisons

    return return_string

# Export res_to_string function explicitly
__all__ = ['res_to_string']