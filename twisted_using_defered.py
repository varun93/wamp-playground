from twisted.internet import reactor
from twisted.internet.defer import Deferred

def slow_square(x):
   d = Deferred()

   def resolve():
      d.callback(x * x)

   reactor.callLater(1, resolve)
   return d

def test():
   d = slow_square(3)

   def on_success(res):
      print(res)
      reactor.stop()

   d.addCallback(on_success)

test()
reactor.run()