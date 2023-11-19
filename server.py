from flask import Flask, request, jsonify
from carbon import calculate_results

app = Flask(__name__)

@app.route('/calculate', methods=['POST'])
def calculate():
    data = request.json
    results, detailed_results = calculate_results(data)
    return jsonify({'results': results, 'detailed_results': detailed_results})

if __name__ == '__main__':
    app.run(debug=True)
