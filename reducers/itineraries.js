import Immutable from "immutable";
import { createReducer } from "redux-create-reducer";
import actions from "../actions";

export const reducer = createReducer(new Immutable.Map(), {
  [actions.CREATE_PASSENGER](state, action) {
    return state.merge(Immutable.fromJS(action.itinerary));
  },

  [actions.ALIGHT](state, action) {
    return state.merge(Immutable.fromJS(action.itinerary));
  }
});

export const selectors = {
  all(state) {
    return state;
  },

  byPassengerId(state, passengerId) {
    return state.filter(t => t.get("passengerId") === passengerId).toList();
  },

  forBoardingDecision(state, journey) {
    return state.filter(t => {
      //const journeyMatchesPassenger = journey.destination;
      //return
    });
  }
};
