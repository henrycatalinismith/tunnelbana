const { createMiddleware } = require("signalbox");
const uuid = require("uuid/v1");

const actions = require("../actions").default;
const cube = require("../geometry/cube").default;

export const middleware = createMiddleware((cancel, before, after) => ({
  [before(actions.CREATE_CELL)](store, action) {
    const center = cube(0, 0, 0);
    let id = uuid();

    action.hexagons = {
      [id]: {
        id,
        cellId: action.cell.id,
        x: 0,
        y: 0,
        z: 0,
      }
    };

    for (let i = 0; i <= action.cell.radius; i++) {
      const ring = cube.ring(center, i);
      for (let r of ring) {
        id = uuid();

        action.hexagons[id] = {
          id,
          cellId: action.cell.id,
          x: r.x,
          y: r.y,
          z: r.z,
        };
      }
    }
  }
}));

export default middleware;



