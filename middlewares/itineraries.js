import { createMiddleware } from "signalbox";
import uuid from "uuid/v1";
import actions from "../actions";
import { select } from "../reducers";

const planItinerary = (store, action) => {
  const state = store.getState();
  const passengerId = action.passenger.id;
  const stationId = action.station.id;

  const passenger = select("passengers")
    .from(state)
    .byId(passengerId);
  const connections = select("connections")
    .from(state)
    .byStationId(stationId)
    .toJS();
  const oldItinerary = select("itineraries")
    .from(state)
    .byPassengerId(passengerId)
    .toJS();

  let genderId;
  if (action.gender) {
    genderId = action.gender.id;
  } else if (passenger) {
    genderId = passenger.get("genderId");
  }

  const forwards = connections.filter(c => {
    return c.sourceId === stationId;
  });
  const backwards = connections.filter(c => {
    return c.destinationId === stationId;
  });

  let newItinerary = {};
  const max = 10;
  let found = false;
  const checkForwards = (connection, ordinality = 0) => {
    //console.log("checkForwards", connection, ordinality);
    const destination = select("stations")
      .from(state)
      .byId(connection.destinationId)
      .toJS();
    const nextStop = select("connections")
      .from(state)
      .forNextStop(
        connection.sourceId,
        connection.destinationId,
        connection.lineId
      )
      .connection.toJS();

    if (ordinality === 0) {
      newItinerary = {};
    } else {
      const i = Object.keys(newItinerary).length;
      const id = oldItinerary[i] ? oldItinerary[i].id : uuid();
      newItinerary[id] = {
        id,
        ordinality: ordinality - 1,
        passengerId,
        stationId: destination.id
      };

      found = destination.genderId === genderId;
    }

    if (!found && nextStop && ordinality < max) {
      checkForwards(nextStop, ordinality + 1);
    }

    //console.log(stationId, connection, destination, nextStop);
  };

  console.log(forwards.length);
  for (let i = 0; i < forwards.length && !found; i += 1) {
    checkForwards(forwards[i], 0);
  }

  if (found) {
    console.log("❤️route planned", newItinerary);
    return newItinerary;
  } else {
    console.log("💩");
    return {};
  }
};

export const middleware = createMiddleware((before, after) => ({
  [before(actions.DEPARTURE)]: function alightTrains(store, action) {
    const state = store.getState();

    const platformPassengers = select("passengers")
      .from(state)
      .byStationId(action.journey.sourceId);

    const boardablePassengers = platformPassengers.filter(p => {
      const itinerary = select("itineraries")
        .from(state)
        .byPassengerId(p.get("id"))
        .toJS();
      const firstStop = itinerary[0] || { stationId: undefined };
      const isNextDestination =
        firstStop.stationId === action.journey.destinationId;
      return isNextDestination;
    });

    if (boardablePassengers.size > 0) {
      store.dispatch(
        actions.board({
          passengerId: boardablePassengers.first().get("id"),
          trainId: action.journey.trainId
        })
      );
    }
    // board one of the boardable ones
  },

  /*
    const platformPassengers = select("passengers")
      .from(state)
      .byStationId(journey.destinationId);

    */

  [before(actions.CREATE_PASSENGER)](store, action) {
    //console.log("precompute itinerary for new passenger");
    action.itinerary = planItinerary(store, action);
    //console.log("done: ", action.itinerary);
    //console.log("-----------------------");
  },

  [before(actions.ALIGHT)](store, action) {
    //console.log("precompute itinerary for next step");
    action.itinerary = planItinerary(store, action);
    //console.log("done: ", action.itinerary);
    ////console.log("-----------------------");
  }
}));
