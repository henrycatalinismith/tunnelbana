import Immutable from 'immutable';
import { createReducer } from 'redux-create-reducer';
import actions from '../actions';

export default createReducer(new Immutable.Map, {
  [actions.ADD_TERMINAL](state, action) {
    return state.set(action.terminal.id, Immutable.fromJS({
      id: action.terminal.id,
      connectionId: action.terminal.connectionId,
      lineId: action.terminal.lineId,
      stationId: action.terminal.stationId,
      isSelected: false,
    }));
  },

  [actions.ADD_CONNECTION](state, action) {
    const { lineId, sourceId, destinationId } = action.connection;
    const newSource = terminalByLineAndStation(state, lineId, sourceId);
    const newDestination = terminalByLineAndStation(state, lineId, destinationId);

    if (newSource && !newDestination) {
      return state.setIn(
        [newSource.id, 'stationId'],
        action.connection.destinationId
      );
    }

    return state;
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
  return state.toList();
}

export function terminal(state, id) {
  return state.get(id);
}

export function terminalByLineAndStation(state, lineId, stationId) {
  return state.filter(t => (
    t.lineId === lineId && t.stationId === stationId
  ))[0];
}
