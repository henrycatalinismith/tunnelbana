const Immutable = require("immutable");
const { createReducer } = require("signalbox");

const actions = require("../actions").default;

const initialState = new Immutable.Map;

let selection;

export const reducer = createReducer(initialState, {
  [actions.CREATE_CELL](hexagons, action) {
    return hexagons.merge(Immutable.fromJS(action.hexagons));
  },

  [actions.SELECT_HEXAGON](state, { hexagon }) {
    const oldSelection = selection;
    selection = hexagon.id;
    return state;
    return {
      ...state,
      [oldSelection]: {
        ...state[oldSelection],
        isSelected: false,
      },
      [hexagon.id]: {
        ...state[hexagon.id],
        isSelected: true,
      }
    };
  },
});

export const selectors = {
  all: hexagons => {
    return hexagons.toList();
  },

  byId: (hexagons, id) => {
    return hexagons.get(id);
  },

  byCell(state, cellId) {
    return state.filter(h => h.get("cellId") === cellId).toList();
  },

  byPosition(state, cellId, x, y, z) {
    return state.filter(h => {
      const sameCell = h.get("cellId") === cellId;
      const sameX = h.get("x") === x;
      const sameY = h.get("y") === y;
      const sameZ = h.get("z") === z;
      const isMatch = sameCell && sameX && sameY && sameZ;
      return isMatch;
    }).first();
  },
};

/*
  byGrid(state, cellId) {
    return state.filter(h => h.get("cellId") === cellId).toList();
  },

  byGrid: (hexagons, x, y, z) => {
    const matchId = Object.keys(hexagons).filter(id => {
      const isMatch = (
        hexagons[id].x === x &&
        hexagons[id].y === y &&
        hexagons[id].z === z
      );
      return isMatch;
    })[0];
    return hexagons[matchId];
  }


const flatten = arr => arr.reduce(
  (a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []
);




/*
const Immutable = require("immutable");
const { createReducer } = require("signalbox");

const actions = require("../actions").default;

const initialState = new Immutable.Map;

export const reducer = createReducer(initialState, {
  [actions.CREATE_STATION](state, action) {
    return state.set(
      action.station.id,
      Immutable.fromJS({
        id: action.station.id,
        cellId: action.cell.id,
        hexagonId: action.hexagon.id,
      })
    );
  }
});

export const selectors = {
  all(state) {
    return state.toList();
  },

  byId(state, id) {
    return state.get(id);
  },

  byCell(state, cellId) {
    return state.filter(s => s.get("cellId") === cellId).toList();
  },
};

*/
