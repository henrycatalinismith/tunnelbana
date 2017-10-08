import { createMiddleware } from "signalbox";
import actions from "../actions";
import { middleware as connections } from "./connections";
import { middleware as dragon } from "./dragon";
import { middleware as game } from "./game";
import { middleware as journeys } from "./journeys";
import { middleware as lines } from "./lines";
import { middleware as passengers } from "./passengers";
import { middleware as stations } from "./stations";
import { middleware as terminals } from "./terminals";
import { middleware as tracks } from "./tracks";
import { middleware as trains } from "./trains";
import { middleware as window } from "./window";

export default createMiddleware([
  connections,
  dragon,
  game,
  journeys,
  lines,
  passengers,
  stations,
  terminals,
  tracks,
  trains,
  window
]);
