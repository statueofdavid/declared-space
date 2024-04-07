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

gecko = ''
chrome = ''
for name, path in configAsDictionary.items():
    if path == 'CHROME_PATH':
        chrome = path + './chromedriver'
    if path == 'GECKO_PATH':
        gecko = path + './geckodriver'

drivers = [subprocess.Popen(program) for program in [chrome, gecko]]
for driver in drivers:
    driver.wait()
