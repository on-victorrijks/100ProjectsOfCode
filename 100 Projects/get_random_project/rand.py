import random

doneList = [
    87,
    9,
    70,
    59
]

isResValid = False
while not isResValid:
    r = random.randint(1,100)
    if r not in doneList:
        isResValid = True

print(r)

# List
"""
09/11/20,87,Emoji Translator
12/11/20,9,Product Landing Page
20/11/20,70,Chess AI
23/12/20,59,Codec Software,It's a good project to learn C++

"""