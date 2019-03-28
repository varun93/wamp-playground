import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
const autobahn = require("autobahn");

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.session = null;
  }
  componentWillMount() {
    const url = "ws://127.0.0.1:80/ws";
    const realm = "realm1";

    const connection = new autobahn.Connection({
      url,
      realm
    });

    connection.onopen = session => {
      this.session = session;
      this.subscribeToEvents();
    };

    connection.open();
  }

  trade = state => {
    console.log("In Trade");
    console.log(state);
  };

  auction = state => {
    console.log("In Auction");
    console.log(state);
  };

  bsm = state => {
    console.log("In BSM");
    console.log(state);
  };

  jailDecision = state => {
    console.log("In Jail Decision");
    console.log(state);
  };

  subscribeToEvents = () => {
    this.session.subscribe("monopoly.trade", this.trade);
    this.session.subscribe("monopoly.auction", this.auction);
    this.session.subscribe("monopoly.auction", this.bsm);
    this.session.subscribe("monopoly.auction", this.jailDecision);
  };

  sendMessage = () => {
    this.session.publish("com.myapp.hello", ["Hello, world!"]);
    console.log("Message Sent");
  };

  render() {
    return (
      <div className="App">
        <h1>Welcome to Monopoly </h1>
        <button onClick={this.sendMessage}> Send Message </button>
      </div>
    );
  }
}

export default App;
