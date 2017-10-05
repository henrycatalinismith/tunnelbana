import { createMiddleware } from "signalbox";
import uuid from "uuid/v1";
import actions from "../actions";
import { select } from "../reducers";

export const middleware = createMiddleware((before, after) => ({
  [before(actions.CREATE_PASSENGER)](store, action) {
    if (!action.passenger.id) {
      action.passenger.id = uuid();
    }
  },

  [after(actions.ARRIVAL)](store, { journey }) {
    const state = store.getState();
    const trainPassengers = select("passengers")
      .from(state)
      .byTrainId(journey.trainId);

    if (trainPassengers.size > 0) {
      store.dispatch(
        actions.alight(trainPassengers.first().get("id"), journey.destinationId)
      );
    }
  },

  [after(actions.ARRIVAL)](store, { journey }) {
    const state = store.getState();
    const platformPassengers = select("passengers")
      .from(state)
      .byStationId(journey.destinationId);

    if (platformPassengers.size > 0) {
      store.dispatch(
        actions.board(platformPassengers.first().get("id"), journey.trainId)
      );
    }
  }
}));
