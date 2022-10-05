#05/10/2022
#Chico Demmenie
#Infinite-Mokey-Conundrum/Shakespeare/dl.py

import requests
import json
import os
import time
from bs4 import BeautifulSoup

def getScene(play, act, scene):

    url = f"http://shakespeare.mit.edu/{play}/{play}.{act}.{scene}.html"
    html = requests.get(url).content

    soup = BeautifulSoup(html, 'html.parser')
    
    return soup.get_text()


index = json.loads(open("shakespeare_index.json", "r").read())

for play in index:

    os.mkdir(play["shorthand"])
    time.sleep(0.2)

    for act in play["acts"]:

        for scene in act["scenes"]:

            sceneText = getScene(play["shorthand"], act["act"], scene)

            file = open(f"{play['shorthand']}/{play['shorthand']}.{act['act']}.{scene}.txt", "w")
            file.write(sceneText)
            file.close()
