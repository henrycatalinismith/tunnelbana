import Immutable from 'immutable';
import { createReducer } from 'redux-create-reducer';
import actions from '../actions';

export default createReducer(new Immutable.Map, {
  [actions.ADD_STATION](state, action) {
    return state.set(action.station.id, Immutable.fromJS({
      id: action.station.id,
      x: action.station.x,
      y: action.station.y,
    }));
  },

  [actions.IMPORT_STATION](state, action) {
    return state.set(action.station.id, Immutable.fromJS({
      id: action.station.id,
      x: action.station.x,
      y: action.station.y,
    }));
  }
});

export function stations(state) {
  return state.toList();
}

export function station(state, id) {
  return state.get(id);
}
