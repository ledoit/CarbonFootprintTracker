from flask import Flask, request, jsonify
from flask_cors import CORS  # Add this import
from carbon import calculate_results

app = Flask(__name__)
CORS(app)  # Add this line to enable CORS

@app.route('/calculate', methods=['POST'])
def calculate():
    data = request.json
    results = calculate_results(data)
    return jsonify({'results': results})

if __name__ == '__main__':
    app.run(debug=True)