import random

from flask import Flask , request, jsonify
from firebase_admin import credentials, firestore, initialize_app, storage
from flask_cors import CORS, cross_origin
import backtrader as bt
from datetime import datetime
from datetime import timedelta
from datetime import date
import time
from dateutil.parser import *
import yfinance as yf
import os
import uuid
import atexit

# TODO: Move scheduler to another flask service
from apscheduler.schedulers.background import BackgroundScheduler




app = Flask(__name__, static_folder="../build", static_url_path="/")
app.config['CORS_HEADERS'] = 'Content-Type'

# Turn this off if you are working on the scheduler since reload
# will be run and the scheduler will have been executed 2 times
# !!!
# app.run(use_reloader=False)
# !!!


cors = CORS(app)

cred = credentials.Certificate("firestore_apikey.json")
# firebase_admin.initialize_app(cred)
default_app = initialize_app(cred, {'storageBucket': 'autostock-fef22.appspot.com'})
db = firestore.client()
algorithms_ref = db.collection('algorithms')
activeCompetitions_ref = db.collection('activeCompetitions')
staleCompetitions_ref = db.collection('staleCompetitions')
competitions_ref = db.collection('competitions')
competitors_ref = db.collection('competitors')
users_ref = db.collection('users')

@app.errorhandler(404)
def not_found(error):
    # return app.send_static_file('index.html')
    return error

@app.route('/')
def index():
    return app.send_static_file('index.html')

@cross_origin()
@app.route('/backtest', methods=['POST'])
def backtest():
    return backtest_driver(request.json)


def backtest_driver(req):
    dataDict = req

    try:
        class StrategyTest(bt.SignalStrategy):
            def __init__(self):
                sma1, sma2 = bt.ind.SMA(period=10), bt.ind.SMA(period=30)
                crossover = bt.ind.CrossOver(sma1, sma2)
                self.signal_add(bt.SIGNAL_LONG, crossover)


        cerebro = bt.Cerebro()
        cerebro.broker.setcash(dataDict['cash'])
        cerebro.broker.setcommission(commission=0.0)
        cerebro.addstrategy(StrategyTest)

        financeData = bt.feeds.YahooFinanceData(dataname=dataDict['symbol'], fromdate=parse(dataDict['startDate']), todate=parse(dataDict['endDate']))

        cerebro.adddata(financeData)

        response = {}
        response["startingValue"] = cerebro.broker.getvalue()
        cerebro.run()
        response["EndingValue"] = cerebro.broker.getvalue()
        response["PnL"] = response["EndingValue"] - response["startingValue"]
        response["PnLPercent"] = (response["PnL"] / response["startingValue"]) * 100

        randFileName = f"{str(uuid.uuid4())[:8]}.png"

        cerebro.plot()[0][0].savefig(randFileName)
        url = uploadPhoto(randFileName)

        if os.path.exists(randFileName):
            os.remove(randFileName)
        else:
            print("The file does not exist")

        response["url"] = url

        return response
    except Exception as e:
        return f"An Error Occurred: {e}"


@app.route('/test')
def test():
    return "this works"


## Be sure to pass in the user id in the url
@app.route('/get-user/<id>', methods=['GET'])
def user_read(id):
    """
        id : is the user id. Gets all algorithms by this user id.
        read() : Fetches documents from Firestore collection as JSON.
        algorithm : Return document that matches query ID.
    """
    try:
        # Check if ID was passed to URL query
        user = users_ref.document(id).get()
        return jsonify(user.to_dict()), 200
    except Exception as e:
        return f"An Error Occurred: {e}"

## Be sure to pass in the algorithm id in the url with the algorithm info you want to change in the JSON that you pass into the body.
@app.route('/update-user/<id>', methods=['POST', 'PUT'])
def user_update(id):
    """
        update() : Update document in Firestore collection with request body.
        Ensure you pass a custom ID as part of json body in post request,
        e.g. json={'id': '1', 'title': 'Write a blog post today'}
    """
    try:
        users_ref.document(id).update(request.json)
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occurred: {e}"

@app.route('/create-user', methods=['POST'])
def user_create():
    """
        update() : Update document in Firestore collection with request body.
        Ensure you pass a custom ID as part of json body in post request,
        e.g. json={'id': '1', 'title': 'Write a blog post today'}
    """
    try:
        users_ref.document(request.json["userID"]).set(request.json)
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occurred: {e}"

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
        algorithms_ref.document().set(request.json)
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occurred: {e}"

## Returns all public algorithms
@cross_origin()
@app.route('/list-algorithm', methods=['GET'])
def algo_read_public():
    """
        read() : Fetches documents from Firestore collection as JSON.
        algorithms : Return all public algorithms.
    """
    try:
        algorithms = [doc.to_dict() for doc in algorithms_ref.where("public", "==", True).stream()]
        return jsonify(algorithms), 200
    except Exception as e:
        return f"An Error Occurred: {e}"

## Be sure to pass in the user id in the url
@app.route('/list-algorithm/<id>', methods=['GET'])
def algo_read_user_id(id):
    """
        id : is the user id. Gets all algorithms by this user id.
        read() : Fetches documents from Firestore collection as JSON.
        algorithms : Return document(s) that matches query userID.
    """
    try:
        # Check if ID was passed to URL query
        # id = request.args.get('id')
        userID = id
        algos = algorithms_ref.where("userID", "==", userID).stream()
        algorithms = []
        for algo in algos:
            algoDict = algo.to_dict()
            algoDict['id'] = algo.id
            algorithms.append(algoDict)
        return jsonify(algorithms), 200
    except Exception as e:
        return f"An Error Occurred: {e}"

## Be sure to pass in the user id in the url
@app.route('/get-algorithm/<id>', methods=['GET'])
def algo_read(id):
    """
        id : is the user id. Gets all algorithms by this user id.
        read() : Fetches documents from Firestore collection as JSON.
        algorithm : Return document that matches query ID.
    """
    try:
        # Check if ID was passed to URL query
        algorithm = algorithms_ref.document(id).get()
        return jsonify(algorithm.to_dict()), 200
    except Exception as e:
        return f"An Error Occurred: {e}"

## Be sure to pass in the algorithm id in the url with the algorithm info you want to change in the JSON that you pass into the body.
@app.route('/update-algorithm/<id>', methods=['POST', 'PUT'])
def algo_update(id):
    """
        update() : Update document in Firestore collection with request body.
        Ensure you pass a custom ID as part of json body in post request,
        e.g. json={'id': '1', 'title': 'Write a blog post today'}
    """
    try:
        algorithms_ref.document(id).update(request.json)
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occurred: {e}"

## Be sure to pass in the algorithm id in the url
@app.route('/delete-algorithm/<id>', methods=['GET', 'DELETE'])
def algo_delete_id(id):
    """
        delete() : Delete a document from Firestore collection.
    """
    try:
        # Check for ID in URL query
        algorithm_id = id
        algorithms_ref.document(algorithm_id).delete()

        if not comp_unregister_competition_algorithm(id):
            raise Exception("Could not unregister algorithm from competition")
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occurred: {e}"

def comp_unregister_competition_algorithm(algoID):
    """
        delete() : Delete a document from Firestore collection.
    """
    try:
        matchingCompsWithAlgo = competitors_ref.where("algorithm", "==", algoID).stream()       
        for matchingComp in matchingCompsWithAlgo:
            competitors_ref.document(matchingComp.id).delete()
        return True
    except Exception as e:
        return f"An Error Occurred: {e}"

## End algo CRUD Block
####################################################################################################################
## Start CRUD competitions block
## Source code from: https://cloud.google.com/community/tutorials/building-flask-api-with-cloud-firestore-and-deploying-to-cloud-run
## https://dev.to/alexmercedcoder/basics-of-building-a-crud-api-with-flask-or-fastapi-4h70
# make sure to have body content type to application/json
@app.route('/create-competition', methods=['POST'])
def comp_create():
    """
        create() : Add document to Firestore collection with request body.
        Ensure you pass a custom ID as part of json body in post request,
        e.g. json={'id': '1', 'title': 'Write a blog post'}
    """
    return active_comp_create_driver(request.json)

def active_comp_create_driver(req_obj):
    try:
        activeCompetitions_ref.document().set(req_obj)
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occurred: {e}"

def stale_comp_create_driver(id, req_obj):
    try:
        staleCompetitions_ref.document(id).set(req_obj)
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occurred: {e}"

@app.route('/active-to-stale-competition/<id>', methods=['PUT'])
def active_to_stale_comp(id):
    return active_to_stale_comp_driver(id)

def active_to_stale_comp_driver(id):
    try:
        competition = activeCompetitions_ref.document(id).get()
        if competition.to_dict() == None:
            raise Exception("Competition not found")
        activeCompetitions_ref.document(id).delete()
        staleCompetitions_ref.document(id).set(competition.to_dict())
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occurred: {e}"



## Returns all competitions
@cross_origin()
@app.route('/list-competitions', methods=['GET'])
def comp_list_all():
    """
        read() : Fetches documents from Firestore collection as JSON.
        competitions : Return all competitions.
    """
    try:
        activeComps = activeCompetitions_ref.stream()
        staleComps = staleCompetitions_ref.stream()
        competitions = []
        for comp in activeComps:
            compDict = comp.to_dict()
            compDict['id'] = comp.id
            compDict['active'] = True
            competitions.append(compDict)
        for comp in staleComps:
            compDict = comp.to_dict()
            compDict['id'] = comp.id
            compDict['active'] = False
            competitions.append(compDict)
        return jsonify(competitions), 200
    except Exception as e:
        return f"An Error Occurred: {e}"

## Returns all active competitions
@cross_origin()
@app.route('/list-active-competitions', methods=['GET'])
def comp_list_all_active():
    """
        read() : Fetches documents from Firestore collection as JSON.
        competitions : Return all competitions.
    """
    try:
        comps = activeCompetitions_ref.stream()
        competitions = []
        for comp in comps:
            compDict = comp.to_dict()
            compDict['id'] = comp.id
            compDict['active'] = True
            competitions.append(compDict)
        return jsonify(competitions), 200
    except Exception as e:
        return f"An Error Occurred: {e}"

## Returns all stale competitions
@cross_origin()
@app.route('/list-stale-competitions', methods=['GET'])
def comp_list_all_stale():
    """
        read() : Fetches documents from Firestore collection as JSON.
        competitions : Return all competitions.
    """
    try:
        comps = staleCompetitions_ref.stream()
        competitions = []
        for comp in comps:
            compDict = comp.to_dict()
            compDict['id'] = comp.id
            compDict['active'] = False
            competitions.append(compDict)
        return jsonify(competitions), 200
    except Exception as e:
        return f"An Error Occurred: {e}"

## gives the list of competitions that the user has entered themselves
@app.route('/list-competition/<id>', methods=['GET'])
def comp_read_user_id(id):
    """
        id : is the user id. Gets all algorithms by this user id.
        read() : Fetches documents from Firestore collection as JSON.
        competitions : Return document(s) that matches query userID.
    """
    try:
        # Check if ID was passed to URL query
        # id = request.args.get('id')
        userID = id
        comps = competitors_ref.where("userID", "==", userID).stream()
        competitions = []
        for comp in comps:
            compDict = comp.to_dict()
            compDict['id'] = comp.id
            competitions.append(compDict)
        return jsonify(competitions), 200
    except Exception as e:
        return f"An Error Occurred: {e}"

# ## gives the list of competitions that the user has entered themselves
# @app.route('/get-competition-user/<id>', methods=['GET'])
# def competition_read_user_id(id):
#     """
#         id : is the user id. Gets all algorithms by this user id.
#         read() : Fetches documents from Firestore collection as JSON.
#         competitions : Return document(s) that matches query userID.
#     """
#     try:
#         # Check if ID was passed to URL query
#         # id = request.args.get('id')
#         userID = id
#         competitions = [doc.to_dict() for doc in competitors_ref.where("userID", "==", userID).stream()]
#         # competitions = [doc.to_dict() for doc in competitiors_ref.stream()]
#         return jsonify(competitions), 200
#     except Exception as e:
#         return f"An Error Occurred: {e}"

## Be sure to pass in the competition id in the url
@app.route('/get-competition/<id>', methods=['GET'])
def comp_read(id):
    """
        id : is the competition id. Gets all algorithms by this competition id.
        read() : Fetches documents from Firestore collection as JSON.
        competitions : Return document that matches query ID.
    """
    try:
        # Check if ID was passed to URL query
        competition = activeCompetitions_ref.document(id).get()
        if competition.to_dict() == None:
            competition = staleCompetitions_ref.document(id).get()
        if competition.to_dict() == None:
            raise Exception("Competition not found")
        compDict = competition.to_dict()
        compDict['id'] = id
        compDict['competitiors'] = len([doc.to_dict() for doc in competitors_ref.where("competition", "==", id).stream()])
        return jsonify(compDict), 200
    except Exception as e:
        return f"An Error Occurred: {e}"

# make sure to have body content type to application/json
## Be sure to pass in the competition id in the url with the competition info you want to change in the JSON that you pass into the body.
@app.route('/update-active-competition/<id>', methods=['POST', 'PUT'])
def comp_update_active(id):
    """
        update() : Update document in Firestore collection with request body.
        Ensure you pass a custom ID as part of json body in post request,
        e.g. json={'id': '1', 'title': 'Write a blog post today'}
    """
    return comp_update_active_driver(id, request.json)

def comp_update_active_driver(id, req):
    try:
        activeCompetitions_ref.document(id).update(req)
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occurred: {e}"

@app.route('/update-stale-competition/<id>', methods=['POST', 'PUT'])
def comp_update_stale(id):
    """
        update() : Update document in Firestore collection with request body.
        Ensure you pass a custom ID as part of json body in post request,
        e.g. json={'id': '1', 'title': 'Write a blog post today'}
    """
    try:
        staleCompetitions_ref.document(id).update(request.json)
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occurred: {e}"

## Might be legacy code.. will probably delete since deleting through URL is probably easier.
@app.route('/delete-active-competition', methods=['GET', 'DELETE'])
def comp_delete():
    """
        delete() : Delete a document from Firestore collection.
    """
    try:
        # Check for ID in URL query
        competition_id = request.args.get('id')
        competitions_ref.document(competition_id).delete()
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occurred: {e}"

## Be sure to pass in the competition id in the url
@app.route('/delete-active-competition/<id>', methods=['GET', 'DELETE'])
def comp_delete_active_id(id):
    """
        delete() : Delete a document from Firestore collection.
    """
    try:
        # Check for ID in URL query
        competition_id = id
        activeCompetitions_ref.document(competition_id).delete()
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occurred: {e}"

@app.route('/delete-stale-competition/<id>', methods=['GET', 'DELETE'])
def comp_delete_stale_id(id):
    """
        delete() : Delete a document from Firestore collection.
    """
    try:
        # Check for ID in URL query
        competition_id = id
        staleCompetitions_ref.document(competition_id).delete()
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occurred: {e}"

## enters user into competition
@app.route('/enter-competition', methods=['POST'])
def comp_enter_user():
    """
        id : is the user id. Gets all algorithms by this user id.
        read() : Fetches documents from Firestore collection as JSON.
        competitions : Return document(s) that matches query userID.
    """
    try:
        competitors_ref.document().set(request.json)
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occurred: {e}"

## edits user submitted algorithm in competition
@app.route('/edit-competition-algorithm/<id>', methods=['POST', 'PUT'])
def comp_edit_algorithm(id):
    """
        id : is the user id. Gets all algorithms by this user id.
        read() : Fetches documents from Firestore collection as JSON.
        competitions : Return document(s) that matches query userID.
    """
    try:
        competitors_ref.document(id).update(request.json)
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occurred: {e}"

## Be sure to pass in the competition id in the url
@app.route('/unregister-competition/<id>', methods=['GET', 'DELETE'])
def comp_unregister_competition(id):
    """
        delete() : Delete a document from Firestore collection.
    """
    try:
        # Check for ID in URL query
        competition_id = id
        competitors_ref.document(competition_id).delete()
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occurred: {e}"

## End comp CRUD Block

## Beginning of yahoo Finance information
@app.route('/gethighchartdata', methods=['POST'])
def get_highchart_data():
    dataDict = request.json

    try:
        data = yf.download(dataDict['ticker'], dataDict['startDate'], dataDict['endDate'])

        dates = data['Close'].index.tolist()
        closes = list(map(lambda x: round(x,2), data['Close'].tolist()))

        unixDates = [(time.mktime(parse(str(i)).timetuple())) for i in dates]
        unixDatesWithMS = [int(f"{str(i)[:-2]}000") for i in unixDates]

        dataList = [[i,j] for i,j in zip(unixDatesWithMS,closes)]

        return jsonify(dataList)
    except Exception as e:
        return f"An Error Occurred: {e}"

@app.route('/getNews/<ticker>', methods=['GET'])
def get_yahoo_news(ticker):
    try:
        ticker_info = yf.Ticker(ticker)
        listOfNews = []
        for i in ticker_info.news:
            newDict = {}
            newDict["title"] = i["title"]
            newDict["publisher"] = i["publisher"]
            newDict["link"] = i["link"]
            listOfNews.append(newDict)
        return jsonify(listOfNews)
    except Exception as e:
        return f"An Error Occurred: {e}"
@app.route('/getLogo/<ticker>', methods=['GET'])
def get_stock_logo(ticker):

    return get_stock_logo_driver(ticker)

def get_stock_logo_driver(ticker):
    # Check internal cache
    # TODO: Set up cache

    try:
        ticker_info = yf.Ticker(ticker)
        return jsonify(ticker_info.info['logo_url'])
    except Exception as e:
        return f"An Error Occurred: {e}"

@app.route('/getInfo/<ticker>', methods=['GET'])
def get_stock_info(ticker):
    return get_stock_info_driver(ticker)
def get_stock_info_driver(ticker):
    try:
        ticker_info = yf.Ticker(ticker)
        return jsonify(ticker_info.info)
    except Exception as e:
        return f"An Error Occurred: {e}"


## END yahoo finance information

## Begin Helper functions

def uploadPhoto(filename):
    """
        uploadPhoto() : Uploads a photo to Cloud Storage.
        filename : is the name of the file to be uploaded.
    """
    try:
        # Get the bucket that the file will be uploaded to
        bucket = storage.bucket()

        # Create a new blob and upload the file's content
        blob = bucket.blob(filename)
        blob.upload_from_filename(filename)


        # Make the blob publicly viewable
        blob.make_public()

        # Create a public URL
        url = blob.public_url

        return url
    except Exception as e:
        return f"An Error Occured: {e}"

## Schedule jobs

randomStockList = ['AAPL', 'TSLA', 'MSFT', 'MRNA', 'MMM', 'GOOG', 'FB', 'AMZN', 'BABA', 'NVDA', 'COIN', 'BYND', 'SHOP', 'GME', 'AMC', 'NFLX', 'DIS', 'PTON', 'SPY', 'VOO']

def generateCompetitions():
    # Datetime is in this format "2020-11-9" "YYYY-MM-DD"
    today = date.today()

    amount_competitions = 5

    randomSubsetTicker = [random.choice(randomStockList) for _ in range(amount_competitions)]
    randomTimes = [today + timedelta(days=random.randint(3,30)) for _ in range(amount_competitions)]
    randomInitialStarting = [ int( f"1{random.randint(3,7) * '0'}" ) for _ in range(amount_competitions)]

    for i in range(amount_competitions):
        close_time = randomTimes[i]
        ticker = randomSubsetTicker[i]
        time_diff = str(close_time - today)

        comp_obj = {
            "closeDate": close_time,
            "description": f"Submit your algorithm before {str(close_time)} and compete for the largest gains!",
            "duration": time_diff,
            "name": f"{ticker} {time_diff.split(' ')[0]} Day Battle",
            "startingBalance": randomInitialStarting[i],
            "ticker": ticker,
            "leaderboard": [], # Should be a list of algorithmIDs, sorted by highest value first
            "logo": get_stock_logo(ticker) # TODO: Change this to use the cached version instead
            }

        active_comp_create_driver(comp_obj)


def findBestUsers():
    competitions = []
    try:
        comps = activeCompetitions_ref.stream()
        for comp in comps:
            compDict = comp.to_dict()
            compDict['id'] = comp.id
            compDict['active'] = True
            competitions.append(compDict)
    except Exception as e:
        return f"An Error Occurred: {e}"

    # For every active competition go through the list of users and find the best performing players
    for competition in competitions:
        competitionId = competition.id
        leaderboardList = competition.leaderboard
        leaderboardsPair = []
        for algoId in leaderboardList:
            try:
                algorithm = algorithms_ref.document(algoId).get()
            except Exception as e:
                return f"An Error Occurred: {e}"
            leaderboardsPair.append((algoId, backtest_driver(algorithm)["PnL"]))
        # Update competition with sorted best players
        leaderboardsPair.sort(key=lambda tup: tup[1])
        newLeaderBoard = list(map(lambda x: x[0], leaderboardsPair))
        comp_update_active_driver(competitionId, {"leaderboard": newLeaderBoard})

        # Check out of date competitions and set them as stale
        today = date.today()
        closeDate = parse(competition.closeDate)
        if today > closeDate:
            active_to_stale_comp_driver(competitionId)


def scheduleTest():
    print(f"schedule posted at {datetime.now()}")

scheduler = BackgroundScheduler()
scheduler.add_job(func=generateCompetitions, trigger="interval", days=7)
# scheduler.add_job(func=findBestUsers, trigger="interval", hours=12)

# Need to figure out what server it will be hosted on to get correct market open time
scheduler.add_job(func=findBestUsers, trigger='cron', hour=7, minute=30)
scheduler.add_job(func=findBestUsers, trigger='cron', hour=14)
# scheduler.add_job(func=scheduleTest, trigger='interval', seconds=2)



# CRON jobs for whatever else I need can be set here.

scheduler.start()

atexit.register(lambda: scheduler.shutdown())