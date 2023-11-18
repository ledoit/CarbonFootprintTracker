from flask import *

# Create an instance of the Flask class
app = Flask(__name__, static_folder='static')

# Define a route and a function for the home page
@app.route("/")
def index():
    return render_template('index.html')

# Run the app
if __name__ == '__main__':
    app.run(debug=True, use_reloader=True)

    