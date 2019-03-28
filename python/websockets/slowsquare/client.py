from autobahn.twisted.websocket import WebSocketClientProtocol, WebSocketClientFactory
import json
import random


class SlowSquareClientProtocol(WebSocketClientProtocol):

    def onOpen(self):
        x = 10. * random.random()
        self.sendMessage(json.dumps(x).encode('utf8'))
        print("Request to square {} sent.".format(x))

    def onMessage(self, payload, isBinary):
        if not isBinary:
            res = json.loads(payload.decode('utf8'))
            print("Result received: {}".format(res))
            # calls on close
            self.sendClose()

    def onClose(self, wasClean, code, reason):
        if reason:
            print(reason)
        # reactor.stop()


if __name__ == '__main__':

    import sys

    from twisted.python import log
    from twisted.internet import reactor

    log.startLogging(sys.stdout)

    factory = WebSocketClientFactory(u"ws://127.0.0.1:9000")
    factory.protocol = SlowSquareClientProtocol

    reactor.connectTCP("127.0.0.1", 9000, factory)
    reactor.run()