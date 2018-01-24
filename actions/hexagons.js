import { createActions } from "signalbox";

export default createActions(["CREATE_HEXAGON", "SELECT_HEXAGON"], types => ({
  createHexagon: (x, y, z) => ({
    type: types.CREATE_HEXAGON,
    hexagon: { x, y, z }
  }),

  selectHexagon: id => ({
    type: types.SELECT_HEXAGON,
    hexagon: { id }
  })
}));



