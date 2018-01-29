import Immutable from "immutable";
import { createReducer } from "signalbox";
import actions from "../actions";

export const reducer = createReducer(new Immutable.Map(), {
  [actions.CREATE_PASSENGER](state, action) {
    const oldStops = selectors.byPassengerId(state, action.passenger.id);
    const newStops = action.itinerary;

    const oldIds = oldStops.map(i => track.i("id")).toJS();
    const newIds = Object.keys(newStops);

    const deleteIds = oldIds.filter(oldId => {
      const goneInNewIds = !newIds.includes(oldId);
      return goneInNewIds;
    });

    return state.merge(Immutable.fromJS(action.itinerary)).deleteAll(deleteIds);
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
    return state
      .filter(t => t.get("passengerId") === passengerId)
      .toList()
      .sort((a, b) => {
        const aOrdinality = a.get("ordinality");
        const bOrdinality = b.get("ordinality");
        if (aOrdinality === bOrdinality) {
          return 0;
        } else if (aOrdinality > bOrdinality) {
          return 1;
        } else {
          return -1;
        }
      });
  },

  forBoardingDecision(state, journey) {
    return state.filter(t => {
      //const journeyMatchesPassenger = journey.destination;
      //return
    });
  }
};
