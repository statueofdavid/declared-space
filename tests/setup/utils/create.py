import os
import logging
import requests
from yaml import load, dump

try:
    from yaml import CLoader as Loader, CDumper as Dumper
except ImportError:
    from yaml import Loader, Dumper

def get_new_session_id(response):
    logging.debug(response) 
    
    # research adding context to debug logging to reveal browser opinions
    match response:
        case str(response) if '200' in response:
            body = response.text
            logging.debug('Ok, is there a body: ' + body)
            return 'Ok'
        case str(response) if '405' in response:
            logging.debug('Bad Method, what about another tool like curl')
            # when talking to gecko, bad url path throws a 405
            return 'Bad Method'
        case response if '404' in response:
            logging.debug('unknown command, what about another tool like curl')
            # when talking to chrome, bad url path throws a 404
            return 'Unknown Command' 
        case _:
            logging.debug('unhandled response, check the logs')

    return 'not found'

logger = logging.getLogger(__name__)
logging.basicConfig(filename='create.log', encoding='utf-8', format='%(asctime)s %(message)s', datefmt='%m/%d/%Y %I:%M:%S %p', level=logging.DEBUG)

configToOpen = open('config.yaml', 'r')
configAsDictionary = load(configToOpen, Loader=Loader)
logging.debug(configAsDictionary)

session = ''
for name, configValue in configAsDictionary.items():
    if name == 'SESSION_PATH':
        session = configValue
        logging.debug('session path: ' + session)

files = os.listdir(session)
logging.debug(files)


if not files:
    logging.warn('session path: ' + session + ', is empty: ' + files)

localhost = 'http://localhost'
chrome = localhost + ':9515'
gecko = localhost + ':4444'

for file in files:
    with open(session + file, 'r') as payload:
            body = payload.read();
    
    headers = {'Content-Type': 'application/json'}
    
    if file.find('chrome'):
        logging.debug('server path: ' + chrome + ', file path: ' + session + file)
        session_response = requests.post(chrome + '/session', headers=headers, data=body)
        logging.debug(session_response)
        
        get_new_session_id(session_response)

# UNTESTED because my firefox installation is broken cause I didn't thoughtfully update my desktop environment
#    if file.find('gecko'):
#        logging.debug('server path: ' + gecko + ', file path: ' + session + file)
#        session_response = requests.post(gecko + '/session', headers=headers, data=body)
#        logging.debug(session_response)

#        response_parser(session_response)
