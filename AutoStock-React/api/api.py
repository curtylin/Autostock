from queue import Empty
import random

from flask import Flask, request, jsonify
from flask import send_from_directory
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
import math
import json

# TODO: Move scheduler to another flask service
from apscheduler.schedulers.background import BackgroundScheduler

app = Flask(__name__, static_folder="../public", static_url_path="/")
app.config['CORS_HEADERS'] = 'Content-Type'

# Turn this off if you are working on the scheduler since reload
# will be run and the scheduler will have been executed 2 times
# !!!
# app.run(use_reloader=False)
# !!!


CORS(app)

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
bots_ref = db.collection('bots')

discussions_ref = db.collection('discussions')
threads_ref = db.collection('threads')
comments_ref = db.collection('comments')


@app.errorhandler(404)
@app.route('/', defaults={'e_path': ''})
@app.route('/<path:e_path>')
def catch_all_error(e_path):
    if e_path == "":
        return app.send_static_file('index.html')
    else:
        return send_from_directory(app.static_folder + '/app/[...]/', 'index.html')


@app.route('/', defaults={'u_path': ''})
@app.route('/<path:u_path>')
def catch_all(u_path):
    if u_path == "":
        return app.send_static_file('index.html')
    else:
        return send_from_directory(app.static_folder + '/app/[...]/', 'index.html')


# @app.route('/')
# def index():
#    return app.send_static_file('index.html')
# return send_from_directory(app.static_folder+'/app/[...]/', 'index.html')

@cross_origin()
@app.route('/api/backtest', methods=['POST'])
def backtest():
    try:
        return backtest_driver(request.json)
    except Exception as e:
        return f"An Error Occurred: {e}"
    # return backtest_driver(request.json)


def strategyFactory(entryObj):

    class strategy(bt.Strategy):

        def log(self, txt, dt=None):
            ''' Logging function for this strategy'''
            dt = dt or self.datas[0].datetime.date(0)
           # print('%s, %s' % (dt.isoformat(), txt))

        def __init__(self):
            # Set a value inside the time series
            self.dataclose = self.datas[0].close

            self.sma = bt.indicators.SMA(self.datas[0].close)
            self.ema = bt.indicators.EMA(self.datas[0].close)
            self.accum = bt.indicators.Accum(self.datas[0].close)
            self.ama = bt.indicators.AdaptiveMovingAverage(self.datas[0].close)
            self.alln = bt.indicators.AllN(self.datas[0].close)
            self.anyn = bt.indicators.AnyN(self.datas[0].close)
            self.average = bt.indicators.Average(self.datas[0].close)
            self.bbands = bt.indicators.BollingerBands(self.datas[0].close)
            self.bbandspct = bt.indicators.BollingerBandsPct(self.datas[0].close)
            self.dpo = bt.indicators.DetrendedPriceOscillator(self.datas[0].close)
            self.dma = bt.indicators.DicksonMovingAverage(self.datas[0].close)
            self.dema = bt.indicators.DoubleExponentialMovingAverage(self.datas[0].close)
            self.downday = bt.indicators.DownDay(self.datas[0].close)
            self.downdaybool = bt.indicators.DownDayBool(self.datas[0].close)
            self.downmove = bt.indicators.DownMove(self.datas[0].close)
            self.envelope = bt.indicators.Envelope(self.datas[0].close)  
            self.expsmoothing = bt.indicators.ExponentialSmoothing(self.datas[0].close)
            self.ffih = bt.indicators.FindFirstIndexHighest(self.datas[0].close)
            self.ffil = bt.indicators.FindFirstIndexLowest(self.datas[0].close)
            self.flih = bt.indicators.FindLastIndexHighest(self.datas[0].close)
            self.flil = bt.indicators.FindLastIndexLowest(self.datas[0].close)
            self.highest = bt.indicators.Highest(self.datas[0].close)
            self.hull = bt.indicators.HullMovingAverage(self.datas[0].close)
            self.hurst = bt.indicators.HurstExponent(self.datas[0].close)
            self.kst = bt.indicators.KnowSureThing(self.datas[0].close)
            self.LAGF = bt.indicators.LaguerreFilter(self.datas[0].close)
            self.LRSI = bt.indicators.LaguerreRSI(self.datas[0].close)
            self.low = bt.indicators.Lowest(self.datas[0].close)
            self.macd = bt.indicators.MACD(self.datas[0].close)
            self.macdhisto = bt.indicators.MACDHisto(self.datas[0].close)
            self.meanDev = bt.indicators.MeanDeviation(self.datas[0].close)
            self.momentum = bt.indicators.MomentumOscillator(self.datas[0].close)
            self.pctchange= bt.indicators.PercentChange(self.datas[0].close)
            self.pctrank = bt.indicators.PercentRank(self.datas[0].close)
            self.ppo = bt.indicators.PercentagePriceOscillator(self.datas[0].close)
            self.pposhort = bt.indicators.PercentagePriceOscillatorShort(self.datas[0].close)
            self.priceosc = bt.indicators.PriceOscillator(self.datas[0].close)
            self.rsiema = bt.indicators.RSI_EMA(self.datas[0].close)
            self.rsisma = bt.indicators.RSI_SMA(self.datas[0].close)
            self.rsisafe = bt.indicators.RSI_Safe(self.datas[0].close)
            self.roc = bt.indicators.RateOfChange(self.datas[0].close)
            self.roc100 = bt.indicators.RateOfChange100(self.datas[0].close)
            self.rmi = bt.indicators.RelativeMomentumIndex(self.datas[0].close)
            self.rsi = bt.indicators.RelativeStrengthIndex(self.datas[0].close)
            self.smooth = bt.indicators.SmoothedMovingAverage(self.datas[0].close)
            self.stddev = bt.indicators.StandardDeviation(self.datas[0].close)
            self.sumn = bt.indicators.SumN(self.datas[0].close)
            self.trema = bt.indicators.TripleExponentialMovingAverage(self.datas[0].close)
            self.trix = bt.indicators.Trix(self.datas[0].close)
            self.trixsignal = bt.indicators.TrixSignal(self.datas[0].close)
            self.tsi = bt.indicators.TrueStrengthIndicator(self.datas[0].close)
            self.upday = bt.indicators.UpDay(self.datas[0].close)
            self.updaybool = bt.indicators.UpDayBool(self.datas[0].close)
            self.wa = bt.indicators.WeightedAverage(self.datas[0].close)
            self.wma = bt.indicators.WeightedMovingAverage(self.datas[0].close)
            self.zlema = bt.indicators.ZeroLagExponentialMovingAverage(self.datas[0].close)
            self.zlind = bt.indicators.ZeroLagIndicator(self.datas[0].close)

            self.buylist = []
            self.selllist = []

            if len(entryObj) > 1:
                self.chain = entryObj[1]['chain']
            else:
                self.chain = 'NONE'

            self.indicatorDict = {"NONE": None,
                                  "SMA": self.sma , "EMA": self.ema , "ACCUM": self.accum, "AMA": self.ama, "ALLN": self.alln, "ANYN": self.anyn, "AVERAGE": self.average 
                                   , "BBANDS": self.bbands,"BBANDSPCT": self.bbandspct, "DPO": self.dpo, "DMA": self.dma, "DEMA": self.dema, "DOWND": self.downday,
                                  "DOWNDB": self.downdaybool, "DOWNM": self.downmove, "EVE": self.envelope,"EXPSMOOTH": self.expsmoothing,"FFIH": self.ffih, "FFIL": self.ffil,
                                  "FLIH": self.flih, "FLIL": self.flil, "MAXN": self.highest, "HMA": self.hull, "HURST": self.hurst
                                  , "KST": self.kst, "LAGF": self.LAGF, "LRSI": self.LRSI, "MINN": self.LRSI, "MACD": self.macd, "MACDHISTO": self.macdhisto,
                                  "MEANDEV": self.meanDev, "MOMENTUMOSC": self.momentum, "PCTCHANGE": self.pctchange, "PCTRANK": self.pctrank, "PPO": self.ppo
                                  ,"PPOSHORT": self.pposhort, "PRICEOSC": self.priceosc, "RSIEMA":self.rsiema, "RSISMA":self.rsisma, "RSISAFE":self.rsisafe,
                                  "ROC":self.roc, "ROC100":self.roc100,  "RMI":self.rmi, "RSI":self.rsi, "SMMA":self.smooth, "STDDEV":self.stddev,
                                  "SUMN":self.sumn, "TEMA": self.trema, "TRIX": self.trix, "TRIXSIGNAL": self.trixsignal, "TSI": self.tsi, "UPDAY": self.upday,
                                  "UPDAYBOOL": self.updaybool, "WA": self.wa, "WMA": self.wma, "ZLEMA": self.zlema, "ZLIND": self.zlema}



        def buySell(self, action):
            if action == "buy":
                if self.chain == 'NONE':
                    self.buy()
                else:
                    self.buylist.append(1)
                    self.selllist.append(0)
            elif action == "sell":
                #self.sell()
                if self.chain == 'NONE':
                    self.sell()
                else:
                    self.selllist.append(1)
                    self.buylist.append(0)


        def next(self):
            for buyOrSell in entryObj:
                comparator = buyOrSell["comparator"]
                indicatorOne = buyOrSell["indicatorOne"]
                indicatorTwo = buyOrSell["indicatorTwo"]
                action = buyOrSell["action"]

                todayValue = self.dataclose[0] if indicatorOne == "NONE" else self.indicatorDict[indicatorOne][0]

                yesterdayValue = self.dataclose[-1] if indicatorTwo == "NONE" else self.indicatorDict[indicatorTwo][-1]

                if comparator == "above" and (todayValue > yesterdayValue):
                    self.buySell(action)

                elif comparator == "below" and (todayValue < yesterdayValue):
                    self.buySell(action)
            if(self.chain == "AND"):
                if math.prod(self.buylist) == 1:
                    self.buy()
                if math.prod(self.selllist) == 1:
                    self.sell
            elif(self.chain == "OR"):
                if sum(self.buylist) == 1:
                    self.buy()
                if sum(self.selllist) == 1:
                    self.sell()


    return strategy


def backtest_driver(req):
    dataDict = req

    #print(dataDict)
    entry = dataDict["entry"]
    if entry is None or len(entry) == 0:
        return "Entry is None", 400
    strategy = strategyFactory(entry)

    cerebro = bt.Cerebro()
    cerebro.broker.setcash(dataDict['cash'])
    cerebro.broker.setcommission(commission=0.0)
    cerebro.addstrategy(strategy)

    financeData = bt.feeds.YahooFinanceData(dataname=dataDict['ticker'], fromdate=parse(dataDict['startDate']),
                                            todate=parse(dataDict['endDate']))
    

    cerebro.adddata(financeData)

    response = {}
    response["startingValue"] = cerebro.broker.getvalue()
    cerebro.run()
    response["EndingValue"] = cerebro.broker.getvalue()
    response["PnL"] = response["EndingValue"] - response["startingValue"]
    response["PnLPercent"] = (response["PnL"] / response["startingValue"]) * 100

    # randFileName = f"{str(uuid.uuid4())[:8]}.png"

    # cerebro.plot()[0][0].savefig(randFileName)
    # url = uploadPhoto(randFileName)

    # if os.path.exists(randFileName):
    #     os.remove(randFileName)
    # else:
    #     print("The file does not exist")

    # response["url"] = "https://i.imgur.com/854jut8.jpg"

    return response


@app.route('/api/test')
def test():
    return "this works"


@app.route('/api/list-user', methods=['GET'])
def user_list():
    """
        Gets all users from the database
        read() : Fetches documents from Firestore collection as JSON.
        algorithm : Return document that matches query ID.
    """
    try:
        # Check if ID was passed to URL query
        users = [doc.to_dict() for doc in users_ref.stream()]
        return jsonify(users), 200
    except Exception as e:
        return f"An Error Occured: {e}"


## Be sure to pass in the user id in the url
@app.route('/api/get-user/<id>', methods=['GET'])
def user_read(id):
    """
        id : returns all user information based on the user ID
        read() : Fetches documents from Firestore collection as JSON.
        algorithm : Return document that matches query ID.
    """
    try:
        # Check if ID was passed to URL query
        user = users_ref.document(id).get()
        return jsonify(user.to_dict()), 200
    except Exception as e:
        return f"An Error Occurred: {e}"


## Be sure to pass in the user id in the url
@app.route('/api/check-user/<name>', methods=['GET'])
def user_dupe_check(name):
    """
        Checks if username exists in the database
        read() : Fetches documents from Firestore collection as JSON.
        algorithm : Return document that matches query ID.
    """
    try:
        # Check if ID was passed to URL query
        user = users_ref.where('username', '==', name).stream()
        users = [doc.to_dict() for doc in user]
        if users == []:
            return jsonify({"dupe": False}), 200
        else:
            return jsonify({"dupe": True}), 200
    except Exception as e:
        return f"An Error Occured: {e}"


## Be sure to pass in the algorithm id in the url with the algorithm info you want to change in the JSON that you pass into the body.
@app.route('/api/update-user/<id>', methods=['POST', 'PUT'])
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


@app.route('/api/create-user', methods=['POST'])
def user_create():
    """
        Creates a new user in the database using the ID given.
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
@app.route('/api/create-algorithm', methods=['POST'])
def algo_create():
    """
        create() : Add document to Firestore collection with request body.
        Ensure you pass a custom ID as part of json body in post request,
        e.g. json={'id': '1', 'title': 'Write a blog post'}
    """
    return algo_create_driver(request.json)


def algo_create_driver(req_obj, id=None):
    try:
        if id is not None:
            algorithms_ref.document(id).set(req_obj)
        else:
            algorithms_ref.document().set(req_obj)
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occurred: {e}"


## Returns all public algorithms
@cross_origin()
@app.route('/api/list-algorithm', methods=['GET'])
def algo_read_public():
    """
        read() : Fetches documents from Firestore collection as JSON.
        algorithms : Return all public algorithms.
    """
    try:
        algos = algorithms_ref.where('public', '==', True).stream()
        algorithms = []
        for algo in algos:
            algoDict = algo.to_dict()
            algoDict["id"] = algo.id
            algorithms.append(algoDict)
        return jsonify(algorithms), 200
    except Exception as e:
        return f"An Error Occurred: {e}"


## Be sure to pass in the user id in the url
@app.route('/api/list-algorithm/<id>', methods=['GET'])
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
@app.route('/api/get-algorithm/<id>', methods=['GET'])
def algo_read(id):
    """
        id : is the user id. Gets all algorithms by this user id.
        read() : Fetches documents from Firestore collection as JSON.
        algorithm : Return document that matches query ID.
    """
    try:
        # Check if ID was passed to URL query
        algo = algorithms_ref.document(id).get()
        algoDict = algo.to_dict()
        algoDict["id"] = algo.id
        return jsonify(algoDict), 200
    except Exception as e:
        return f"An Error Occurred: {e}"


## Be sure to pass in the algorithm id in the url with the algorithm info you want to change in the JSON that you pass into the body.
@app.route('/api/update-algorithm/<id>', methods=['POST', 'PUT'])
def algo_update(id):
    try:
        algorithms_ref.document(id).update(request.json)
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occurred: {e}"


def update_algo_after_bt(id, req):
    """
        update() : Update document in Firestore collection with request body.
        Ensure you pass a custom ID as part of json body in post request,
        e.g. json={'id': '1', 'title': 'Write a blog post today'}
    """
    try:
        algorithms_ref.document(id).update(req)
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occurred: {e}"


## Be sure to pass in the algorithm id in the url
@app.route('/api/delete-algorithm/<id>', methods=['GET', 'DELETE'])
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
@app.route('/api/create-competition', methods=['POST'])
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


@app.route('/api/active-to-stale-competition/<id>', methods=['PUT'])
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
@app.route('/api/list-competitions', methods=['GET'])
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

## Returns all competitions
@cross_origin()
@app.route('/api/list-ongoing-competitions', methods=['GET'])
def comp_list_ongoing():
    """
        read() : Fetches documents from Firestore collection as JSON.
        competitions : Return all competitions.
    """
    try:
        activeComps = activeCompetitions_ref.where("competitionLockDate", "<=", str(date.today())).get()
        competitions = []
        for comp in activeComps:
            compDict = comp.to_dict()
            compDict['id'] = comp.id
            compDict['active'] = True
            competitions.append(compDict)
        return jsonify(competitions), 200
    except Exception as e:
        return f"An Error Occurred: {e}"

## Returns all active competitions
@cross_origin()
@app.route('/api/list-active-competitions', methods=['GET'])
def comp_list_all_active():
    """
        read() : Fetches documents from Firestore collection as JSON.
        competitions : Return all competitions.
    """
    try:
        return jsonify(active_comps_list_driver()), 200
    except Exception as e:
        return f"An Error Occurred: {e}"


def active_comps_list_driver():
    """
        read() : Fetches documents from Firestore collection as JSON.
        competitions : Return all competitions.
    """
    comps = activeCompetitions_ref.stream()
    competitions = []
    for comp in comps:
        compDict = comp.to_dict()
        compDict['id'] = comp.id
        compDict['active'] = True
        competitions.append(compDict)
    return competitions


## Returns all stale competitions
@cross_origin()
@app.route('/api/list-stale-competitions', methods=['GET'])
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
@app.route('/api/list-competition/<id>', methods=['GET'])
def comp_info_read_user_id(id):
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


## gives the list of competitions that the user has entered themselves
@app.route('/api/list-entered-competitions/<id>', methods=['GET'])
def comp_read_user_id(id):
    """
        id : is the user id. Gets all competitions entered by this user id.
        read() : Fetches documents from Firestore collection as JSON.
        competitions : Return document(s) that matches query userID.
    """
    try:
        userID = id
        comps = competitors_ref.where("userID", "==", userID).stream()
        competitions = []
        for comp in comps:
            compDict = comp.to_dict()
            competitions.append(compDict["competition"])

        comps = activeCompetitions_ref.stream()
        activeComps = []
        for comp in comps:
            if comp.id in set(competitions):
                compDict = comp.to_dict()
                compDict['id'] = comp.id
                compDict['active'] = True
                activeComps.append(compDict)

        return jsonify(activeComps), 200
    except Exception as e:
        return f"An Error Occurred: {e}"


## gives the list of competitions that the user have not entered
@app.route('/api/list-nonregisted-competitions/<id>', methods=['GET'])
def comp_read_notRegistered_user_id(id):
    """
        id : is the user id. Gets all competitions not entered by this user id.
        read() : Fetches documents from Firestore collection as JSON.
        competitions : Return document(s) that matches query userID.
    """
    try:
        userID = id
        comps = competitors_ref.where("userID", "==", userID).stream()
        enteredCompetitions = []
        for comp in comps:
            compDict = comp.to_dict()
            enteredCompetitions.append(compDict["competition"])

        activeComps = activeCompetitions_ref.stream()
        notEnteredComps = []
        for comp in activeComps:
            if comp.id not in set(enteredCompetitions):
                compDict = comp.to_dict()
                compDict['id'] = comp.id
                notEnteredComps.append(compDict)
        return jsonify(notEnteredComps), 200
    except Exception as e:
        return f"An Error Occurred: {e}"


## Be sure to pass in the competition id in the url
@app.route('/api/get-competition/<id>', methods=['GET'])
def comp_read(id):
    """
        id : is the competition id. Gets all information about competition by this competition id.
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
        compDict['competitiors'] = len(
            [doc.to_dict() for doc in competitors_ref.where("competition", "==", id).stream()])
        return jsonify(compDict), 200
    except Exception as e:
        return f"An Error Occurred: {e}"


##
@app.route('/api/get-discussions/<id>', methods=['GET'])
def disc_read(id):
    """
         id : is the competition id. Gets all discussions by this competition id.
        read() : Fetches documents from Firestore collection as JSON.
        competitions : Return document that matches query ID.
    """
    try:
        # Check if ID was passed to URL query
        disc = discussions_ref.where("compID", "==", id).get()
        discussions = []
        for d in disc:
            disc_Dict = d.to_dict()
            disc_Dict["id"] = d.id
            discussions.append(disc_Dict)
        return jsonify(discussions), 200
    except Exception as e:
        return f"An Error Occurred: {e}"


@app.route('/api/get-threads/<id>', methods=['GET'])
def thread_read(id):
    """
        id : is the thread id.
        read() : Fetches documents from Firestore collection as JSON.
        competitions : Return document that matches query ID.
    """
    try:
        threads = threads_ref.where("compID", "==", id).stream()
        thr = []
        for t in threads:
            thread_Dict = t.to_dict()
            thread_Dict["id"] = t.id
            thr.append(thread_Dict)
        return jsonify(thr), 200
    except Exception as e:
        return f"An Error Occurred: {e}"


@app.route('/api/get-comments/<id>', methods=['GET'])
def comm_read(id):
    """
        id : is the thread id.
        read() : Fetches documents from Firestore collection as JSON.
        competitions : Return document that matches query ID.
    """
    try:
        comm = comments_ref.where("threadID", "==", id).stream()
        comments = []
        for c in comm:
            comm_Dict = c.to_dict()
            comm_Dict["id"] = c.id
            comments.append(comm_Dict)
        return jsonify(comments), 200
    except Exception as e:
        return f"An Error Occurred: {e}"


@app.route('/api/add-comment', methods=['POST'])
def comm_create():
    """
        create() : Add document to Firestore collection with request body.
        Ensure you pass a custom ID as part of json body in post request,
        e.g. json={'id': '1', 'title': 'Write a blog post'}
    """
    try:
        comments_ref.document().set(request.json)
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occurred: {e}"


@app.route('/api/create-thread', methods=['POST'])
def thr_create():
    """
        create() : Add document to Firestore collection with request body.
        Ensure you pass a custom ID as part of json body in post request,
        e.g. json={'id': '1', 'title': 'Write a blog post'}
    """
    try:
        threads_ref.document().set(request.json)
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occurred: {e}"


# make sure to have body content type to application/json
## Be sure to pass in the competition id in the url with the competition info you want to change in the JSON that you pass into the body.
@app.route('/api/update-active-competition/<id>', methods=['POST', 'PUT'])
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


@app.route('/api/update-stale-competition/<id>', methods=['POST', 'PUT'])
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


@app.route('/api/delete-active-competition', methods=['GET', 'DELETE'])
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
@app.route('/api/delete-active-competition/<id>', methods=['GET', 'DELETE'])
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


@app.route('/api/delete-stale-competition/<id>', methods=['GET', 'DELETE'])
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


@app.route('/api/enter-competition', methods=['POST'])
def comp_enter_user():
    """
        Enters user into competition
        read() : Fetches documents from Firestore collection as JSON.
        competitions : Return document(s) that matches query userID.
    """
    return comp_enter_user_driver(request.json)


def comp_enter_user_driver(req_obj):
    try:
        competitors_ref.document().set(req_obj)
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occurred: {e}"


## edits user submitted algorithm in competition
@app.route('/api/edit-competition-algorithm/<id>', methods=['POST', 'PUT'])
def comp_edit_algorithm(id):
    """
        id : is the competitior id. Edits the competitior information by this competitor id.
        read() : Fetches documents from Firestore collection as JSON.
        competitions : Return document(s) that matches query userID.
    """
    try:
        competitors_ref.document(id).update(request.json)
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occurred: {e}"


## Be sure to pass in the competition id in the url
@app.route('/api/unregister-competition/<id>', methods=['GET', 'DELETE'])
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

## Start Bot CRUD Block
@app.route('/api/create-bot', methods=['POST'])
def bot_create():
    """
        create() : Add document to Firestore collection with request body.
        Ensure you pass a custom ID as part of json body in post request,
        e.g. json={'id': '1', 'title': 'Write a blog post'}
    """
    return bot_create_driver(request.json)


def bot_create_driver(req_obj):
    try:
        bots_ref.document(req_obj["userID"]).set(req_obj)
        users_ref.document(req_obj["userID"]).set(req_obj)
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occurred: {e}"


@app.route('/api/list-bots', methods=['GET'])
def bots_list():
    """
        Gets all bots in the collection.
        read() : Fetches documents from Firestore collection as JSON.
    """
    try:
        return jsonify(bots_list_driver()), 200
    except Exception as e:
        return f"An Error Occured: {e}"


def bots_list_driver():
    bots = bots_ref.stream()
    botsList = []
    for bot in bots:
        botDict = bot.to_dict()
        botDict['id'] = bot.id
        botsList.append(botDict)
    return botsList


## Beginning of yahoo Finance information
@app.route('/api/gethighchartdata', methods=['POST'])
def get_highchart_data():
    dataDict = request.json

    try:
        data = yf.download(dataDict['ticker'], dataDict['startDate'], dataDict['endDate'])

        dates = data['Close'].index.tolist()
        closes = list(map(lambda x: round(x, 2), data['Close'].tolist()))
        opens = list(map(lambda x: round(x, 2), data['Open'].tolist()))
        high = list(map(lambda x: round(x, 2), data['High'].tolist()))
        low = list(map(lambda x: round(x, 2), data['Low'].tolist()))

        unixDates = [(time.mktime(parse(str(i)).timetuple())) for i in dates]
        unixDatesWithMS = [int(f"{str(i)[:-2]}000") for i in unixDates]

        dataList = list(zip(unixDatesWithMS, closes, opens, high, low))
        return jsonify(dataList)
    except Exception as e:
        return f"An Error Occurred: {e}"


@app.route('/api/getNews/<ticker>', methods=['GET'])
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


@app.route('/api/getLogo/<ticker>', methods=['GET'])
def get_stock_logo(ticker):
    try:
        return get_stock_logo_driver(ticker)
    except Exception as e:
        return f"An Error Occurred: {e}"


def get_stock_logo_driver(ticker):
    # Check internal cache
    # TODO: Set up cache
    ticker_info = yf.Ticker(ticker)
    return ticker_info.info['logo_url']


@app.route('/api/getInfo/<ticker>', methods=['GET'])
def get_stock_info(ticker):
    return get_stock_info_driver(ticker)


def get_stock_info_driver(ticker):
    try:
        ticker_info = yf.Ticker(ticker)
        return jsonify(ticker_info.info)
    except Exception as e:
        return f"An Error Occurred: {e}"


@app.route('/api/getRecommendations/<ticker>')
def get_stock_recommendations(ticker):
    return get_stock_recommendations_driver(ticker)


def get_stock_recommendations_driver(ticker):
    try:
        ticker_info = yf.Ticker(ticker)
        recommendationDF = ticker_info.recommendations
        # We can add a From Grade if we wanted to
        # firm = recommendationDF['Firm'].tolist()
        recommendation = recommendationDF['To Grade'].tolist()
        # recommendationResult = list(zip(firm, recommendation))

        Buy = recommendation.count('Buy')
        Hold = recommendation.count('Hold')
        Equal_Weight = recommendation.count('Equal-Weight')
        Long_Term_Buy = recommendation.count('Long-Term Buy')
        Market_Perform = recommendation.count('Market Perform')
        Neutral = recommendation.count('Neutral')
        Outperform = recommendation.count('Outperform')
        Overweight = recommendation.count('Overweight')
        Perform = recommendation.count('Perform')
        Sector_Perform = recommendation.count('Sector Perform')
        Sell = recommendation.count('Sell')
        Strong_Buy = recommendation.count('Strong Buy')
        Underperform = recommendation.count('Underperform')
        Underweight = recommendation.count('Underweight')

        result = {
            "labels": ['Buy','Equal-Weight','Hold','Long-Term Buy','Market Perform','Neutral','Outperform','Overweight','Perform','Sector Perform','Sell','Strong Buy','Underperform','Underweight'],
            "datasets": [
                {
                    "label": "Recommendations",
                    "data": [Buy, Equal_Weight, Hold, Long_Term_Buy, Market_Perform, Neutral, Outperform, Overweight, Perform, Sector_Perform, Sell, Strong_Buy, Underperform, Underweight],
                    "backgroundColor": 'rgba(255, 99, 132, 0.2)',
                    "borderColor": 'rgba(255, 99, 132, 1)',
                    "borderWidth": 1,
                }
            ],
        }

        return jsonify(result)
    except Exception as e:
        return f"An Error Occurred: {e}"


@app.route('/api/getStockSplits/<ticker>', methods=['GET'])
def get_stock_splits(ticker):
    return get_stock_splits_driver(ticker)


def get_stock_splits_driver(ticker):
    try:
        ticker_info = yf.Ticker(ticker)
        tickerData = json.loads(ticker_info.splits.to_json())
        dataArray = []
        for dataTime, split in tickerData.items():
            dataArray.append({"name": str(datetime.fromtimestamp(int(dataTime)/1000)), "value": split})

        # Returns back in unix time
        return jsonify(dataArray)
    except Exception as e:
        return f"An Error Occurred: {e}"


@app.route('/api/getStockCalendar/<ticker>', methods=['GET'])
def get_stock_calendar(ticker):
    return get_stock_calendar_driver(ticker)


def get_stock_calendar_driver(ticker):
    try:
        ticker_info = yf.Ticker(ticker)
        # Returns back in unix time
        return ticker_info.calendar.to_json()
    except Exception as e:
        return f"An Error Occurred: {e}"


@app.route('/api/getStockFinancials/<ticker>', methods=['GET'])
def get_stock_financials(ticker):
    return get_stock_financials_driver(ticker)


def get_stock_financials_driver(ticker):
    try:
        ticker_info = yf.Ticker(ticker)
        # Returns back in unix time
        return ticker_info.financials.to_json()
    except Exception as e:
        return f"An Error Occurred: {e}"


@app.route('/api/getStockActions/<ticker>', methods=['GET'])
def get_stock_actions(ticker):
    return get_stock_actions_driver(ticker)


def get_stock_actions_driver(ticker):
    try:
        ticker_info = yf.Ticker(ticker)
        # Returns back in unix time
        return ticker_info.actions.to_json()
    except Exception as e:
        return f"An Error Occurred: {e}"


@app.route('/api/getStockDividends/<ticker>', methods=['GET'])
def get_stock_dividends(ticker):
    return get_stock_dividends_driver(ticker)


def get_stock_dividends_driver(ticker):
    try:
        ticker_info = yf.Ticker(ticker)
        # Returns back in unix time
        return ticker_info.dividends.to_json()
    except Exception as e:
        return f"An Error Occurred: {e}"


@app.route('/api/getQuartFinancials/<ticker>', methods=['GET'])
def get_quart_financials(ticker):
    return get_quart_financials_driver(ticker)


def get_quart_financials_driver(ticker):
    try:
        ticker_info = yf.Ticker(ticker)

        tickerData = json.loads(ticker_info.quarterly_financials.to_json())

        labelsUnix = list(tickerData.keys())
        labels = [str(datetime.fromtimestamp(int(unixTime)/1000)) for unixTime in labelsUnix]

        datasets = []
        nameDict = {}

        nameEntries = list(list(tickerData.values())[0].keys())
        for name in nameEntries:
            nameDict[name] = []

        for financial in tickerData.values():
            for name, value in financial.items():
                nameDict[name].append(value if value is not None else 0)
        for label in nameDict.keys():
            datasets.append({
                    "label": label,
                    "data": nameDict[label],
                    "backgroundColor": "#"+''.join([random.choice('0123456789ABCDEF') for j in range(6)])
                })
        data = {
            "labels": labels,
            "datasets": datasets
        }

        return jsonify(data)
    except Exception as e:
        return f"An Error Occurred: {e}"


@app.route('/api/getQuartEarnings/<ticker>', methods=['GET'])
def get_quart_earnings(ticker):
    return get_quart_earnings_driver(ticker)


def get_quart_earnings_driver(ticker):
    try:
        ticker_info = yf.Ticker(ticker)
        # Returns back in unix time

        tickerData = json.loads(ticker_info.quarterly_earnings.to_json())

        tickerRevenue = tickerData["Revenue"]
        tickerEarnings = tickerData["Earnings"]

        data = {
            "labels": list(tickerRevenue.keys()),
            "datasets": [
                {
                    "label": "Revenue",
                    "data": list(tickerRevenue.values()),
                    "borderColor": 'rgb(255, 99, 132)',
                    "backgroundColor": 'rgba(255, 99, 132, 0.5)'
                },
                {
                    "label": "Earnings",
                    "data": list(tickerEarnings.values()),
                    "borderColor": 'rgb(53, 162, 235)',
                    "backgroundColor": 'rgba(53, 162, 235, 0.5)'
                }
            ]
        }

        return jsonify(data)
    except Exception as e:
        return f"An Error Occurred: {e}"


@app.route('/api/getMajorHolders/<ticker>', methods=['GET'])
def get_major_holders(ticker):
    return get_major_holders_driver(ticker)


def get_major_holders_driver(ticker):
    try:
        ticker_info = yf.Ticker(ticker)

        tickerData = json.loads(ticker_info.major_holders.to_json())
        tickerPercents = tickerData["0"]
        tickerValues = tickerData["1"]

        percents = [float(percent.replace("%","")) for _, percent in tickerPercents.items()]
        values = [content for _, content in tickerValues.items()]

        data = {
            "labels": values,
            "datasets": [
                {
                    "label": "Major Holders",
                    "data": percents,
                    "backgroundColor": [
                        "#"+''.join([random.choice('0123456789ABCDEF') for j in range(6)]),
                        "#"+''.join([random.choice('0123456789ABCDEF') for j in range(6)]),
                        "#"+''.join([random.choice('0123456789ABCDEF') for j in range(6)]),
                        "#"+''.join([random.choice('0123456789ABCDEF') for j in range(6)]),
                    ],
                    "borderColor": [
                        "#"+''.join([random.choice('0123456789ABCDEF') for j in range(6)]),
                        "#"+''.join([random.choice('0123456789ABCDEF') for j in range(6)]),
                        "#"+''.join([random.choice('0123456789ABCDEF') for j in range(6)]),
                        "#"+''.join([random.choice('0123456789ABCDEF') for j in range(6)]),
                    ],
                    "borderWidth": 1
                }
            ]
        }

        return jsonify(data)
    except Exception as e:
        return f"An Error Occurred: {e}"


@app.route('/api/getInstHolders/<ticker>', methods=['GET'])
def get_institutional_holders(ticker):
    return get_institutional_holders_driver(ticker)


def get_institutional_holders_driver(ticker):
    try:
        ticker_info = yf.Ticker(ticker)
        # Returns back in unix time
        return ticker_info.institutional_holders.to_json()
    except Exception as e:
        return f"An Error Occurred: {e}"


@app.route('/api/getBalanceSheet/<ticker>', methods=['GET'])
def get_balance_sheet(ticker):
    return get_balance_sheet_driver(ticker)


def get_balance_sheet_driver(ticker):
    try:
        ticker_info = yf.Ticker(ticker)
        # Returns back in unix time
        return ticker_info.balance_sheet.to_json()
    except Exception as e:
        return f"An Error Occurred: {e}"


@app.route('/api/getQuartBalanceSheet/<ticker>', methods=['GET'])
def get_quartery_balance_sheet(ticker):
    return get_quartery_balance_sheet_driver(ticker)


def get_quartery_balance_sheet_driver(ticker):
    try:
        ticker_info = yf.Ticker(ticker)
        # Returns back in unix time
        return ticker_info.quarterly_balance_sheet.to_json()
    except Exception as e:
        return f"An Error Occurred: {e}"


@app.route('/api/getCashflow/<ticker>', methods=['GET'])
def get_cashflow(ticker):
    return get_cashflow_driver(ticker)


def get_cashflow_driver(ticker):
    try:
        ticker_info = yf.Ticker(ticker)
        # Returns back in unix time
        return ticker_info.cashflow.to_json()
    except Exception as e:
        return f"An Error Occurred: {e}"


@app.route('/api/getQuartCashflow/<ticker>', methods=['GET'])
def get_quart_cashflow(ticker):
    return get_quart_cashflow_driver(ticker)


def get_quart_cashflow_driver(ticker):
    try:
        ticker_info = yf.Ticker(ticker)
        # Returns back in unix time
        return ticker_info.quarterly_cashflow.to_json()
    except Exception as e:
        return f"An Error Occurred: {e}"


@app.route('/api/getEarnings/<ticker>', methods=['GET'])
def get_earnings(ticker):
    return get_earnings_driver(ticker)


def get_earnings_driver(ticker):
    try:
        ticker_info = yf.Ticker(ticker)
        # Returns back in unix time
        return ticker_info.earnings.to_json()
    except Exception as e:
        return f"An Error Occurred: {e}"


@app.route('/api/getSustainability/<ticker>', methods=['GET'])
def get_sustainability(ticker):
    return get_sustainability_driver(ticker)

def typeChekcer(x):
    if x is None:
        return "N/A"
    if isinstance(x, str):
        return x
    if isinstance(x, bool):
        return "Yes" if x else "No"
    else:
        return "N/A"

def get_sustainability_driver(ticker):
    try:
        ticker_info = yf.Ticker(ticker)
        # Returns back in unix time

        tickerJson = ticker_info.sustainability.to_json()
        tickerDict = json.loads(tickerJson)["Value"]

        rows = []
        for key, value in tickerDict.items():
            rows.append({"name":key ,"value": typeChekcer(value)})
        return json.dumps(rows)

    except Exception as e:
        return f"An Error Occurred: {e}"


@app.route('/api/getIsin/<ticker>', methods=['GET'])
def get_isin(ticker):
    return get_isin_driver(ticker)


def get_isin_driver(ticker):
    try:
        ticker_info = yf.Ticker(ticker)
        # Returns back in unix time
        return ticker_info.isin
    except Exception as e:
        return f"An Error Occurred: {e}"


@app.route('/api/getOptions/<ticker>', methods=['GET'])
def get_options(ticker):
    return get_options_driver(ticker)


def get_options_driver(ticker):
    try:
        ticker_info = yf.Ticker(ticker)
        data = []
        for optionDate in list(ticker_info.options):
            data.append({"value": 0, "day": optionDate})

        # Returns back in unix time
        return jsonify(data)
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

randomStockList = ['AAPL', 'TSLA', 'MSFT', 'MRNA', 'MMM', 'GOOG', 'FB', 'AMZN', 'BABA', 'NVDA', 'COIN', 'BYND', 'SHOP',
                   'GME', 'AMC', 'NFLX', 'DIS', 'PTON', 'SPY', 'VOO', 'HLF']

@app.route('/api/generate_comps', methods=['PUT'])
def genComps():
    generateCompetitions()
    return "Competitions Generated Successfully", 200

def generateCompetitions():
    # Datetime is in this format "2020-11-9" "YYYY-MM-DD"
    today = date.today()


    amount_competitions = 2

    randomSubsetTicker = [random.choice(randomStockList) for _ in range(amount_competitions)]
    randomEndTimes = [today + timedelta(days=random.randint(22, 50)) for _ in range(amount_competitions)]
    randomStartTimes = list(map(lambda x: x-timedelta(days=random.randint(220, 420)), randomEndTimes))
    randomInitialStarting = [int(f"1{random.randint(3, 7) * '0'}") for _ in range(amount_competitions)]

    for i in range(amount_competitions):
        close_time = randomEndTimes[i]
        start_time = randomStartTimes[i]
        ticker = randomSubsetTicker[i]
        competition_lock_date = today + timedelta(days=random.randint(7, 21))
        time_diff = str(competition_lock_date - close_time)[1:]

        comp_obj = {
            "competitionLockDate" : str(competition_lock_date), 
            "startDate": str(start_time),
            "endDate": str(close_time),
            "description": f"Submit your algorithm before {str(competition_lock_date)} and compete for the largest gains!",
            "duration": time_diff,
            "name": f"{ticker} {time_diff.split(' ')[0]} Day Comp",
            "startingBalance": randomInitialStarting[i],
            "ticker": ticker,
            "leaderboard": [],  # Should be a list of algorithmIDs, sorted by highest value first
            "logo": get_stock_logo_driver(ticker)  # TODO: Change this to use the cached version instead
        }

        active_comp_create_driver(comp_obj)


def generateBot():
    botsList = [doc.to_dict() for doc in bots_ref.stream()]
    username = "Bot" + str(len(botsList) + 1)
    bot_obj = {
        "username": username,
        "userID": "bot" + str(len(botsList) + 1),
        "bot": True
    }
    bot_create_driver(bot_obj)
    return ("Bot Created: " + username), 200


@app.route('/api/generate_bot', methods=['PUT'])
def generateBotAPI():
    return generateBot()


@app.route('/api/enterBotsComp', methods=['PUT'])
def enterBotsCompAPI():
    return enterBotsIntoComps()


@app.route('/api/fixBotsChaining', methods=['PUT'])
def fixBotsAPI():
    chains= ["AND", "OR"]
    botsList = bots_list_driver()
    for bot in botsList:
        algos = algorithms_ref.where("userID", "==", bot['userID']).stream()
        for algo in algos:
            algoDict = algo.to_dict()
            if len(algoDict["entry"]) == 1:
                continue
            else: 
                for i in range(1, len(algoDict["entry"])):
                    if "chain" not in algoDict["entry"][i]:
                        algoDict["entry"][i]["chain"] = random.choice(chains)
                algorithms_ref.document(algo.id).update(algoDict)
    return "Bots Fixed", 200

def enterBotsIntoComps():
    competitions = active_comps_list_driver()
    botsList = bots_list_driver()

    indicators = ["NONE", "SMA", "EMA", "ACCUM", "AMA", "ALLN", "ANYN", "AVERAGE", "BBANDS", "BBANDSPCT", "DPO", "DMA", "DEMA", "DOWND", "DOWNDB", "DOWNM", "EVE", "EXPSMOOTH", "FFIH", "FFIL", "FLIH", "FLIL", "MAXN", "HMA", "HURST", "KST", "LAGF", "LRSI", "MINN", "MACD", "MACDHISTO", "MEANDEV", "MOMENTUMOSC", "PCTCHANGE", "PCTRANK", "PPO", "PPOSHORT", "PRICEOSC", "RSIEMA", "RSISMA", "RSISAFE", "ROC", "ROC100", "RMI", "RSI", "SMMA", "STDDEV", "SUMN", "TEMA", "TRIX", "TRIXSIGNAL", "TSI", "UPDAY", "UPDAYBOOL", "WA", "WMA", "ZLEMA", "ZLIND"]
    actions = ["buy", "sell"]
    comparators = ["above", "below"]
    chains= ["AND", "OR"]
    newCompetitionsEntered = []
    newAlgosCreated = 0
    reusedAlgos = 0
    newBots = []

    for comp in competitions:
        for bot in botsList:
            competitors = competitors_ref.where("competition", "==", comp['id']).where("userID", "==",
                                                                                       bot['userID']).get()
            if len(competitors) == 0:
                algo = algorithms_ref.where("ticker", "==", comp['ticker']).where("userID", "==", bot['userID']).get()
                algoID = ""
                if len(algo) == 0:
                    algoName = str(bot['username']) + "'s " + str(comp['ticker']) + " Competition Algorithm"
                    entries = []
                    for i in range(random.randint(1, 3)):
                        entry = {
                            "action": random.choice(actions),
                            "indicatorOne": random.choice(indicators),
                            "comparator": random.choice(comparators),
                            "indicatorTwo": random.choice(indicators)
                        }
                        if i > 0:
                            entry["chain"] = random.choice(chains)
                        entries.append(entry)
                    algo = {
                        "name": algoName,
                        "ticker": comp['ticker'],
                        "public": True,
                        "runningTime": "30",
                        "userID": bot['userID'],
                        "PnLPercentage": 0,
                        "entry": entries
                    }
                    algoID = (bot['userID'] + comp['ticker'])
                    algo_create_driver(algo, algoID)
                    newAlgosCreated += 1
                    newCompetitionsEntered.append(algoName + " into " + comp['name'])
                else:
                    algoID = algo[0].id
                    reusedAlgos += 1
                competitor_obj = {
                    "competition": comp['id'],
                    "userID": bot['userID'],
                    "algorithm": algoID
                }
                comp_enter_user_driver(competitor_obj)
                newBots.append(bot['username'])

    newCompsEnteredString = "\n"
    for comp in newCompetitionsEntered:
        newCompsEnteredString += comp + "\n"
    return ("Successfully entered " + str(
        len(set(newBots))) + " new bots into competitions: " + newCompsEnteredString + "\nNew algos created: " + str(
        newAlgosCreated) + "\nReused algos: " + str(reusedAlgos) + " \nTOTAL COMPETITORS ADDED: " + str(
        len(newCompetitionsEntered))), 200


@app.route('/api/findBestUsers', methods=['PUT'])
def findBestUsersAPI():
    return findBestUsers()


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

    today = date.today()
    # For every active competition go through the list of users and find the best performing players
    for competition in competitions:
        if parse(competition['competitionLockDate']).date() > today:
            continue

        competitionId = competition["id"]
        leaderboardList = competition["leaderboard"]
        startDate = competition["startDate"]
        endDate = competition["endDate"]
        startingCash = competition["startingBalance"]

        competitors = competitors_ref.where("competition", "==", competitionId).get()
        competitorsList = []
        for competitor in competitors:
            competitorDict = competitor.to_dict()
            competitorDict["id"] = competitor.id
            competitorsList.append(competitorDict)
        

        leaderboardsPair = []
        for competitor_obj in competitorsList:
            try:
                algo = algorithms_ref.document(competitor_obj["algorithm"]).get()
                algo_dict = algo.to_dict()
                algo_dict["cash"] = startingCash
                algo_dict["id"] = algo.id
                algo_dict["startDate"] = startDate
                algo_dict["endDate"] = str(today)
            except Exception as e:
                return f"An Error Occurred: {e}"

            backtestResults = {"PnLPercent": 0}
            try:
                backtestResults = backtest_driver(algo_dict)
                update_algo_after_bt(algo_dict["id"], {"PnLPercent": backtestResults["PnLPercent"]})
            except Exception as e:
                print(e)
                return f"An Error Occurred: {e}"
            
            competitor_obj["PnLPercent"] = backtestResults["PnLPercent"]
            leaderboardsPair.append((competitor_obj, backtestResults["PnLPercent"]))
        # Update competition with sorted best players
        leaderboardsPair.sort(key=lambda tup: tup[1], reverse=True)
        newLeaderBoard = list(map(lambda x: x[0], leaderboardsPair))
        comp_update_active_driver(competitionId, {"leaderboard": newLeaderBoard})

        # Check out of date competitions and set them as stale
        
        closeDate = parse(competition["endDate"])
        if today > closeDate.date():
            active_to_stale_comp_driver(competitionId)
    return "Successfully Ran Competitions", 200


def scheduleTest():
    print(f"schedule posted at {datetime.now()}")
    generateCompetitions()


scheduler = BackgroundScheduler({'apscheduler.job_defaults.max_instances': 5})
scheduler.add_job(func=generateCompetitions, trigger="interval", days=7)
# scheduler.add_job(func=findBestUsers, trigger="interval", hours=12)

# Need to figure out what server it will be hosted on to get correct market open time
scheduler.add_job(func=findBestUsers, trigger='cron', hour=7, minute=30)
scheduler.add_job(func=findBestUsers, trigger='cron', hour=14)
scheduler.add_job(func=generateBot, trigger="cron", day_of_week=1, hour=8, minute=0)
scheduler.add_job(func=enterBotsIntoComps, trigger="cron", day_of_week=6, hour=8, minute=30)
# scheduler.add_job(func=scheduleTest, trigger='interval', seconds=15)


# CRON jobs for whatever else I need can be set here.

scheduler.start()

atexit.register(lambda: scheduler.shutdown())

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000)
