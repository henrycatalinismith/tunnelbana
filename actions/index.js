import { actions as connectionActions } from "./connections";
import * as dragon from "./dragon";
import * as game from "./game";
import * as journeys from "./journeys";
import * as lines from "./lines";
import * as passengers from "./passengers";
import * as stations from "./stations";
import * as terminals from "./terminals";
import * as tracks from "./tracks";
import * as trains from "./trains";
import * as window from "./window";

export default {
  ...connectionActions,
  ...dragon,
  ...game,
  ...journeys,
  ...lines,
  ...passengers,
  ...stations,
  ...terminals,
  ...tracks,
  ...trains,
  ...window
};
