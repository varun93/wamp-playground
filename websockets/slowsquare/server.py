from autobahn.twisted.websocket import WebSocketServerProtocol,WebSocketServerFactory
from twisted.internet.defer import Deferred,inlineCallbacks,returnValue
import json


def sleep(delay):
    d = Deferred()
    reactor.callLater(delay, d.callback, None)
    return d


class SlowSquareServerProtocol(WebSocketServerProtocol):

    # emulating a slow function
    @inlineCallbacks
    def slowsquare(self, x):
        if x > 5:
            raise Exception("number too large")
        else:
            yield sleep(1)
            returnValue(x * x)

    @inlineCallbacks
    def onMessage(self, payload, isBinary):
        if not isBinary:
            x = json.loads(payload.decode('utf8'))
            try:
                # this is an asychronous call
                res = yield self.slowsquare(x)
            except Exception as e:
                self.sendClose(1000, "Exception raised: {0}".format(e))
            else:
                self.sendMessage(json.dumps(res).encode('utf8'))


if __name__ == '__main__':

    import sys

    from twisted.python import log
    from twisted.internet import reactor

    log.startLogging(sys.stdout)

    factory = WebSocketServerFactory(u"ws://127.0.0.1:9000")
    factory.protocol = SlowSquareServerProtocol

    reactor.listenTCP(9000, factory)
    reactor.run()