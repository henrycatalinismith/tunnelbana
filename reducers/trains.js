const Immutable = require("immutable");
const { createReducer } = require("signalbox");

const actions = require("../actions").default;

const initialState = new Immutable.Map;
let selection;

export const reducer = createReducer(initialState, {
  [actions.CREATE_TRAIN](trains, action) {
    return trains.set(
      action.train.id,
      Immutable.fromJS({
        id: action.train.id,
        speed: action.train.speed,
        cellId: action.cell.id,
        journeyId: undefined,
        stationId: action.station.id,
        terrainId: action.terrain.id,
        x: action.hexagon.x,
        y: action.hexagon.y,
        z: action.hexagon.z,
      })
    );
  },

  [actions.DEPARTURE](trains, { train, journey }) {
    return trains.updateIn([train.id], t => {
      return t.merge(Immutable.fromJS({
        stationId: undefined,
        journeyId: journey.id,
      }));
    });
  },

  [actions.ARRIVAL](trains, { train, destination }) {
    return trains.updateIn([train.id], t => {
      return t.merge(Immutable.fromJS({
        stationId: destination.id,
        journeyId: undefined,
        x: destination.x,
        y: destination.y,
        z: destination.z,
      }));
    });
  },
});

export const selectors = {
  all(trains) {
    return trains.toList();
  },

  byId(trains, id) {
    return trains.get(id);
  },

  byCell(trains, cellId) {
    return trains.filter(t => {
      const isMatch = t.get("cellId") === cellId;
      return isMatch;
    }).toList();
  },

  at(trains, cellId, x, y, z) {
    const hexagonId = [cellId, x, y, z].join(",");
    return trains.filter(t => {
      const sameCell = t.get("cellId") === cellId;
      const sameX = t.get("x") === x;
      const sameY = t.get("y") === y;
      const sameZ = t.get("z") === z;
      const isMatch = sameCell && sameX && sameY && sameZ;
      return isMatch;
    }).first();
  },
};
