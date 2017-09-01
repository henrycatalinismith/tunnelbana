import Immutable from 'immutable';
import { createReducer } from 'redux-create-reducer';
import actions from '../actions';

export default createReducer(new Immutable.Map, {
  [actions.DEPARTURE](state, action) {
    return state.set(action.journey.id, Immutable.fromJS({
      id: action.journey.id,
      sourceId: action.journey.sourceId,
      destinationId: action.journey.destinationId,
      connectionId: action.journey.connectionId,
      lineId: action.journey.lineId,
      trainId: action.journey.trainId,
      isComplete: false,
    }));
  },

  [actions.ARRIVAL](state, action) {
    return state.delete(action.journey.id);
  }
});

export function journeys(state) {
  return state.toList();
}

export function journey(state, id) {
  return state.get(id);
}
