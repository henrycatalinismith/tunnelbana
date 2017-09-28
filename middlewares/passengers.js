import uuid from "uuid/v1";
import actions from "../actions";
import { select } from "../reducers";

export function alightTrains(store, action) {
  const state = store.getState();
  const trainPassengers = select("passengers")
    .from(state)
    .byTrainId(action.journey.trainId);

  if (trainPassengers.size > 0) {
    store.dispatch(
      actions.alight(
        trainPassengers.first().get("id"),
        action.journey.destinationId
      )
    );
  }
}

export function boardTrains(store, action) {
  const state = store.getState();
  const platformPassengers = select("passengers")
    .from(state)
    .byStationId(action.journey.destinationId);

  if (platformPassengers.size > 0) {
    store.dispatch(
      actions.board(
        platformPassengers.first().get("id"),
        action.journey.trainId
      )
    );
  }
}
