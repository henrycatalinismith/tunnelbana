import { createActions } from "signalbox";

export default createActions(["CREATE_HEXAGON", "SELECT_HEXAGON"], types => ({
  createHexagon: ({ x, y }) => ({
    type: types.CREATE_HEXAGON,
    hexagon: { x, y }
  }),

  selectHexagon: id => ({
    type: types.SELECT_HEXAGON,
    hexagon: { id }
  })
}));



