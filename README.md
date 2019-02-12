# Exploring Web Application Messaging Protocol
Repository to explore the power of [WAMP](https://wamp-proto.org/) using [autobahn](https://crossbar.io/autobahn/). 

While struggling to understand the need for WAMP's I stumbled upon [this](https://blog.eduonix.com/web-programming-tutorials/web-application-messaging-protocol/) resource which provides a good inuition for the need for the protocol.
[This](https://crossbario.com/blog/Free-Your-Code-Backends-in-the-Browser/) was quite informative too.

## Installation
``` pip install -r requirements.txt ```

WAMP is built on top of websockets, so it helps to have a reasonable understanding of websockets. Have included a few example programs of the same. The examples **are not my own**, I have taken them from the [official repository](https://github.com/crossbario/autobahn-python/).

Since it deals a fair bit of event driven paradigm, I have included a couple of examples of using [Twisted](https://twistedmatrix.com/trac/) taken from [here](https://autobahn.readthedocs.io/) demonstrating the usage of Deferred and inlineCallbacks. 

```wamp``` would contain examples of using wamp. 
