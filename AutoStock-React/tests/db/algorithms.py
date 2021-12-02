import api.api as algo


#TODO data structuring subject to change. 
data = {
    "name" : "algo1",
    "ticker" : "AAPL",
    "interval" : 1.0,
    "indicator" : "SMA",
    "period1" : 20,
    "comparator" : "above",
    "period2" : 50,
    "action" : "BUY",
    "runtime" : 14
}


def main():
    algo.get() #Check if not present.
    algo.create()
    algo.get() #Check if created
    algo.edit()  
    algo.get() #Check if it was edited
    algo.delete()
    algo.get() #Check if deleted