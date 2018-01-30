import { createActions } from "signalbox";

export default createActions(["CHANGE_TERRAIN"], types => ({
  changeTerrain: (x, y, z, id) => ({
    type: types.CHANGE_TERRAIN,
    hexagon: { x, y, z },
    terrain: { id },
  }),

  changeTerrainRing: (x, y, z, radius, id) => ({
    type: types.CHANGE_TERRAIN,
    ring: { x, y, z, radius },
    terrain: { id },
  }),
}));



