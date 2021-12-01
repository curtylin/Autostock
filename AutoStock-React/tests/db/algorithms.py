#import api. as algo

def main():
    algo.get() #Check if not present.
    algo.create()
    algo.get() #Check if created
    algo.edit()  
    algo.get() #Check if it was edited
    algo.delete()
    algo.get() #Check if deleted