import { createActions } from "signalbox";

export default createActions(["CREATE_STATION"], types => ({
  createStation: ({ id, cellId, hexagonId }) => ({
    type: types.CREATE_STATION,
    station: { id },
    cell: { id: cellId },
    hexagon: { id: hexagonId },
  }),
}));



