from codecs import backslashreplace_errors
import socket
import re
# import python3-nmap

def check_internet():
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    result = sock.connect_ex(('8.8.8.8', 53))

def check_host(host, port):
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.settimeout(5)
    result = sock.connect_ex((host ,int(port)))
    if result == 0:
#              backend.send("OK");
        print(host + port +  ':OK')
    else:
#          backend.send("BAD");
        print(host + port +':BAD')

def check_ports_from_file(filename):
    with open(filename, 'r') as f:
            for line in f:
                if line != "":
                    host, port = line.split(":")[0], line.split(":")[1]
                    check_host(host, port);



def main():
    filename = 'hostlist.txt'
    check_internet()
    check_ports_from_file(filename)

if __name__ == '__main__':
    main()
