import { createActions } from "signalbox";

export default createActions(["CREATE_HEXAGON", "SELECT_HEXAGON"], types => ({
  selectHexagon: id => ({
    type: types.SELECT_HEXAGON,
    hexagon: { id }
  })
}));



