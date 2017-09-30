import { createMiddleware } from "signalbox";
import actions from "../actions";
import { middleware as dragon } from "./dragon";
import { middleware as journeys } from "./journeys";
import { middleware as passengers } from "./passengers";
import { middleware as terminals } from "./terminals";
import { middleware as tracks } from "./tracks";

export default [...dragon, ...journeys, ...terminals, ...tracks, ...passengers];
