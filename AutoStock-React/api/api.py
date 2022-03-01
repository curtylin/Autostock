from flask import Flask , request, jsonify
import firebase_admin
from firebase_admin import credentials, firestore, initialize_app, storage
from flask_cors import CORS, cross_origin
import backtrader as bt
import json
from datetime import datetime
import time
from dateutil.parser import *
import yfinance as yf
import pandas as pd
import os
import uuid


app = Flask(__name__, static_folder="../build", static_url_path="/")
app.config['CORS_HEADERS'] = 'Content-Type'
cors = CORS(app)

cred = credentials.Certificate("firestore_apikey.json")
# firebase_admin.initialize_app(cred)
default_app = initialize_app(cred, {'storageBucket': 'autostock-fef22.appspot.com'})
db = firestore.client()
algorithms_ref = db.collection('algorithms')
competitions_ref = db.collection('competitions')
competitors_ref = db.collection('competitors')

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
    dataDict = request.json

    try:
        class StrategyTest(bt.SignalStrategy):
         def __init__(self):
            period1 = int(dataDict['Entry'][0]['period1'].split(" ")[1])
            period2 = int(dataDict['Entry'][0]['period2'].split(" ")[1])
            indi = dataDict['Entry'][0]['indicator']

            sma1, sma2 = bt.ind.SMA(period=period1), bt.ind.SMA(period=period2)
           
            indi1, indi2 = sma1, sma2
            if indi == "EMA" or  indi == "DEMA" or indi == "T3" :
                ema1, ema2 = bt.ind.EMA(period=period1), bt.ind.EMA(period=period2)
                if indi == "DEMA" or indi == "T3":
                    ema1, ema2 = (2.0 - ema1 - bt.ind.EMA( period=period1)), (2.0 - ema2 - bt.ind.EMA(period=period2))
                    if indi == "T3":
                        ema1, ema2 = (2.0 - ema1 - bt.ind.EMA( period=period1)), (2.0 - ema2 - bt.ind.EMA(period=period2))

                if dataDict['Entry'][0]['action'] == "buy":
                    close_over_sma1 = self.data.close > sma1
                    close_over_ema1 = self.data.close > ema1
                    close_over_sma2 = self.data.close > sma2
                    close_over_ema2 = self.data.close > ema2
                    sma_ema_diff = sma1 - ema1
                    sma_ema2_diff = sma2 - ema2
                    buy_sig1 = bt.And(close_over_sma1, close_over_ema1, sma_ema_diff > 0)
                    buy_sig2 = bt.And(close_over_sma2, close_over_ema2, sma_ema_diff > 0)
                
                indi1, indi2 = ema1, ema2
            
            if indi == "BBANDS":
                indi1, indi2 = bt.indicators.BollingerBands(period=period1), bt.indicators.BollingerBands(period=period2)
            if indi == "SAR":
                indi1, indi2 = bt.indicators.ParabolicSAR(period=period1), bt.indicators.ParabolicSAR(period=period2)
            
            
            #shouldnt modify indi1, indi2 MA and SMA 
            crossover = bt.ind.CrossOver(indi1, indi2)
            self.signal_add(bt.SIGNAL_LONG, crossover) 
            self.dataclose = self.datas[0].close
            
        def next(self):
            if self.dataclose[0] < self.dataclose[-1]:
                if self.dataclose[-1] < self.dataclose[-2]:
                    self.buy()
                    response["action"] = 'buy'
                else:
                    self.close()
                    response["action"] = 'close'

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
        return f"An Error Occured: {e}"


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
        algorithms_ref.document().set(request.json)
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occured: {e}"

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
        return f"An Error Occured: {e}"

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
        return f"An Error Occured: {e}"

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
        return f"An Error Occured: {e}"

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
        return f"An Error Occured: {e}"

## Might be legacy code.. will probably delete since deleting through URL is probably easier.
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
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occured: {e}"
## End algo CRUD Block
####################################################################################################################
## Start CRUD compeitions block
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
    try:
        competitions_ref.document().set(request.json)
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occured: {e}"

## Returns all competitions
@cross_origin()
@app.route('/list-competitions', methods=['GET'])
def comp_list_all():
    """
        read() : Fetches documents from Firestore collection as JSON.
        competitions : Return all competitions.
    """
    try:
        comps = competitions_ref.stream()
        competitions = []
        for comp in comps:
            compDict = comp.to_dict()
            compDict['id'] = comp.id
            competitions.append(compDict)
        return jsonify(competitions), 200
    except Exception as e:
        return f"An Error Occured: {e}"

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
        competitions = [doc.to_dict() for doc in competitors_ref.where("competitor", "==", userID).stream()]
        # competitions = [doc.to_dict() for doc in competitiors_ref.stream()]
        return jsonify(competitions), 200
    except Exception as e:
        return f"An Error Occured: {e}"

## Be sure to pass in the competition id in the url
@app.route('/get-competition/<id>', methods=['GET'])
def comp_read(id):
    """
        id : is the user id. Gets all algorithms by this user id.
        read() : Fetches documents from Firestore collection as JSON.
        competitions : Return document that matches query ID.
    """
    try:
        # Check if ID was passed to URL query
        competition = competitions_ref.document(id).get()
        compDict = competition.to_dict()
        compDict['id'] = id
        compDict['competitiors'] = len([doc.to_dict() for doc in competitors_ref.where("competition", "==", id).stream()])
        return jsonify(compDict), 200
    except Exception as e:
        return f"An Error Occured: {e}"

# make sure to have body content type to application/json
## Be sure to pass in the competition id in the url with the competition info you want to change in the JSON that you pass into the body.
@app.route('/update-competition/<id>', methods=['POST', 'PUT'])
def comp_update(id):
    """
        update() : Update document in Firestore collection with request body.
        Ensure you pass a custom ID as part of json body in post request,
        e.g. json={'id': '1', 'title': 'Write a blog post today'}
    """
    try:
        competitions_ref.document(id).update(request.json)
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occured: {e}"

## Might be legacy code.. will probably delete since deleting through URL is probably easier.
@app.route('/delete-competition', methods=['GET', 'DELETE'])
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
        return f"An Error Occured: {e}"

## Be sure to pass in the competition id in the url
@app.route('/delete-competition/<id>', methods=['GET', 'DELETE'])
def comp_delete_id(id):
    """
        delete() : Delete a document from Firestore collection.
    """
    try:
        # Check for ID in URL query
        competition_id = id
        competitions_ref.document(competition_id).delete()
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occured: {e}"

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
        return f"An Error Occured: {e}"

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
        return f"An Error Occured: {e}"

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
        return f"An Error Occured: {e}"

## End comp CRUD Block

## Beginning of yahoo Finance information
@app.route('/gethighchartdata', methods=['POST'])
def get_highchart_data():
    dataDict = request.json

    # TODO Handle errors
    try:
        data = yf.download(dataDict['ticker'], dataDict['startDate'], dataDict['endDate'])

        dates = data['Close'].index.tolist()
        closes = data['Close'].tolist()
        unixDates = [(time.mktime(parse(str(i)).timetuple())) for i in dates]
        unixDatesWithMS = [int(f"{str(i)[:-2]}000") for i in unixDates]

        dataList = [[i,j] for i,j in zip(unixDatesWithMS,closes)]

        return jsonify(dataList)
    except Exception as e:
        return f"An Error Occured: {e}"

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
        return f"An Error Occured: {e}"
@app.route('/getLogo/<ticker>', methods=['GET'])
def get_stock_logo(ticker):
    try:
        ticker_info = yf.Ticker(ticker)
        return jsonify(ticker_info.info['logo_url'])
    except Exception as e:
        return f"An Error Occured: {e}"
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