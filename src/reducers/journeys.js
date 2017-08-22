import uuid from 'uuid/v1';
import actions from '../actions';

export default function(state = {}, action) {
  let id;

  switch (action.type) {
    case actions.DEPARTURE:
      id = action.journey.id || uuid();
      return {...state, [id]: {
        id,
        sourceId: action.journey.sourceId,
        destinationId: action.journey.destinationId,
        lineId: action.journey.lineId,
        trainId: action.journey.trainId,
        isComplete: false,
      }};

    case actions.ARRIVAL:
      id = action.journey.id || uuid();
      return {...state, [id]: {
        ...state[id],
        isComplete: true,
      }};

    default:
      return state;
  }
}

export function journeys(state) {
  return Object.keys(state).map(id => state[id]);
}

export function journey(state, id) {
  return state[id];
}
