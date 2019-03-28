export const substituteEndpoint = (endpoint, agentId, gameId) => {
  endpoint = endpoint.replace(/{%game_id%}/g, agentId);
  endpoint = endpoint.replace(/{%agent_id%}/g, gameId);
  return endpoint;
};
