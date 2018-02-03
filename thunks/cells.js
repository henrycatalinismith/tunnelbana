const actions = require("../actions").default;
const cube = require("../geometry/cube").default;

let cellId = 0;

export default {
  createCell(radius) {
    return (dispatch, getState) => {
      const cell = {
        id: cellId++,
        radius,
      };

      const hexagons = {};

      const center = cube(0, 0, 0);
      let makeId = (c, x, y, z) => [c, x, y, z].join(",");
      let id = makeId(cell.id, 0, 0, 0);

      hexagons[id] = {
        id,
        cellId: cell.id,
        cellRadius: radius,
        terrainId: "grass",
        terrainHeight: 10,
        x: 0,
        y: 0,
        z: 0,
      }

      for (let i = 0; i <= radius; i++) {
        const ring = cube.ring(center, i);
        for (let r of ring) {
          id = makeId(cell.id, r.x, r.y, r.z);

          hexagons[id] = {
            id,
            cellId: cell.id,
            cellRadius: radius,
            terrainId: "grass",
            x: r.x,
            y: r.y,
            z: r.z,
          };
        }
      }

      const action = actions.createCell(cell, hexagons);
      dispatch(action);
    }
  }
};



