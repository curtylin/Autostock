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
@app.route('/backtest', methods=['POST'])
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
                self.buy()
            elif action == "sell":
                self.sell()

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

    return strategy


def backtest_driver(req):
    dataDict = req

    print(dataDict)
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

    response["url"] = "https://i.imgur.com/854jut8.jpg"

    return response


@app.route('/test')
def test():
    return "this works"


@app.route('/list-user', methods=['GET'])
def user_list():
    """
        id : is the user id. Gets all algorithms by this user id.
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


## Be sure to pass in the user id in the url
@app.route('/check-user/<name>', methods=['GET'])
def user_dupe_check(name):
    """
        id : is the user id. Gets all algorithms by this user id.
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
@app.route('/list-algorithm', methods=['GET'])
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
        algo = algorithms_ref.document(id).get()
        algoDict = algo.to_dict()
        algoDict["id"] = algo.id
        return jsonify(algoDict), 200
    except Exception as e:
        return f"An Error Occurred: {e}"


## Be sure to pass in the algorithm id in the url with the algorithm info you want to change in the JSON that you pass into the body.
@app.route('/update-algorithm/<id>', methods=['POST', 'PUT'])
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
        return jsonify(active_comps_list_driver()), 200
    except Exception as e:
        return f"An Error Occurred: {e}"


def active_comps_list_driver():
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
@app.route('/list-entered-competitions/<id>', methods=['GET'])
def comp_read_user_id(id):
    """
        id : is the user id. Gets all algorithms by this user id.
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
@app.route('/list-nonregisted-competitions/<id>', methods=['GET'])
def comp_read_notRegistered_user_id(id):
    """
        id : is the user id. Gets all algorithms by this user id.
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
        compDict['competitiors'] = len(
            [doc.to_dict() for doc in competitors_ref.where("competition", "==", id).stream()])
        return jsonify(compDict), 200
    except Exception as e:
        return f"An Error Occurred: {e}"


##
@app.route('/get-discussions/<id>', methods=['GET'])
def disc_read(id):
    """
         id : is the competition id. Gets all algorithms by this competition id.
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


@app.route('/get-threads/<id>', methods=['GET'])
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


@app.route('/get-comments/<id>', methods=['GET'])
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


@app.route('/add-comment', methods=['POST'])
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


@app.route('/create-thread', methods=['POST'])
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
    return comp_enter_user_driver(request.json)


def comp_enter_user_driver(req_obj):
    try:
        competitors_ref.document().set(req_obj)
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

## Start Bot CRUD Block
@app.route('/create-bot', methods=['POST'])
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


@app.route('/list-bots', methods=['GET'])
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
@app.route('/gethighchartdata', methods=['POST'])
def get_highchart_data():
    dataDict = request.json

    try:
        data = yf.download(dataDict['ticker'], dataDict['startDate'], dataDict['endDate'])

        dates = data['Close'].index.tolist()
        closes = list(map(lambda x: round(x, 2), data['Close'].tolist()))

        unixDates = [(time.mktime(parse(str(i)).timetuple())) for i in dates]
        unixDatesWithMS = [int(f"{str(i)[:-2]}000") for i in unixDates]

        dataList = [[i, j] for i, j in zip(unixDatesWithMS, closes)]

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
    try:
        return get_stock_logo_driver(ticker)
    except Exception as e:
        return f"An Error Occurred: {e}"


def get_stock_logo_driver(ticker):
    # Check internal cache
    # TODO: Set up cache
    ticker_info = yf.Ticker(ticker)
    return ticker_info.info['logo_url']


@app.route('/getInfo/<ticker>', methods=['GET'])
def get_stock_info(ticker):
    return get_stock_info_driver(ticker)


def get_stock_info_driver(ticker):
    try:
        ticker_info = yf.Ticker(ticker)
        return jsonify(ticker_info.info)
    except Exception as e:
        return f"An Error Occurred: {e}"


@app.route('/getRecommendations/<ticker>')
def get_stock_recommendations(ticker):
    return get_stock_recommendations_driver(ticker)


def get_stock_recommendations_driver(ticker):
    try:
        ticker_info = yf.Ticker(ticker)

        ticker_info.recommendations.to_json()

        recommendationDF = ticker_info.recommendations
        # We can add a From Grade if we wanted to
        firm = recommendationDF['Firm'].tolist()
        recommendation = recommendationDF['To Grade'].tolist()
        recommendationResult = dict(zip(firm, recommendation))

        return jsonify(recommendationResult)
    except Exception as e:
        return f"An Error Occurred: {e}"


@app.route('/getStockSplits/<ticker>', methods=['GET'])
def get_stock_splits(ticker):
    return get_stock_splits_driver(ticker)


def get_stock_splits_driver(ticker):
    try:
        ticker_info = yf.Ticker(ticker)
        # Returns back in unix time
        return ticker_info.splits.to_json()
    except Exception as e:
        return f"An Error Occurred: {e}"


@app.route('/getStockCalendar/<ticker>', methods=['GET'])
def get_stock_calendar(ticker):
    return get_stock_calendar_driver(ticker)


def get_stock_calendar_driver(ticker):
    try:
        ticker_info = yf.Ticker(ticker)
        # Returns back in unix time
        return ticker_info.calendar.to_json()
    except Exception as e:
        return f"An Error Occurred: {e}"


@app.route('/getStockFinancials/<ticker>', methods=['GET'])
def get_stock_financials(ticker):
    return get_stock_financials_driver(ticker)


def get_stock_financials_driver(ticker):
    try:
        ticker_info = yf.Ticker(ticker)
        # Returns back in unix time
        return ticker_info.financials.to_json()
    except Exception as e:
        return f"An Error Occurred: {e}"


@app.route('/getStockActions/<ticker>', methods=['GET'])
def get_stock_actions(ticker):
    return get_stock_actions_driver(ticker)


def get_stock_actions_driver(ticker):
    try:
        ticker_info = yf.Ticker(ticker)
        # Returns back in unix time
        return ticker_info.actions.to_json()
    except Exception as e:
        return f"An Error Occurred: {e}"


@app.route('/getStockDividends/<ticker>', methods=['GET'])
def get_stock_dividends(ticker):
    return get_stock_dividends_driver(ticker)


def get_stock_dividends_driver(ticker):
    try:
        ticker_info = yf.Ticker(ticker)
        # Returns back in unix time
        return ticker_info.dividends.to_json()
    except Exception as e:
        return f"An Error Occurred: {e}"


@app.route('/getQuartFinancials/<ticker>', methods=['GET'])
def get_quart_financials(ticker):
    return get_quart_financials_driver(ticker)


def get_quart_financials_driver(ticker):
    try:
        ticker_info = yf.Ticker(ticker)
        # Returns back in unix time
        return ticker_info.quarterly_financials.to_json()
    except Exception as e:
        return f"An Error Occurred: {e}"


@app.route('/getQuartEarnings/<ticker>', methods=['GET'])
def get_quart_earnings(ticker):
    return get_quart_earnings_driver(ticker)


def get_quart_earnings_driver(ticker):
    try:
        ticker_info = yf.Ticker(ticker)
        # Returns back in unix time
        return ticker_info.quarterly_earnings.to_json()
    except Exception as e:
        return f"An Error Occurred: {e}"


@app.route('/getMajorHolders/<ticker>', methods=['GET'])
def get_major_holders(ticker):
    return get_major_holders_driver(ticker)


def get_major_holders_driver(ticker):
    try:
        ticker_info = yf.Ticker(ticker)
        # Returns back in unix time
        return ticker_info.major_holders.to_json()
    except Exception as e:
        return f"An Error Occurred: {e}"


@app.route('/getInstHolders/<ticker>', methods=['GET'])
def get_institutional_holders(ticker):
    return get_institutional_holders_driver(ticker)


def get_institutional_holders_driver(ticker):
    try:
        ticker_info = yf.Ticker(ticker)
        # Returns back in unix time
        return ticker_info.institutional_holders.to_json()
    except Exception as e:
        return f"An Error Occurred: {e}"


@app.route('/getBalanceSheet/<ticker>', methods=['GET'])
def get_balance_sheet(ticker):
    return get_balance_sheet_driver(ticker)


def get_balance_sheet_driver(ticker):
    try:
        ticker_info = yf.Ticker(ticker)
        # Returns back in unix time
        return ticker_info.balance_sheet.to_json()
    except Exception as e:
        return f"An Error Occurred: {e}"


@app.route('/getQuartBalanceSheet/<ticker>', methods=['GET'])
def get_quartery_balance_sheet(ticker):
    return get_quartery_balance_sheet_driver(ticker)


def get_quartery_balance_sheet_driver(ticker):
    try:
        ticker_info = yf.Ticker(ticker)
        # Returns back in unix time
        return ticker_info.quarterly_balance_sheet.to_json()
    except Exception as e:
        return f"An Error Occurred: {e}"


@app.route('/getCashflow/<ticker>', methods=['GET'])
def get_cashflow(ticker):
    return get_cashflow_driver(ticker)


def get_cashflow_driver(ticker):
    try:
        ticker_info = yf.Ticker(ticker)
        # Returns back in unix time
        return ticker_info.cashflow.to_json()
    except Exception as e:
        return f"An Error Occurred: {e}"


@app.route('/getQuartCashflow/<ticker>', methods=['GET'])
def get_quart_cashflow(ticker):
    return get_quart_cashflow_driver(ticker)


def get_quart_cashflow_driver(ticker):
    try:
        ticker_info = yf.Ticker(ticker)
        # Returns back in unix time
        return ticker_info.quarterly_cashflow.to_json()
    except Exception as e:
        return f"An Error Occurred: {e}"


@app.route('/getEarnings/<ticker>', methods=['GET'])
def get_earnings(ticker):
    return get_earnings_driver(ticker)


def get_earnings_driver(ticker):
    try:
        ticker_info = yf.Ticker(ticker)
        # Returns back in unix time
        return ticker_info.earnings.to_json()
    except Exception as e:
        return f"An Error Occurred: {e}"


@app.route('/getSustainability/<ticker>', methods=['GET'])
def get_sustainability(ticker):
    return get_sustainability_driver(ticker)


def get_sustainability_driver(ticker):
    try:
        ticker_info = yf.Ticker(ticker)
        # Returns back in unix time
        return ticker_info.sustainability.to_json()
    except Exception as e:
        return f"An Error Occurred: {e}"


@app.route('/getIsin/<ticker>', methods=['GET'])
def get_isin(ticker):
    return get_isin_driver(ticker)


def get_isin_driver(ticker):
    try:
        ticker_info = yf.Ticker(ticker)
        # Returns back in unix time
        return ticker_info.sustainability.to_json()
    except Exception as e:
        return f"An Error Occurred: {e}"


@app.route('/getOptions/<ticker>', methods=['GET'])
def get_options(ticker):
    return get_options_driver(ticker)


def get_options_driver(ticker):
    try:
        ticker_info = yf.Ticker(ticker)
        # Returns back in unix time
        return jsonify(ticker_info.options)
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


def generateCompetitions():
    # Datetime is in this format "2020-11-9" "YYYY-MM-DD"
    today = date.today()

    amount_competitions = 5

    randomSubsetTicker = [random.choice(randomStockList) for _ in range(amount_competitions)]
    randomTimes = [today + timedelta(days=random.randint(3, 30)) for _ in range(amount_competitions)]
    randomInitialStarting = [int(f"1{random.randint(3, 7) * '0'}") for _ in range(amount_competitions)]

    for i in range(amount_competitions):
        close_time = randomTimes[i]
        ticker = randomSubsetTicker[i]
        time_diff = str(close_time - today)

        comp_obj = {
            "startDate": str(today),
            "endDate": str(close_time),
            "description": f"Submit your algorithm before {str(close_time)} and compete for the largest gains!",
            "duration": time_diff,
            "name": f"{ticker} {time_diff.split(' ')[0]} Day Battle",
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


@app.route('/generate_bot', methods=['PUT'])
def generateBotAPI():
    return generateBot()


@app.route('/enterBotsComp', methods=['PUT'])
def enterBotsCompAPI():
    return enterBotsIntoComps()


def enterBotsIntoComps():
    competitions = active_comps_list_driver()
    botsList = bots_list_driver()

    indicators = ["NONE", "SMA", "EMA", "ACCUM", "AMA", "ALLN", "ANYN", "AVERAGE", "BBANDS", "BBANDSPCT", "DPO", "DMA", "DEMA", "DOWND", "DOWNDB", "DOWNM", "EVE", "EXPSMOOTH", "FFIH", "FFIL", "FLIH", "FLIL", "MAXN", "HMA", "HURST", "KST", "LAGF", "LRSI", "MINN", "MACD", "MACDHISTO", "MEANDEV", "MOMENTUMOSC", "PCTCHANGE", "PCTRANK", "PPO", "PPOSHORT", "PRICEOSC", "RSIEMA", "RSISMA", "RSISAFE", "ROC", "ROC100", "RMI", "RSI", "SMMA", "STDDEV", "SUMN", "TEMA", "TRIX", "TRIXSIGNAL", "TSI", "UPDAY", "UPDAYBOOL", "WA", "WMA", "ZLEMA", "ZLIND"]
    actions = ["buy", "sell"]
    comparators = ["above", "below"]
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
                        entries.append(entry)
                    algo = {
                        "name": algoName,
                        "ticker": comp['ticker'],
                        "public": True,
                        "runningTime": "30",
                        "userID": bot['userID'],
                        "PnL": 0,
                        "entry": entries
                    }
                    algoID = (bot['userID'] + comp['ticker'])
                    algo_create_driver(algo, algoID)
                    newAlgosCreated += 1
                else:
                    algoID = algo[0].id
                    reusedAlgos += 1
                competitor_obj = {
                    "competition": comp['id'],
                    "userID": bot['userID'],
                    "algorithm": algoID
                }
                comp_enter_user_driver(competitor_obj)
                newCompetitionsEntered.append(algoName + " into " + comp['name'])
                newBots.append(bot['username'])

    newCompsEnteredString = "\n"
    for comp in newCompetitionsEntered:
        newCompsEnteredString += comp + "\n"
    return ("Successfully entered " + str(
        len(set(newBots))) + " new bots into competitions: " + newCompsEnteredString + "\nNew algos created: " + str(
        newAlgosCreated) + "\nReused algos: " + str(reusedAlgos) + " \nTOTAL COMPETITORS ADDED: " + str(
        len(newCompetitionsEntered))), 200


@app.route('/findBestUsers', methods=['PUT'])
def findBestUsersAPI():
    findBestUsers()
    return "Successfully Ran Competitions", 200


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

        competitionId = competition["id"]
        leaderboardList = competition["leaderboard"]
        startDate = competition["startDate"]
        endDate = competition["endDate"]
        startingCash = competition["startingBalance"]

        leaderboardsPair = []
        for leader_obj in leaderboardList:
            try:
                algo = algorithms_ref.document(leader_obj["algorithmID"]).get()
                algo_dict = algo.to_dict()
                algo_dict["cash"] = startingCash
                algo_dict["id"] = algo.id
                algo_dict["startDate"] = startDate
                algo_dict["endDate"] = endDate
            except Exception as e:
                return f"An Error Occurred: {e}"

            backtestResults = {"PnL": 0}
            try:
                backtestResults = backtest_driver(algo_dict)
                update_algo_after_bt(algo_dict["id"], {"PnL": backtestResults["PnL"]})
            except Exception as e:
                print(e)

            leaderboardsPair.append((leader_obj, backtestResults["PnL"]))
        # Update competition with sorted best players
        leaderboardsPair.sort(key=lambda tup: tup[1])
        newLeaderBoard = list(map(lambda x: x[0], leaderboardsPair))
        comp_update_active_driver(competitionId, {"leaderboard": newLeaderBoard})

        # Check out of date competitions and set them as stale
        today = date.today()
        closeDate = parse(competition["endDate"])
        if today > closeDate.date():
            active_to_stale_comp_driver(competitionId)


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
