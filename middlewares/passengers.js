import uuid from "uuid/v1";
import actions from "../actions";
import { select } from "../reducers";

export default function(store) {
  return next => action => {
    const ret = next(action);

    switch (action.type) {
      case actions.ARRIVAL:
        const state = store.getState();
        const platformPassengers = select("passengers")
          .from(state)
          .byStationId(action.journey.destinationId);
        const trainPassengers = select("passengers")
          .from(state)
          .byTrainId(action.journey.trainId);

        if (platformPassengers.size > 0) {
          store.dispatch(
            actions.board(
              platformPassengers.first().get("id"),
              action.journey.trainId
            )
          );
        }

        if (trainPassengers.size > 0) {
          store.dispatch(
            actions.alight(
              trainPassengers.first().get("id"),
              action.journey.destinationId
            )
          );
        }
        break;
    }

    return ret;
  };
}
