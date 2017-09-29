import { createMiddleware } from "signalbox";
import actions from "../actions";
import * as dragon from "./dragon";
import * as journeys from "./journeys";
import * as passengers from "./passengers";
import * as terminals from "./terminals";
import * as tracks from "./tracks";

const middleware = createMiddleware((before, after, cancel) => ({
  [cancel(actions.DRAGON_MOVE)]: dragon.redispatchMoreSpecificMove,
  [after(actions.ADD_CONNECTION)]: tracks.addTracksForNewConnection,
  [after(actions.ADD_CONNECTION)]: terminals.addTerminalForNewConnection,

  [after(actions.DEPARTURE)]: journeys.animateJourneyAfterDeparture,
  [after(actions.ARRIVAL)]: passengers.alightTrainsAfterArrival,
  [after(actions.ARRIVAL)]: passengers.boardTrainsAfterArrival,
  [after(actions.ARRIVAL)]: journeys.scheduleDeparture
}));

export default middleware;
