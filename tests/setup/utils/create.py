import os
import logging
import requests
from yaml import load, dump

try:
    from yaml import CLoader as Loader, CDumper as Dumper
except ImportError:
    from yaml import Loader, Dumper

def get_session_id(response):
    return response.json()["value"]["sessionId"]

logger = logging.getLogger(__name__)
logging.basicConfig(filename='create.log', encoding='utf-8', format='%(asctime)s %(message)s', datefmt='%m/%d/%Y %I:%M:%S %p', level=logging.DEBUG)

configToOpen = open('config.yaml', 'r')
configAsDictionary = load(configToOpen, Loader=Loader)
logging.debug(configAsDictionary)

session = ''
chrome = ''
gecko = ''
for name, configValue in configAsDictionary.items():
    if name == 'SESSION_PATH':
        session = configValue
        logging.debug('session path: ' + session)
    if name == "CHROME_SOCKET":
        chrome = configValue
        logging.debug('chrome socket: ' + chrome)
    if name == "GECKO_SOCKET":
        gecko = configValue
        logging.debug('gecko socket: ' + gecko)

files = os.listdir(session)
logging.debug(files)

if not files:
    logging.warn('session path: ' + session + ', is empty: ' + files)

for file in files:
    with open(session + file, 'r') as payload:
            body = payload.read();
    
    headers = {'Content-Type': 'application/json'}
    
    if file.find('chrome'):
        logging.debug('server path: ' + chrome + ', file path: ' + session + file)
        session_response = requests.post(chrome + '/session', headers=headers, data=body)
        logging.debug(session_response)
        
        session_id = get_session_id(session_response)
        logging.debug('Created, id: ' + session_id)

# UNTESTED because my firefox installation is broken cause I didn't thoughtfully update my desktop environment
#    if file.find('gecko'):
#        logging.debug('server path: ' + gecko + ', file path: ' + session + file)
#        session_response = requests.post(gecko + '/session', headers=headers, data=body)
#        logging.debug(session_response)

#        response_parser(session_response)
