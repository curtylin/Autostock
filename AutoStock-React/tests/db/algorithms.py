#Create algorithms into database
def create():
    return True


#Edit algorithms into database
def edit():
    return True


#Check if algorithm saved properly
def check():
    return True


#Delete algorithm from database
def delete():
    return True

def main():
    check() #Check if empty
    create()
    check() #Check if created
    edit()  
    check() #Check if it was edited
    delete()
    check() #Check if deleted