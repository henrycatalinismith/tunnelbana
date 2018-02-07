import { createActions } from "signalbox";

export default createActions(["CREATE_STATION", "SELECT_STATION"], types => ({
  createStation: station => ({
    type: types.CREATE_STATION,
    station: station
  }),

  selectStation: station => ({
    type: types.SELECT_STATION,
    station: station
  }),
}));



