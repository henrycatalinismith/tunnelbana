import { createMiddleware } from "signalbox";
import actions from "../actions";
import * as dragon from "./dragon";
import * as journeys from "./journeys";
import * as passengers from "./passengers";
import * as terminals from "./terminals";
import * as tracks from "./tracks";

const middleware = createMiddleware((before, after) => ({
  [before(actions.DRAGON_MOVE)]: dragon.injectEntity,
  [after(actions.ADD_CONNECTION)]: tracks.addTracks,
  [after(actions.ADD_CONNECTION)]: terminals.addTerminal,

  [after(actions.DEPARTURE)]: journeys.animateJourney,
  [after(actions.ARRIVAL)]: passengers.alightTrains,
  [after(actions.ARRIVAL)]: passengers.boardTrains,
  [after(actions.ARRIVAL)]: journeys.scheduleDeparture
}));

export default middleware;
