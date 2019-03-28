from os import environ
from twisted.internet.defer import inlineCallbacks
from twisted.python.failure import Failure

from autobahn import wamp
from autobahn.twisted.wamp import ApplicationSession, ApplicationRunner


class MyService1(object):
    @wamp.register(u'com.mathservice.add2')
    def add2(self, x, y):
        return x + y

    @wamp.register(u'com.mathservice.mul2')
    def mul2(self, x, y):
        return x * y


class Component(ApplicationSession):

    """
    An application component registering RPC endpoints using decorators.
    """

    @inlineCallbacks
    def onJoin(self, details):
        print("session attached")

        # to use this session to register all the @register decorated
        # methods, we call register with the object; so here we create
        # a MyService1 instance and register all the methods on it and
        # on ourselves

        self.id = "1"
        self.pid = "1"
        self.minMoney = 200
        # self.test = self.pid == 0
        self.stealing = False


        results = []
        svc1 = MyService1()

        # register all @register-decorated methods from "svc1":
        # res = yield self.register(svc1)
        # results.extend(res)

        # register all our own @register-decorated methods:
        res = yield self.register(self)
        results.extend(res)

        for res in results:
            if isinstance(res, Failure):
                print("Failed to register procedure: {}".format(res.value))
            else:
                print("registration ID {}: {}".format(res.id, res.procedure))

    @wamp.register(u'com.mathservice.square2')
    def square2(self, x, y):
        return x * x + y * y

    @wamp.register(u'com.mathservice.div2')
    def div2(self, x, y):
        if y:
            return float(x) / float(y)
        else:
            return 0


if __name__ == '__main__':
    import six
    url = environ.get("AUTOBAHN_DEMO_ROUTER", u"ws://127.0.0.1:8080/ws")
    if six.PY2 and type(url) == six.binary_type:
        url = url.decode('utf8')
    realm = u"crossbardemo"
    runner = ApplicationRunner(url, realm)
    runner.run(Component)