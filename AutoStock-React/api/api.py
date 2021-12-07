from flask import Flask 
import firebase_admin
from firebase_admin import credentials, firestore, initialize_app

from backtesting import Backtest, Strategy
from backtesting.lib import crossover

from backtesting.test import SMA, GOOG



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


@app.route('/api/backtest')
def backtest():
    strategy = Strategy(
        {
            GOOG: SMA(
                short_window=10,
                long_window=30,
                overbought=80,
                oversold=20,
            ),
        },
        simulate=True,
    )
    backtest = Backtest(
        strategy,
        start=datetime.datetime(2018, 1, 1),
        end=datetime.datetime(2018, 12, 31),
        initial_equity=100000.0,
    )
    backtest.run()
    return backtest.results.to_json()

@app.route('/api/backtest/<symbol>')
def backtest_symbol(symbol):
    strategy = Strategy(
        {
            symbol: SMA(
                short_window=10,
                long_window=30,
                overbought=80,
                oversold=20,
            ),
        },
        simulate=True,
    )
    backtest = Backtest(
        strategy,
        start=datetime.datetime(2018, 1, 1),
        end=datetime.datetime(2018, 12, 31),
        initial_equity=100000.0,
    )
    backtest.run()
    return backtest.results.to_json()



@app.route('/testbacktesting')
def testbacktesting():
    class SmaCross(Strategy):
        def init(self):
            price = self.data.Close
            self.ma1 = self.I(SMA, price, 10)
            self.ma2 = self.I(SMA, price, 20)

        def next(self):
            if crossover(self.ma1, self.ma2):
                self.buy()
            elif crossover(self.ma2, self.ma1):
                self.sell()


    bt = Backtest(GOOG, SmaCross, commission=.002,
                  exclusive_orders=True)
    stats = bt.run()
    return stats.to_json()


@app.route('/test')
def test():
    return {'test': 'test'}