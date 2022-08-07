from codecs import backslashreplace_errors
from curses import reset_shell_mode
import socket
import re
from traceback import print_tb
from unittest import result
from xml.sax.handler import property_interning_dict
from jsonschema import RefResolutionError
import requests
import json

# import python3-nmap
MAX_TIMEOUT = 2
DEBUGURL = "http://10.2.2.102:8000/api/"
URL = "https://gachi.abakumov.life/api/"


def check_internet():
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.settimeout(MAX_TIMEOUT)
    result = sock.connect_ex(('8.8.8.8', 53))
    # if result != 0: print("No internet")


def check_host(host, port):
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.settimeout(MAX_TIMEOUT)
    try:
        result = sock.connect_ex((host ,int(port)))
    except:
        result = -1
    if result == 0:
        return 1
    else:
        return 0

def fetch_hosts():
    # DEBUGURL = DEBUGURL + "hostlist"
    hosts = requests.get(DEBUGURL + "hostlist/")
    print(hosts)
    hosts = hosts.json()
    return hosts



def send_to_backend(hash, result): #result bool True/False
    result = bool(result)
    print(result)
    data = {"key": hash, "status": result}
    data_json = json.dumps(data)
    # DEBUGURL = DEBUGURL + "checker/"
    r = requests.post(DEBUGURL + "checker/", data = data_json)
    print(r)
    print(r.json())
    if r.status_code == 200: print("Success send hosts!")

def check_ports_from_file(filename):
    with open(filename, 'r') as f:
        result = -1
        for line in fetch_hosts():
            hash = line["id"]
            # print("hash:  " + str(hash))
            line = (line["host"])
            line = line.replace('http://' ,'')
            line = line.replace('https://' ,'')
            line = line.replace('\n', '')
            if ":" in line:
                host, port = line.split(":")[0], line.split(":")[1]
            else:
                host = line.replace('\n', '')
                port = 80
            result = check_host(host, port) #new tread and go next without delay
            send_to_backend(hash, result) # delete host
            if result == 1:
#           backend.send("OK");
                print(line +  '   :OK')
                pass
            else:
#          backend.send("BAD");
                print(line +'   :BAD')

def main():
    filename = 'hostlist.txt'
    fetch_hosts()
    send_to_backend("1234", True)
    check_internet()

    if check_host("www.yandex.ru", 80): print('ok')
    if check_host('yandex.ru', 80): print('ok')

    if check_host("letoctf.org", 80): print('ok')
    check_ports_from_file(filename)

if __name__ == '__main__':
    main()
