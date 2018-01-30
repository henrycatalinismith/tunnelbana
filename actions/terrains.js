import { createActions } from "signalbox";

export default createActions(["CHANGE_TERRAIN"], types => ({
  changeTerrain: ({ hexagonId, terrainId }) => ({
    type: types.CHANGE_TERRAIN,
    hexagon: { id: hexagonId },
    terrain: { id: terrainId },
  }),
}));



