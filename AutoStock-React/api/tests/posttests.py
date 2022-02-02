from email import header
from re import X
import unittest 
from flask import Flask
import pytest
import os, sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
import api 


class posttests(unittest.TestCase):
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
        resp
        self.assertEqual(resp.__sizeof__(), 120)

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
        self.assertEqual(resp.__sizeof__(), 120)

    def test_algo_update(self):
        url = 'http://127.0.0.1:5000/algo-update'
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
        self.assertEqual(resp.__sizeof__(), 120)
    def test_comp_create(self):
        url = 'http://127.0.0.1:5000/create-compeition'
        parameters =  {
                {
                "closeDate": "Wed, 05 Jan 2022 00:00:00 GMT",
                "description": "Lock in your algo before the submission closes to enter. Your algorithm will be ran for 1 month without being able to change or edit. Users with the algorithms that return the highest profit (or lowest loss) will win trophies!",
                "duration": 30,
                "name": "GME 30 Day Battle",
                "startingBalance": 10000,
                "ticker": "GME"
                }
            }
        
        resp = self.api.post(url, data= parameters)
        self.assertEqual(resp.__sizeof__(), 120)
    
    def test_comp_create(self):
        url = 'http://127.0.0.1:5000/create-compeition'
        parameters =  {
                "closeDate": "Wed, 05 Jan 2022 00:00:00 GMT",
                "description": "Lock in your algo before the submission closes to enter. Your algorithm will be ran for 1 month without being able to change or edit. Users with the algorithms that return the highest profit (or lowest loss) will win trophies!",
                "duration": 30,
                "name": "GME 30 Day Battle",
                "startingBalance": 10000,
                "ticker": "GME"
            }
        
        resp = self.api.post(url, data= parameters)
        self.assertEqual(resp.__sizeof__(), 120)
    
    def test_comp_edit_algorithm(self):
        id = 123123
        url = 'http://127.0.0.1:5000/edit-compeition-algorithm'
        parameters =  {
                "closeDate": "Wed, 05 Jan 2022 00:00:00 GMT",
                "description": "Lock in your algo before the submission closes to enter. Your algorithm will be ran for 1 month without being able to change or edit. Users with the algorithms that return the highest profit (or lowest loss) will win trophies!",
                "duration": 30,
                "name": "GME 30 Day Battle",
                "startingBalance": 10000,
                "ticker": "GME"
            }
        
        resp = self.api.post(url, data= parameters)
        self.assertEqual(resp.__sizeof__(), 120)
    



