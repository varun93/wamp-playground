from twisted.internet import reactor
from twisted.internet.defer import inlineCallbacks, returnValue
from autobahn.twisted.util import sleep

@inlineCallbacks
def slow_square(x):
   yield sleep(1)
   returnValue(x*x)

@inlineCallbacks
def test():
   d = yield slow_square(3)
   print(d)
   reactor.stop()
   

test()
reactor.run()