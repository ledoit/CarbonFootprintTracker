import os
import psycopg2
from datetime import datetime, timezone
from dotenv import load_dotenv
from flask import *


CREATE_PERSONS_TABLE = (
    "CREATE TABLE IF NOT EXISTS persons (id SERIAL PRIMARY KEY, name TEXT);"
)
CREATE_CARBONS_TABLE = """CREATE TABLE IF NOT EXISTS carbons (
    person_id INTEGER, 
    carbon REAL, 
    date TIMESTAMP, 
    FOREIGN KEY(person_id) REFERENCES persons(id) ON DELETE CASCADE
);"""

INSERT_PERSON_RETURN_ID = "INSERT INTO persons (name) VALUES (%s) RETURNING id;"


INSERT_CARB = (
    "INSERT INTO carbons (person_id, carbon, date) VALUES (%s, %s, %s);"
)

GLOBAL_NUMBER_OF_DAYS = (
    """SELECT COUNT(DISTINCT DATE(date)) AS days FROM carbons;"""
)

GLOBAL_AVG = """SELECT AVG(carbon) as average FROM carbons;"""


load_dotenv()

# Create an instance of the Flask class
app = Flask(__name__, template_folder='templates')
url = os.getenv("DATABASE_URL")
connection = psycopg2.connect(url)

# post used for clients to send data
@app.route("/api/person", methods = ['GET', 'POST'])

def create_person():
    if request.method == 'POST':
        return create_person()


def create_person():
    # python dictionary of data sent by client (turns string into dictionary)
    data = request.get_json()
    name = data["name"]
    with connection:
        # iterates over rows of data
        with connection.cursor() as cursor:
            cursor.execute(CREATE_PERSONS_TABLE)
            cursor.execute(INSERT_PERSON_RETURN_ID, (name,))
            person_id = cursor.fetchone()[0]
    connection.commit()

    return {"id": person_id, "message": f"Person {name} created."}, 201


@app.route("/api/carbon", methods = ['GET', 'POST'])

def add_carbon():
    if request.method == 'POST':
        return add_carbon()

def add_carbon():
    data = request.get_json()
    carbon = data["carbon"]
    person_id = data["person"]
    try:
        date = datetime.strptime(data["date"], "%m-%d-%Y %H:%M:%S")
    except KeyError:
        date = datetime.now(timezone.utc)

    with connection:
        with connection.cursor() as cursor:
            cursor.execute(CREATE_CARBONS_TABLE)
            cursor.execute(INSERT_CARB, (person_id, carbon, date))
    connection.commit()


    return {"message": "Carbon added."}, 201


@app.route("/api/average", methods = ['GET', 'POST'])

def get_global_avg():
    if request.method == 'GET':
        return get_global_avg()


def get_global_avg():
    with connection:
        with connection.cursor() as cursor:
            cursor.execute(GLOBAL_AVG)
            average = cursor.fetchone()[0]
            cursor.execute(GLOBAL_NUMBER_OF_DAYS)
            days = cursor.fetchone()[0]
    connection.commit()
    
    return {"average": round(average, 2), "days": days}


            

# Define a route and a function for the home page
@app.route("/")
def index():
    return render_template('index.html')


# Run the app
if __name__ == '__main__':
    app.run(debug=True, use_reloader=True)

    