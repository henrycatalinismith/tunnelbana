import { createActions } from "signalbox";

export default createActions(["CREATE_HEXAGON"], types => ({
  createHexagon: ({ x, y }) => ({
    type: types.CREATE_HEXAGON,
    hexagon: { x, y }
  })
}));



