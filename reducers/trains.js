import Immutable from 'immutable';
import { createReducer } from 'redux-create-reducer';
import actions from '../actions';

export default createReducer(new Immutable.Map, {
  [actions.ADD_TRAIN](state, action) {
    return state.set(action.train.id, Immutable.fromJS({
      id: action.train.id,
      lineId: action.train.lineId,
      stationId: action.train.stationId,
    }));
  },

  [actions.DEPARTURE](state, action) {
    return state.setIn(
      [action.journey.trainId, 'journeyId'],
      action.journey.id
    );
  },

  [actions.ARRIVAL](state, action) {
    return state.updateIn([action.journey.trainId], t => {
      return t.merge({
        stationId: action.journey.destinationId,
        journeyId: undefined,
      })
    });
  },
});

export function trains(state) {
  return state.toList();
}

export function train(state, id) {
  return state.get(id);
}
