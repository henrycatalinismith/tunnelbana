import { createReducer } from 'redux-create-reducer';
import actions from '../actions';

export default createReducer({}, {
  [actions.ADD_TRAIN](state, action) {
    const id = action.train.id;
    return {...state, [id]: {
      id,
      lineId: action.train.lineId,
      stationId: action.train.stationId,
    }};
  },

  [actions.DEPARTURE](state, action) {
    const train = state[action.journey.trainId];
    return {...state, [train.id]: {
      ...train,
      journeyId: action.journey.id,
    }};
  },

  [actions.ARRIVAL](state, action) {
    const train = state[action.journey.trainId];
    return {...state, [train.id]: {
      ...train,
      stationId: action.journey.destinationId,
      journeyId: undefined,
    }};
  },
});

export function trains(state) {
  return Object.keys(state).map(id => state[id]);
}

export function train(state, id) {
  return state[id];
}
