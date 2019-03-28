import React, { Component } from "react";
import * as constants from "./constants";
import { substituteEndpoint } from "./utils";
import "./App.css";
const autobahn = require("autobahn");

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.session = null;
    // currently hardcoding game id and agent id
    this.gameId = 1;
    this.agentId = 1;
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
    this.setState({ actionButton: constants.TRADE_ACTION });
    console.log(state);
  };

  receiveAuctionRequest = state => {
    this.setState({ actionButton: constants.AUCTION_ACTION });
    console.log(state);
  };

  receiveBSMRequest = state => {
    this.setState({ actionButton: constants.BSM_ACTION });
    console.log(state);
  };

  receiveJailDecisionRequest = state => {
    this.setState({ actionButton: constants.JAIL_DECISION_ACTION });
    console.log(state);
  };

  /* Send Response; action listners  */

  sendTradeResponse = event => {
    this.session.publish(substituteEndpoint(constants.TRADE_PUBLISHER));
  };

  sendAuctionResponse = event => {
    this.session.publish(substituteEndpoint(constants.AUCTION_PUBLISHER));
  };

  sendBSMResponse = event => {
    this.session.publish(substituteEndpoint(constants.BSM_PUBLISH));
  };

  sendJailDecisionResponse = event => {
    this.session.publish(substituteEndpoint(constants.JAIL_PUBLISHER));
  };

  subscribeToEvents = () => {
    const { gameId, agentId } = this;
    this.session.subscribe(
      substituteEndpoint(constants.TRADE_RECEIVER, agentId, gameId),
      this.receiveTradeRequest
    );
    this.session.subscribe(
      substituteEndpoint(constants.AUCTION_RECEIVER, agentId, gameId),
      this.receiveAuctionRequest
    );
    this.session.subscribe(
      substituteEndpoint(constants.BSM_RECEIVER, agentId, gameId),
      this.receiveBSMRequest
    );
    this.session.subscribe(
      substituteEndpoint(constants.JAIL_RECEIVER, agentId, gameId),
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
