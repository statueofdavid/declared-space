import subprocess
from yaml import load, dump

try:
    from yaml import CLoader as Loader, CDumper as Dumper
except ImportError:
    from yaml import Loader, Dumper

stream = open('config.yaml', 'r')
print(load(stream, Loader=Loader))
