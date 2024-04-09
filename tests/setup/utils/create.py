import os
import logging
import requests
from yaml import load, dump

try:
    from yaml import CLoader as Loader, CDumper as Dumper
except ImportError:
    from yaml import Loader, Dumper

logger = logging.getLogger(__name__)
logging.basicConfig(filename='create.log', encoding='utf-8', format='%(asctime)s %(message)s', datefmt='%m/%d/%Y %I:%M:%S %p', level=logging.DEBUG)

def response_parser(response):
    logging.debug(response) 

    for name, value in response.json():
        match name:
            case 'sessionId':
                logging.debug('sessionId found: ' + value)
                return value
            case _:
                logging.debug('not the id')
    
    return 'not found'

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
    if file.find('chrome'):
        response = requests.post(chrome, file)
        response_parser(response)

    if file.find('gecko'):
        response = requests.post(gecko, file)
        response_parser(response)


