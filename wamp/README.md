# Wamp Examples

Router is the core of WAMP, all the communications between the components happen via the WAMP router. I have chosen to run the router provided by crossbar.


### Router Installation
Ideally it should have been installed via requirements.txt. If not create a python3 virtual environment and install crossbar seperately.

``` pip install crossbar ```

## Bringing up the Router

Navigate to the router directory, and type ``` crossbar start ```. This should bring up the router.

## Running the examples

You can run the examples in rpc or pubsub folder by just running the python server and the client as usual.
