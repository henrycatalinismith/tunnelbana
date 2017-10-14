import { createMiddleware } from "signalbox";
import uuid from "uuid/v1";
import actions from "../actions";
import { select } from "../reducers";

export const middleware = createMiddleware((before, after) => ({
  [before(actions.CREATE_PASSENGER)]: function inferPassengerProperties(
    store,
    action
  ) {
    if (!action.passenger.id) {
      action.passenger.id = uuid();
    }

    if (!action.gender.id) {
      action.gender.id = "circle";
    }
  },

  [after(actions.ARRIVAL)]: function alightTrains(store, { journey }) {
    const state = store.getState();
    const trainPassengers = select("passengers")
      .from(state)
      .byTrainId(journey.trainId);

    if (trainPassengers.size > 0) {
      store.dispatch(
        actions.alight({
          passengerId: trainPassengers.first().get("id"),
          stationId: journey.destinationId
        })
      );
    }

    /*
    const platformPassengers = select("passengers")
      .from(state)
      .byStationId(journey.destinationId);
    if (platformPassengers.size > 0) {
      store.dispatch(
        actions.board({
          passengerId: platformPassengers.first().get("id"),
          trainId: journey.trainId
        })
      );
    }
    */
  }
}));
