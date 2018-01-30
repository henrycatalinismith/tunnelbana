import { createActions } from "signalbox";

export default createActions(["CREATE_STATION"], types => ({
  createStation: (x, y, z) => ({
    type: types.CREATE_STATION,
    station: {},
    cell: {},
    hexagon: { x, y, z },
  }),
}));



