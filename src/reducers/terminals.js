import uuid from 'uuid/v1';
import actions from '../actions';

export default function(state = {}, action) {
  switch (action.type) {
    case actions.ADD_TERMINAL:
      const id = action.terminal.id || uuid();
      return {...state, [id]: {
        id,
        connectionId: action.terminal.connectionId,
        lineId: action.terminal.lineId,
        stationId: action.terminal.stationId,
      }};

    case actions.ADD_CONNECTION:
      const { lineId, sourceId, destinationId } = action.connection;
      const newSource = terminalByLineAndStation(state, lineId, sourceId);
      const newDestination = terminalByLineAndStation(state, lineId, destinationId);

      const changes = {};
      if (newSource && !newDestination) {
        changes[newSource.id] = {
          ...newSource,
          stationId: action.connection.destinationId,
        };
      }

      return { ...state, ...changes };

    default:
      return state;
  }
}

export function terminals(state) {
  return Object.keys(state).map(id => state[id]);
}

export function terminal(state, id) {
  return state[id];
}

export function terminalByLineAndStation(state, lineId, stationId) {
  return terminals(state).filter(t => (
    t.lineId === lineId && t.stationId === stationId
  ))[0];
}
