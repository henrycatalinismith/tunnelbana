import uuid from 'uuid/v1';
import actions from '../actions';

export default function(state = {}, action) {
  switch (action.type) {
    case actions.ADD_STATION:
      const stationId = action.station.id || uuid();
      return {...state, [stationId]: {
        stationId,
        ...action.station,
      }};

    default:
      return state;
  }
}

export function stations(state) {
  return Object.keys(state).map(stationId => state[stationId]);
}

export function station(state, stationId) {
  return state[stationId];
}
