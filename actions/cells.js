import { createActions } from "signalbox";

export default createActions(["CREATE_CELL"], types => ({
  createCell: (cell, hexagons) => ({
    type: types.CREATE_CELL,
    cell,
    hexagons,
  }),
}));



