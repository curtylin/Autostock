import api.api as api

#TODO data structuring subject to change. 
# sample URL = http://localhost:5000/create-algorithm?data=%7B%22name%22%3A%22algo2%22%2C%22userID%22%3A%22AaOU7E4YP6aTcWlaJK4u2XgRBQv1%22%2C%22ticker%22%3A%22TSLA%22%2C%22interval%22%3A%222%22%2C%22indicator%22%3A%22SMA%22%2C%22period1%22%3A%22(close) 20%22%2C%22comparator%22%3A%22above%22%2C%22period2%22%3A%22(close) 50%22%2C%22action%22%3A%22buy%22%2C%22runtime%22%3A%2214%22%2C%22public%22%3A%22false%22%7D
data = {
    "name" : "algo1",
    "userID" : "AaOU7E4YP6aTcWlaJK4u2XgRBQv1",
    "ticker" : "AAPL",
    "interval" : 1.0,
    "indicator" : "SMA",
    "period1" : "(close) 20",
    "comparator" : "above",
    "period2" : "(close) 50",
    "action" : "buy",
    "runtime" : 14,
    "public" : False
}


def main():
    api.algo_read() #Check if not present.
    api.algo_create(data)
    api.algo_read() #Check if created
    api.algo_update()  
    api.algo_read() #Check if it was edited
    api.algo_delete()
    api.algo.algo_read() #Check if deleted