import React, { Component } from "react";
import * as constants from "./constants";
import "./App.css";
const autobahn = require("autobahn");

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.session = null;
    this.state = {
      actionButton: ""
    };
  }

  componentWillMount() {
    const url = constants.ROUTER_ENDPOINT;
    const realm = constants.APPLICATION_REALM;

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

  /* Receivers  */
  receiveTradeRequest = state => {
    this.setState({ actionButton: "trade" });
    console.log(state);
  };

  receiveAuctionRequest = state => {
    this.setState({ actionButton: "auction" });
    console.log(state);
  };

  receiveBSMRequest = state => {
    this.setState({ actionButton: "bsm" });
    console.log(state);
  };

  receiveJailDecisionRequest = state => {
    this.setState({ actionButton: "jail-decision" });
    console.log(state);
  };

  /* Send Response; action listners  */

  sendTradeResponse = event => {
    console.log(event.target);
  };

  sendAuctionResponse = event => {
    console.log(event.target);
  };

  sendBSMResponse = event => {
    console.log(event.target);
  };

  sendJailDecisionResponse = event => {
    console.log(event.target);
  };

  subscribeToEvents = () => {
    this.session.subscribe("monopoly.trade", this.receiveTradeRequest);
    this.session.subscribe("monopoly.auction", this.receiveAuctionRequest);
    this.session.subscribe("monopoly.bsm", this.receiveBSMRequest);
    this.session.subscribe(
      "monopoly.jail_decision",
      this.receiveJailDecisionRequest
    );
  };

  startGame = () => {
    this.session.publish("monopoly.auction", ["Start Game"]);
  };

  render() {
    const { actionButton } = this.state;
    const {
      sendAuctionResponse,
      sendBSMResponse,
      sendJailDecisionResponse,
      sendTradeResponse
    } = this;
    return (
      <div className="App">
        <h1>Welcome to Monopoly </h1>
        <button onClick={this.startGame}> Start Game </button>
        <button
          onClick={sendTradeResponse}
          className="trade"
          disabled={actionButton === "trade" ? "" : "disabled"}
        >
          Trade
        </button>
        <button
          onClick={sendAuctionResponse}
          className="auction"
          disabled={actionButton === "auction" ? "" : "disabled"}
        >
          Auction
        </button>
        <button
          onClick={sendBSMResponse}
          className="bsm"
          disabled={actionButton === "bsm" ? "" : "disabled"}
        >
          BSM
        </button>
        <button
          className="jail-decision"
          disabled={actionButton === "jail-decision" ? "" : "disabled"}
          onClick={sendJailDecisionResponse}
        >
          Jail Decision
        </button>
      </div>
    );
  }
}

export default App;
