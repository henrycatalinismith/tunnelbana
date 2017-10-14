import { createMiddleware } from "signalbox";
import uuid from "uuid/v1";
import actions from "../actions";
import { select } from "../reducers";

const planItinerary = (store, action) => {
  return {};
};

export const middleware = createMiddleware((before, after) => ({
  [before(actions.CREATE_PASSENGER)](store, action) {
    action.itinerary = planItinerary(store, action);
    console.log("precompute itinerary for new passenger");
    console.log(action.itinerary);
  },

  [before(actions.ALIGHT)](store, action) {
    action.itinerary = planItinerary(store, action);
    console.log("precompute itinerary for next step");
    console.log(action.itinerary);
  }
}));
