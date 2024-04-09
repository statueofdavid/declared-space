import subprocess
import logging
from yaml import load, dump

try:
    from yaml import CLoader as Loader, CDumper as Dumper
except ImportError:
    from yaml import Loader, Dumper

logger = logging.getLogger(__name__)
logging.basicConfig(filename='startup.log', encoding='utf-8', format='%(asctime)s %(message)s', datefmt='%m/%d/%Y %I:%M:%S %p', level=logging.DEBUG)

configToOpen = open('config.yaml', 'r')
configAsDictionary = load(configToOpen, Loader=Loader)
logging.debug(configAsDictionary)

# Should I: 
# store webdriver server logs
# store webdriver responses
# add rotating logging
# research what can be optimized to improve the quality of life

gecko = ''
chrome = ''
for name, configValue in configAsDictionary.items():
    match name:
        case 'CHROME_PATH':
            chrome = configValue
            logging.debug('found: ' + chrome)
        case 'GECKO_PATH':
            gecko = configValue
            logging.debug('found: ' + gecko)
        case _:
            logging.debug('not found: ' + name)

logging.debug('paths found: ' + chrome + ' ' + gecko)

drivers = [subprocess.Popen(program) for program in [chrome, gecko]]
for driver in drivers:
    driver.wait() 
