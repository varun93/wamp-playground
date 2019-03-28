export const ROUTER_ENDPOINT = "ws://127.0.0.1:80/ws";
export const APPLICATION_REALM = "realm1";

// action button string

export const TRADE_ACTION = "trade";
export const AUCTION_ACTION = "auction";
export const BSM_ACTION = "bsm";
export const JAIL_DECISION_ACTION = "jail";

// endpoints
export const BSM_RECEIVER = "monopoly.game{%game_id%}.agent{%agent_id%}.bsm.in";
export const BSM_PUBLISH = "monopoly.game{%game_id%}.agent{%agent_id%}.bsm.out";
export const BUY_RECEIVER = "monopoly.game{%game_id%}.agent{%agent_id%}.buy.in";
export const BUY_PUBLISHER =
  "monopoly.game{%game_id%}.agent{%agent_id%}.buy.out";
export const AUCTION_RECEIVER =
  "monopoly.game{%game_id%}.auction{%agent_id%}.in";
export const AUCTION_PUBLISHER =
  "monopoly.game{%game_id%}.agent{%agent_id%}.auction.out";
export const JAIL_RECEIVER =
  "monopoly.game{%game_id%}.agent{%agent_id%}.jail.in";
export const JAIL_PUBLISHER =
  "monopoly.game{%game_id%}.agent{%agent_id%}.jail.out";
export const TRADE_RECEIVER =
  "monopoly.game{%game_id%}.agent{%agent_id%}.trade.in";
export const TRADE_PUBLISHER =
  "monopoly.game{%game_id%}.agent{%agent_id%}.trade.out";
export const BROADCAST_RECEIVER =
  "monopoly.game{%game_id%}.receivestate{%agent_id%}.in";
export const BROADCAST_PUBLISHER =
  "monopoly.game{%game_id%}.agent{%agent_id%}.receivestate.out";
export const RESPOND_TRADE_RECEIVER =
  "monopoly.game{%game_id%}.agent{%agent_id%}.respondtrade.in";
export const RESPOND_TRADE_PUBLISHER =
  "monopoly.game{%game_id%}.agent{%agent_id%}.respondtrade.out";
export const CONFIRM_REGISTER =
  "monopoly.game{%game_id%}.agent{%agent_id%}.confirmregister";
export const END_GAME = "monopoly.game{%game_id%}.endgame";
