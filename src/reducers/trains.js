import uuid from 'uuid/v1';
import actions from '../actions';

export default function(state = {}, action) {
  let train;

  switch (action.type) {
    case actions.ADD_TRAIN:
      const id = action.train.id || uuid();
      return {...state, [id]: {
        id,
        lineId: action.train.lineId,
        stationId: action.train.stationId,
      }};

    case actions.ARRIVAL:
      train = state[action.arrival.trainId];
      return {...state, [train.id]: {
        ...train,
        stationId: action.arrival.destinationId,
      }};
      break;

    default:
      return state;
  }
}

export function trains(state) {
  return Object.keys(state).map(id => state[id]);
}

export function train(state, id) {
  return state[id];
}
