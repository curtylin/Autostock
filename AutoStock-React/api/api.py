from flask import Flask , request, jsonify
import firebase_admin
from firebase_admin import credentials, firestore, initialize_app

app = Flask(__name__, static_folder="../build", static_url_path="/")

cred = credentials.Certificate("firestore_apikey.json")
# firebase_admin.initialize_app(cred)
default_app = initialize_app(cred)
db = firestore.client()
algorithms_ref = db.collection('algorithms')

@app.errorhandler(404)
def not_found(error):
    # return app.send_static_file('index.html')
    return error

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/test')
def test():
    return "this works"

## Start CRUD algorithm block
## Source code from: https://cloud.google.com/community/tutorials/building-flask-api-with-cloud-firestore-and-deploying-to-cloud-run 
## https://dev.to/alexmercedcoder/basics-of-building-a-crud-api-with-flask-or-fastapi-4h70
@app.route('/create-algorithm', methods=['POST'])
def algo_create():
    """
        create() : Add document to Firestore collection with request body.
        Ensure you pass a custom ID as part of json body in post request,
        e.g. json={'id': '1', 'title': 'Write a blog post'}
    """
    try:
        data = request.json
        # print(data)
        algorithms_ref.document(data).set(request.json)
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occured: {e}"

@app.route('/list-algorithm', methods=['GET'])
def algo_read():
    """
        read() : Fetches documents from Firestore collection as JSON.
        todo : Return document that matches query ID.
        all_todos : Return all documents.
    """
    try:
        # Check if ID was passed to URL query
        id = request.args.get('id')
        if id:
            algorithms = algorithms_ref.document(userID).get()
            return jsonify(todo.to_dict()), 200
        else:
            algorithms = [doc.to_dict() for doc in algorithms_ref.stream()]
            return jsonify(algorithms), 200
    except Exception as e:
        return f"An Error Occured: {e}"

@app.route('/list-algorithm/<id>', methods=['GET'])
def algo_read_user_id(id):
    """
        read() : Fetches documents from Firestore collection as JSON.
        todo : Return document that matches query ID.
        all_todos : Return all documents.
    """
    try:
        # Check if ID was passed to URL query
        # id = request.args.get('id')
        if id:
            userID = id
            algorithms = [doc.to_dict() for doc in algorithms_ref.where("userID", "==", userID).stream()]
            return jsonify(algorithms), 200
        else:
            algorithms = [doc.to_dict() for doc in algorithms_ref.stream()]
            return jsonify(algorithms), 200
    except Exception as e:
        return f"An Error Occured: {e}"

@app.route('/update-algorithm', methods=['POST', 'PUT'])
def algo_update():
    """
        update() : Update document in Firestore collection with request body.
        Ensure you pass a custom ID as part of json body in post request,
        e.g. json={'id': '1', 'title': 'Write a blog post today'}
    """
    try:
        id = request.json['id']
        algorithms_ref.document(id).update(request.json)
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occured: {e}"

@app.route('/delete-algorithm', methods=['GET', 'DELETE'])
def algo_delete():
    """
        delete() : Delete a document from Firestore collection.
    """
    try:
        # Check for ID in URL query
        algorithm_id = request.args.get('id')
        algorithms_ref.document(algorithm_id).delete()
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occured: {e}"
## End algo CRUD Block
