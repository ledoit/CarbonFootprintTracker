from flask import Flask, render_template, request
import carbon_data_generator

app = Flask(__name__, template_folder="templates")

database = []

@app.route("/")
def hello():
    return render_template('index.html')


@app.route('/process', methods=['POST'])
def process():
    name = request.form.get('name')
    origin = request.form.get('origin')
    destination = request.form.get('destination')
    transit = request.form.get('transit')
    frequency = request.form.get('freq')

    # process the data using Python code
    todo_item = [name, origin, destination, transit, frequency]
    database.append(todo_item)
    print(database)

    return '200'

@app.route('/delete', methods=['POST'])
def delete():
    name = request.form.get('name')
    print(name)
    for item in database:
        if item[0] == name:
            database.remove(item)
    print(database)
    return '200'

@app.route('/generate', methods=['POST'])
def generate():
    return carbon_data_generator.calculate_results(database)

if __name__ == '__main__':
    app.run(debug=True)
