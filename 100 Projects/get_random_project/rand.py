import random

doneList = [
    87,
    9
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
"""