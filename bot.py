
from operator import truediv
import telebot
# from telebot import types
import requests
import json

MAX_TIMEOUT = 2
DEBUGURL = "http://10.2.2.102:8000/api/"
URL = "https://gachi.abakumov.life/api/"




bot = telebot.TeleBot("5408328032:AAGzcWlLDSGkSyycqOm7WSSEcyQCA1KfTxM")
commands = ['/start', 'Hello', 'Hi', 'qq', 'ку', 'Привет', 'привет', 'прив', 'хай', 'хэллоу']


def fetch_hosts():
    # DEBUGURL = DEBUGURL + "hostlist"
    try:
        hosts = requests.get(DEBUGURL + "diedhosts")
        print(hosts)
        hosts = hosts.json()
        print(hosts)
        return hosts
        # bot.send_message(message.from_user.id, str(hosts))
    except:
        # print("=============" + str(hosts))
        return "requestExseptions"


@bot.message_handler(func=lambda message: True)
def echo_all(message):
    global list_hosts1, line_hosts2
    if message.text in commands:
        bot.reply_to(message, "Привет бро!\nНапиши /check_status, чтобы чекнуть статусы:)")
    elif message.text == '/check_status':
        host = fetch_hosts()
        if host != None and host != "requestExseptions":
            for line in host:
                list_hosts1.append(line["id"])
                print(line)
                print(line["title"])
                botSrt = "Хост недоступен!\n" + line["title"] + "\n" + line["host"] + "\n" + line["tag"]
                bot.send_message(message.from_user.id, botSrt)
            for i in list_hosts2:
                if not i in list_hosts1:
                    botSrt = "Поздравляю!\nХост доступен!\n" + line["title"] + "\n" + line["host"] + "\n" + line["tag"]
                bot.send_message(message.from_user.id, botSrt)
            line_hosts2 = line_hosts1
            line_hosts1 = []
            # bot.send_message(message.from_user.id, 'Check_status')
        elif host == "requestExseptions": bot.send_message(message.from_user.id, "Не получается подключится к бэку")
        else: bot.send_message(message.from_user.id, "Все работает исправно")
    else:
        bot.send_message(message.chat.id, 'Что-то не понятное, повтори еще раз')
while(1):
    bot.polling()


