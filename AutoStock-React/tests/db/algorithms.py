import api.api as algo


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
    algo.get() #Check if not present.
    algo.create(data)
    algo.get() #Check if created
    algo.edit()  
    algo.get() #Check if it was edited
    algo.delete()
    algo.get() #Check if deleted