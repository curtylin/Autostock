from email import header
from re import X
import unittest 
from flask import Flask
import pytest
import os, sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
import api 


class putdeletetests(unittest.TestCase):
    api = Flask(__name__)

    def test_algo_update(self):
        url = 'http://127.0.0.1:5000/update-algorithm'
        parameters = {
            "id": "9KFDheM4RhHcGir2Fo02"
        }
        resp = self.api.get(url, data= parameters)
        
        self.assertEqual(resp.__sizeof__(), 120)

    def test_delete_algorithm(self):
            url = 'http://127.0.0.1:5000/delete-algorithm'
            parameters = {
                "id": "9KFDheM4RhHcGir2Fo02"
            }
            resp = self.api.get(url, data= parameters)
            body = resp.__dict__
            print(body)
            self.assertEqual(resp.__sizeof__(), 120)

    def unregister_competion(self):
            url = 'http://127.0.0.1:5000/unregister_compeition'
            parameters = {
                "id": "OUUvrpDoJSAnLk7t2TUS"
            }
            resp = self.api.get(url, data= parameters)
            body = resp.__dict__
            print(body)
            self.assertEqual(resp.__sizeof__(), 120)