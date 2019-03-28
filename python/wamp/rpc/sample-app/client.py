from os import environ
from twisted.internet import reactor
from twisted.internet.defer import inlineCallbacks

from autobahn.twisted.wamp import ApplicationSession, ApplicationRunner


class Component(ApplicationSession):
    """
    An application component calling the different backend procedures.
    """

    @inlineCallbacks
    def onJoin(self, details):
        print("session attached")

        procs = [u'com.mathservice.add2',
                 u'com.mathservice.mul2',
                 u'com.mathservice.square2',
                 u'com.mathservice.div2']

        try:
            for proc in procs:
                res = yield self.call(proc, 2, 3)
                print("{}: {}".format(proc, res))
        except Exception as e:
            print("Something went wrong: {}".format(e))

        self.leave()

    def onDisconnect(self):
        print("disconnected")
        reactor.stop()


if __name__ == '__main__':
    import six
    url = environ.get("AUTOBAHN_DEMO_ROUTER", u"ws://127.0.0.1:8080/ws")
    if six.PY2 and type(url) == six.binary_type:
        url = url.decode('utf8')
    realm = u"crossbardemo"
    runner = ApplicationRunner(url, realm)
    runner.run(Component)