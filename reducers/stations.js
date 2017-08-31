import { createReducer } from 'redux-create-reducer';
import actions from '../actions';

export default createReducer({}, {
  [actions.ADD_STATION](state, action) {
    const id = action.station.id;
    return {...state, [id]: {
      id,
      x: action.station.x,
      y: action.station.y,
    }};
  },

  [actions.IMPORT_STATION](state, action) {
    const id = action.station.id;
    return {...state, [id]: {
      id,
      x: action.station.x,
      y: action.station.y,
    }};
  }
});

export function stations(state) {
  return Object.keys(state).map(id => state[id]);
}

export function station(state, id) {
  return state[id];
}
