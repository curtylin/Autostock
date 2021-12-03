from flask import Flask 
import firebase_admin
from firebase_admin import credentials, firestore, initialize_app

app = Flask(__name__, static_folder="../build", static_url_path="/")

cred = credentials.Certificate("firestore_apikey.json")
firebase_admin.initialize_app(cred)
db = firestore.client()
algorithms_ref = db.collection('algorithms')
users_ref = db.collection('users')


@app.errorhandler(404)
def not_found(error):
    return app.send_static_file('index.html')

@app.route('/')
def index():
    return app.send_static_file('index.html')


@app.route('/addAlgorithm', methods=['POST'])
def createAlgorithm(data):
    await db.collection("algorithms").document("one").set(data)
    return 'True'


## Start CRUD algorithm block
## Source code from: https://cloud.google.com/community/tutorials/building-flask-api-with-cloud-firestore-and-deploying-to-cloud-run 
@app.route('/create', methods=['POST'])
def algo_create():
    """
        create() : Add document to Firestore collection with request body.
        Ensure you pass a custom ID as part of json body in post request,
        e.g. json={'id': '1', 'title': 'Write a blog post'}
    """
    try:
        id = request.json['id']
        algorithms_ref.document(id).set(request.json)
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occured: {e}"

@app.route('/listAlgorithms', methods=['GET'])
def algo_read():
    """
        read() : Fetches documents from Firestore collection as JSON.
        todo : Return document that matches query ID.
        all_todos : Return all documents.
    """
    try:
        # Check if ID was passed to URL query
        algorithm_id = request.args.get('id')
        if algorithm_id:
            algorithms = algorithms_ref.document(algorithm_id).get()
            return jsonify(algorithms.to_dict()), 200
        else:
            algorithms = [doc.to_dict() for doc in algorithms.stream()]
            return jsonify(algorithms), 200
    except Exception as e:
        return f"An Error Occured: {e}

@app.route('/update', methods=['POST', 'PUT'])
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

@app.route('/delete', methods=['GET', 'DELETE'])
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


# Start CRUD User block
## Source code from: https://cloud.google.com/community/tutorials/building-flask-api-with-cloud-firestore-and-deploying-to-cloud-run 
@app.route('/user-create', methods=['POST'])
def user_create():
    """
        create() : Add document to Firestore collection with request body.
        Ensure you pass a custom ID as part of json body in post request,
        e.g. json={'id': '1', 'title': 'Write a blog post'}
    """
    try:
        id = request.json['id']
        users_ref.document(id).set(request.json)
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occured: {e}"

@app.route('/list-user', methods=['GET'])
def user_read():
    """
        read() : Fetches documents from Firestore collection as JSON.
        todo : Return document that matches query ID.
        all_todos : Return all documents.
    """
    try:
        # Check if ID was passed to URL query
        user_id = request.args.get('id')
        if user_id:
            user = users_ref.document(user_id).get()
            return jsonify(users_ref.to_dict()), 200
        else:
            user = [doc.to_dict() for doc in user.stream()]
            return jsonify(user), 200
    except Exception as e:
        return f"An Error Occured: {e}

@app.route('/user-update', methods=['POST', 'PUT'])
def user_update():
    """
        update() : Update document in Firestore collection with request body.
        Ensure you pass a custom ID as part of json body in post request,
        e.g. json={'id': '1', 'title': 'Write a blog post today'}
    """
    try:
        id = request.json['id']
        users_ref.document(id).update(request.json)
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occured: {e}"

@app.route('/user-delete', methods=['GET', 'DELETE'])
def user_delete():
    """
        delete() : Delete a document from Firestore collection.
    """
    try:
        # Check for ID in URL query
        user_id = request.args.get('id')
        users_ref.document(user_id).delete()
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occured: {e}"

#End User Block