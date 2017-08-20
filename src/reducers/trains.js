import uuid from 'uuid/v1';
import actions from '../actions';

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case actions.ADD_TRAIN:
      const trainId = uuid();
      return {...state, [trainId]: {
        trainId,
        ...action.train,
      }};

    default:
      return state;
  }
}

export function trains(state) {
  return Object.keys(state).map(trainId => state[trainId]);
}

export function train(state, trainId) {
  return state[trainId];
}
