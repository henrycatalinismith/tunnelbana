import { createReducer } from 'redux-create-reducer';
import actions from '../actions';

export default createReducer({}, {
  [actions.DEPARTURE](state, action) {
    const id = action.journey.id;
    return {...state, [id]: {
      id,
      sourceId: action.journey.sourceId,
      destinationId: action.journey.destinationId,
      connectionId: action.journey.connectionId,
      lineId: action.journey.lineId,
      trainId: action.journey.trainId,
      isComplete: false,
    }};
  },

  [actions.ARRIVAL](state, action) {
    const id = action.journey.id;
    let { [id]: {}, ...rest } = state;
    return rest;
  }
});

export function journeys(state) {
  return Object.keys(state).map(id => state[id]);
}

export function journey(state, id) {
  return state[id];
}
