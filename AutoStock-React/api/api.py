from flask import Flask, request
import firebase_admin
from firebase_admin import credentials, firestore, initialize_app
from datetime import datetime
import json
import backtrader as bt



app = Flask(__name__, static_folder="../build", static_url_path="/")

cred = credentials.Certificate("firestore_apikey.json")
firebase_admin.initialize_app(cred)
db = firestore.client()


@app.errorhandler(404)
def not_found(error):
    return app.send_static_file('index.html')

@app.route('/')
def index():
    return app.send_static_file('index.html')


@app.route('/backtest', methods=['POST'])
def backtest(stockInformation):
    data = request.json
    dataDict = json.loads(data)


    class Strategy(bt.Strategy):
        def __init__(self):
            if(dataDict['indicatorOne'] == 'SMA'):
                self.sma = btind.SimpleMovingAverage(period=dataDict['timeInterval'])
            if(dataDict['indicatorTwo'] == 'EMA'):
                self.ema = btind.ExponentialMovingAverage(period=dataDict['timeInterval'])
        def next(self):
            func = eval('lambda x: self.indicatorOne operator self.indicatorTwo')
            if(func(self.data.close[0])):
                if(dataDict['action'] == "buy"):
                    self.buy()



    cerebro = bt.Cerebro()
    cerebro.broker.setcash(dataDict['cash'])
    cerebro.broker.setcommission(commission=0.0)
    cerebro.addstrategy(bt.Strategy)

    financeData = bt.feeds.YahooFinanceCSVData(dataname=dataDict['symbol'],
                                        fromdate=dataDict['startDate'],
                                        todate=dataDict['endDate'],
                                        reverse=False)

    response = {}

    cerebro.adddata(financeData)

    response["startingValue"] = cerebro.broker.getvalue()
    cerebro.run()
    response["EndingValue"] = cerebro.broker.getvalue()
    response["PnL"] = response["EndingValue"] - response["startingValue"]
    response["PnLPercent"] = (response["PnL"] / response["startingValue"]) * 100

    return response






@app.route('/test')
def test():
    test = {}
    test["Entry"] = "Test"
    return test