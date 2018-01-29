import { createActions } from "signalbox";

export default createActions(["CREATE_STATION"], types => ({
  createStation: ({ id, hexagonId }) => ({
    type: types.CREATE_STATION,
    station: { id },
    hexagon: { id: hexagonId }
  }),
}));



