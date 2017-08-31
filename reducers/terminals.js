import { createReducer } from 'redux-create-reducer';
import actions from '../actions';

export default createReducer({}, {
  [actions.ADD_TERMINAL](state, action) {
    const id = action.terminal.id;
    return {...state, [id]: {
      id,
      connectionId: action.terminal.connectionId,
      lineId: action.terminal.lineId,
      stationId: action.terminal.stationId,
      isSelected: false,
    }};
  },

  [actions.ADD_CONNECTION](state, action) {
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
  },

  [actions.SELECT_TERMINAL](state, action) {
    const terminalId = action.terminalId;
    return { ...state, [terminalId]: {
      ...state[terminalId],
      isSelected: true,
    }};
  },

  [actions.DESELECT_TERMINAL](state, action) {
    const terminalId = action.terminalId;
    return { ...state, [terminalId]: {
      ...state[terminalId],
      isSelected: false,
      x: undefined,
      y: undefined,
    }};
  },

  [actions.MOVE_TERMINAL](state, action) {
    const terminalId = action.terminalId;
    return { ...state, [terminalId]: {
      ...state[terminalId],
      x: action.x,
      y: action.y,
    }};
  }
});

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
