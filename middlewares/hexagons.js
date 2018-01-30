const { createMiddleware } = require("signalbox");
const uuid = require("uuid/v1");

const actions = require("../actions").default;
const cube = require("../geometry/cube").default;

export const middleware = createMiddleware((cancel, before, after) => ({
  [before(actions.CREATE_CELL)](store, action) {
    const center = cube(0, 0, 0);
    let makeId = (c, x, y, z) => [c, x, y, z].join(",");
    let id = makeId(action.cell.id, 0, 0, 0);

    action.hexagons = {
      [id]: {
        id,
        cellId: action.cell.id,
        cellRadius: action.cell.radius,
        terrainId: "grass",
        x: 0,
        y: 0,
        z: 0,
      }
    };

    for (let i = 0; i <= action.cell.radius; i++) {
      const ring = cube.ring(center, i);
      for (let r of ring) {
        id = makeId(action.cell.id, r.x, r.y, r.z);

        action.hexagons[id] = {
          id,
          cellId: action.cell.id,
          cellRadius: action.cell.radius,
          terrainId: "grass",
          x: r.x,
          y: r.y,
          z: r.z,
        };
      }
    }

  }
}));

export default middleware;



