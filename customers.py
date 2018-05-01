import random

def customersGen(weekend):
    amount = 0

    ittr = 5

    if weekend == True:
        ittr = 6
    else:
        ittr = 5

    for x in range(ittr):
        if ittr == 6:
            if x < 3:
                if amount < 60:
                    amount += random.randint(5,25)
                else:
                    amount -= random.randint(3,15)
            else:
                if amount >= 1:
                    amount = random.randint(3,10)
                amount -= random.randint (1,amount)
        else:
            if x < 3:
                if amount < 60:
                    amount += random.randint(5,25)
                else:
                    amount -= random.randint(3,10)
            else:
                if amount >= 1:
                    amount = random.randint(3,10)
                amount -= random.randint (1,amount)

        time = x + 5

        print (time, ": 00 - There are ", amount, " customers!")


def getDate(z):
    if z == 0:
        return "Monday"
    elif z == 1:
        return "Tuesday"
    elif z == 2:
        return "Wednesday"
    elif z == 3:
        return "Thursday"
    elif z == 4:
        return "Friday"
    elif z == 5:
        return "Saturday"
    else:
        return "Sunday"

for z in range(7):
    print (getDate(z))
    if z in (0,1,2,3,6):
        customersGen(False)
    if z in (4,5):
        customersGen(True)
