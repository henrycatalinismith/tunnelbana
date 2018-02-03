const Immutable = require("immutable");
const { createReducer } = require("signalbox");

const actions = require("../actions").default;
const cube = require("../geometry/cube").default;

const initialState = new Immutable.Map;

let selection;

export const reducer = createReducer(initialState, {
  [actions.CREATE_CELL](hexagons, action) {
    return hexagons.merge(Immutable.fromJS(action.hexagons));
  },

  [actions.CHANGE_TERRAINS](hexagons, action) {
    let newState = hexagons;

    for (let change of action.hexagons) {
      newState = newState.updateIn([change.id], h => {
        return h.merge({
          terrainId: change.terrainId,
          terrainHeight: change.terrainHeight,
        });
      });
    }

    return newState;
  },

  [actions.SELECT_HEXAGON](state, { hexagon }) {
    const oldSelection = selection;
    selection = hexagon.id;
    let newState = state;

    if (oldSelection) {
      newState = newState.updateIn([oldSelection], h => {
        return h.merge(Immutable.fromJS({
          isSelected: false,
        }));
      });
    }

    newState = newState.updateIn([hexagon.id], h => {
      return h.merge(Immutable.fromJS({
        isSelected: true,
      }));
    });

    return newState;
  },
});

export const selectors = {
  all: hexagons => {
    return hexagons.toList();
  },

  byId: (hexagons, id) => {
    return hexagons.get(id);
  },

  forCamera(hexagons, camera) {
    const cellId = camera.get("cellId");
    const hexagonId = camera.get("hexagonId");
    const [, x, y, z] = hexagonId.split(",");
    const radius = camera.get("radius");

    const center = { x, y, z };
    const withinRadius = h => {
      return cube.distance(center, {
        x: h.get("x"),
        y: h.get("y"),
        z: h.get("z"),
      }) < radius;
    };

    return hexagons
      .filter(h => h.get("cellId") === cellId)
      .filter(h => withinRadius(h))
      .toList()
      .sort((a, b) => {
        const az = a.get("z");
        const bz = b.get("z");
        const ah = a.get("terrainHeight");
        const bh = b.get("terrainHeight");
        if (az > bz) return 1;
        if (az < bz) return -1;
        if (ah > bh) return 1;
        if (ah < bh) return -1;
        return 0;
      })
  },

  at(hexagons, cellId, x, y, z) {
    return hexagons.filter(h => {
      const sameCell = h.get("cellId") === cellId;
      const sameX = h.get("x") === x;
      const sameY = h.get("y") === y;
      const sameZ = h.get("z") === z;
      const isMatch = sameCell && sameX && sameY && sameZ;
      return isMatch;
    }).first();
  },

  ring(hexagons, cellId, x, y, z, radius) {
    const ring = cube.ring(cube(x, y, z), radius).map(
      h => [cellId, h.x, h.y, h.z].join(",")
    );

    return hexagons.filter(h => {
      const sameId = ring.includes(h.get("id"));
      return sameId;
    }).toList();
  },
};
