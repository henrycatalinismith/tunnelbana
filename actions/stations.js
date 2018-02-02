import { createActions } from "signalbox";

export default createActions(["CREATE_STATION"], types => ({
  createStation: station => ({
    type: types.CREATE_STATION,
    station: station
  }),
}));



