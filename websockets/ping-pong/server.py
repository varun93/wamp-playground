from twisted.internet import reactor
from twisted.python import log
from autobahn.twisted.websocket import WebSocketServerFactory,WebSocketServerProtocol
import sys

class PingServerProtocol(WebSocketServerProtocol):

    # send a ping after each second
    def doPing(self):
        if self.run:
            self.sendPing()
            self.factory.pingsSent[self.peer] += 1
            print("Ping sent to {} - {}".format(self.peer, self.factory.pingsSent[self.peer]))
            reactor.callLater(1, self.doPing)

    def onPong(self, payload):
        self.factory.pongsReceived[self.peer] += 1
        print("Pong received from {} - {}".format(self.peer, self.factory.pongsReceived[self.peer]))

    def onOpen(self):
        self.factory.pingsSent[self.peer] = 0
        self.factory.pongsReceived[self.peer] = 0
        self.run = True
        self.doPing()


    def onClose(self, wasClean, code, reason):
        self.run = False


class PingServerFactory(WebSocketServerFactory):

    def __init__(self, uri):
        WebSocketServerFactory.__init__(self, uri)
        self.pingsSent = {}
        self.pongsReceived = {}


if __name__ == '__main__':

    log.startLogging(sys.stdout)
    factory = PingServerFactory(u"wss://127.0.0.1:9000")
    factory.protocol = PingServerProtocol
    reactor.listenTCP(9000, factory)
    reactor.run()