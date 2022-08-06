from codecs import backslashreplace_errors
import socket
import re



def check_ports_from_file(filename):
    with open(filename, 'r') as f:
            for line in f:
                    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
                    host, port = line.split(":")[0], line.split(":")[1]

                    result = sock.connect_ex((host ,int(port)))
                    if result == 0:
#                    backend.send("OK");
                        print(line + ':OK');
                    else:
    #                    backend.send("BAD");
                        print(line + ':BAD');



def main():
    filename = 'hostlist.txt';
    check_ports_from_file(filename);

if __name__ == '__main__':
    main()
