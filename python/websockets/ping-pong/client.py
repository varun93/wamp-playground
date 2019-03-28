from autobahn.twisted.websocket import WebSocketClientProtocol, WebSocketClientFactory
import json


class PingClientProtocol(WebSocketClientProtocol):

    def onOpen(self):
        self.pingsReceived = 0
        self.pongsSent = 0

    def onPing(self, payload):
        self.pingsReceived += 1
        print("Ping received from {} - {}".format(self.peer, self.pingsReceived))
        self.sendPong(payload)
        self.pongsSent += 1
        print("Pong sent to {} - {}".format(self.peer, self.pongsSent))

    def onClose(self, wasClean, code, reason):
        reactor.stop()


if __name__ == '__main__':

    import sys

    from twisted.python import log
    from twisted.internet import reactor

    log.startLogging(sys.stdout)

    factory = WebSocketClientFactory(u"ws://127.0.0.1:9000")
    factory.protocol = PingClientProtocol

    reactor.connectTCP("127.0.0.1", 9000, factory)
    reactor.run()