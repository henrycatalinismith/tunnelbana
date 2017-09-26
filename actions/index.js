import * as connections from "./connections";
import * as dragon from "./dragon";
import * as lines from "./lines";
import * as map from "./map";
import * as passengers from "./passengers";
import * as stations from "./stations";
import * as terminals from "./terminals";
import * as tracks from "./tracks";
import * as trains from "./trains";
import * as window from "./window";

export default {
  ...connections,
  ...dragon,
  ...lines,
  ...map,
  ...passengers,
  ...stations,
  ...terminals,
  ...tracks,
  ...trains,
  ...window
};
