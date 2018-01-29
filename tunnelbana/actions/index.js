import { actions as connectionActions } from "./connections";
import { actions as dragonActions } from "./dragon";
import { actions as gameActions } from "./game";
import { actions as journeyActions } from "./journeys";
import { actions as lineActions } from "./lines";
import { actions as passengerActions } from "./passengers";
import { actions as stationActions } from "./stations";
import { actions as terminalActions } from "./terminals";
import { actions as trackActions } from "./tracks";
import { actions as trainActions } from "./trains";
import { actions as windowActions } from "./window";

export default {
  ...connectionActions,
  ...dragonActions,
  ...gameActions,
  ...journeyActions,
  ...lineActions,
  ...passengerActions,
  ...stationActions,
  ...terminalActions,
  ...trackActions,
  ...trainActions,
  ...windowActions
};
