from email import header
from re import X
import unittest 
from flask import Flask
import pytest
import os, sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
import api 


class tests(unittest.TestCase):
    api = Flask(__name__)
    def test_backtest(self):
        url = 'http://127.0.0.1:5000/backtest'
        parameters = {
            "symbol": "TSLA",
            "cash": 1000,
            "startDate": "2020-11-9",
            "endDate": "2021-11-9"
        }
        resp = self.api.post(url + '/api/dbapi/post/', data= parameters)
        self.assertEqual(resp.__sizeof__(), 120)

    #ask jonny about object shaping 

    def test_not_found(self):
        url = 'http://127.0.0.1:5000/asfjklalsfjalks'
        parameters = {
            "symbol": "TSLA",
            "cash": 1000,
            "startDate": "2020-11-9",
            "endDate": "2021-11-9"
        }
        resp = self.api.post(url + '/api/dbapi/post/', data= parameters)
        self.assertEqual(resp.__dict__, {})

    def test_create_algorithm(self):
        url = 'http://127.0.0.1:5000/create-algorithm'
        parameters =  {
            "action": "buy",
            "comparator": "Above",
            "indicator1": "SMA",
            "name": "Billbo' Microsoft algorithm",
            "period1": "(close) 20",
            "period2": "(close) 20",
            "public": False,
            "runningTime": "7",
            "ticker": "MSFT",
            "timeInterval": "24",
            "userID": "qmIQjqjgFtOMh2ZmcRJT8COH79A3"
            }
        
        resp = self.api.post(url, data= parameters)
        #TODO
        #doesnt add into the db
        self.assertEqual(resp.__sizeof__(), 120)



