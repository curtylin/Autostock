from email import header
from re import X
import unittest 
from flask import Flask
import pytest
import os, sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
import api 


class gettests(unittest.TestCase):
    api = Flask(__name__)
    def test_list_algorithms(self):
        url = 'http://34.106.176.23:5000/list-algorithm'
        parameters = {
            "id": "9KFDheM4RhHcGir2Fo02"
        }
        resp = self.api.get(url, data= parameters)
        
        self.assertEqual(resp.__sizeof__(), 120)
    def test_algo_read(self):
        url = 'http://34.106.176.23:5000/get-algorithm'
        parameters = {
             "id": "9KFDheM4RhHcGir2Fo02"
        }
        
        resp = self.api.get(url, data= parameters)
        
        self.assertEqual(resp.__sizeof__(), 120)
    def test_delete_algorithm(self):
        url = 'http://34.106.176.23:5000/delete-algorithm'
        parameters = {
            "id": "9KFDheM4RhHcGir2Fo02"
        }
        resp = self.api.get(url, data= parameters)
        
        self.assertEqual(resp.__sizeof__(), 120)

    def test_list_compeition(self):
        url = 'http://34.106.176.23:5000/list-competition'
        parameters = {
        }
        resp = self.api.get(url, data= parameters)
        
        self.assertEqual(resp.__sizeof__(), 120)

    def test_get_competition(self):
        url = 'http://34.106.176.23:5000/get-compeition'
        parameters = {
            "id": "OUUvrpDoJSAnLk7t2TUS"
        }
        resp = self.api.get(url, data= parameters)
        
        self.assertEqual(resp.__sizeof__(), 120)

    def test_delete_competition(self):
        url = 'http://34.106.176.23:5000/delete-compeition'
        parameters = {
            "id": "OUUvrpDoJSAnLk7t2TUS"
        }
        resp = self.api.get(url, data= parameters)
        
        self.assertEqual(resp.__sizeof__(), 120)

    def test_unregister_competition(self):
        url = 'http://34.106.176.23:5000/unregister-compeition'
        parameters = {
           "id": "OUUvrpDoJSAnLk7t2TUS"
        }
        resp = self.api.get(url, data= parameters)
        
        self.assertEqual(resp.__sizeof__(), 120)