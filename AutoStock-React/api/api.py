from flask import Flask 

app = Flask(__name__, static_folder="../build", static_url_path="/")

@app.errorhandler(404)
def not_found(error):
    return app.send_static_file('index.html')

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/poggers')
def poggersTest():
    return 'True'