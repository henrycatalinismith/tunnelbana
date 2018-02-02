import { createActions } from "signalbox";

export default createActions(["CHANGE_TERRAINS", "SELECT_HEXAGON"], types => ({
  changeTerrains: hexagons => ({
    type: types.CHANGE_TERRAINS,
    hexagons,
  }),

  selectHexagon: id => ({
    type: types.SELECT_HEXAGON,
    hexagon: { id }
  })
}));

