from codecs import backslashreplace_errors
from curses import reset_shell_mode
import socket
import re
from traceback import print_tb
from unittest import result
from jsonschema import RefResolutionError
import requests
# import python3-nmap
MAX_TIMEOUT = 2
def check_internet():
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.settimeout(MAX_TIMEOUT)
    result = sock.connect_ex(('8.8.8.8', 53))
    if result != 0: print("No internet")

def ping(site):
    """Send GET request to input site and return status code"""
    try:
        resp = requests.get(site, verify=False, timeout=MAX_TIMEOUT)
        print(resp.status_code)
        if resp.status_code ==  200: return 1
    except:
        pass
    return 0

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


def check_ports_from_file(filename):
    with open(filename, 'r') as f:
        result = -1
        for line in f:
            line = line.replace('http://' ,'')
            line = line.replace('https://' ,'')
            line = line.replace('\n', '')
            if ":" in line:
                host, port = line.split(":")[0], line.split(":")[1]
            else:
                host = line.replace('\n', '')
                print(line)
                port = 80
            result = check_host(host, port)
            if result == 1:
#           backend.send("OK");
                print(line +  '   :OK')
                pass
            else:
#          backend.send("BAD");
                print(line +'   :BAD')

def main():
    filename = 'hostlist.txt'
    check_internet()

    if check_host("www.yandex.ru", 80): print('ok')
    if check_host('yandex.ru', 80): print('ok')

    if check_host("letoctf.org", 80): print('ok')
    check_ports_from_file(filename)

if __name__ == '__main__':
    main()
