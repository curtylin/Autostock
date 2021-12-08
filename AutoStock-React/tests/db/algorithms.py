import api.api as api

#TODO data structuring subject to change. 
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