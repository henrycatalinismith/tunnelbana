const PriorityQueue = require("shuffled-priority-queue");

const actions = require("../actions").default;
const select = require("../reducers/selectors").select;
const cube = require("../geometry/cube").default;

export default {
  createConnection(x1, y1, z1, x2, y2, z2) {
    return (dispatch, getState) => {
      const state = getState();
      const hexagons = state.get("hexagons");
      const stations = state.get("stations");
      const trax = state.get("tracks");

      const from = { x: x1, y: y1, z: z1 };
      const goal = { x: x2, y: y2, z: z2 };

      const source = select.stations.at(stations, 0, x1, y1, z1).toJS();
      const destination = select.stations.at(stations, 0, x2, y2, z2).toJS();

      const connection = {
        id: [source.id, destination.id].join(":"),
        sourceId: source.id,
        destinationId: destination.id,
      };

      const frontier = PriorityQueue();
      frontier.add({
        priority: 0,
        value: from,
      });

      const start = [x1, y1, z1].join(",");

      const came_from = { [start]: null };
      const cost_so_far = { [start]: 0 };

      let current = null;
      while (current = frontier.next(current)) {
        const { x, y, z } = current.value;
        const id = [x, y, z].join(",");

        if (x === goal.x && y === goal.y && z === goal.z) {
          break;
        }

        const neighbors = cube.neighbors(current.value);
        for (let next of neighbors) {
          const hexagon = select.hexagons.at(hexagons, 0, next.x, next.y, next.z);
          if (hexagon && hexagon.get("terrainId") !== "water" && hexagon.get("terrainId") !== "forest") {
            const tracksHere = select.tracks.at(trax, next.x, next.y, next.z);
            const heuristic = tracksHere.size > 0 ? 2 : 1;
            const nextId = [next.x, next.y, next.z].join(",");
            const new_cost = cost_so_far[id] + heuristic;

            if (typeof cost_so_far[nextId] === 'undefined' || new_cost < cost_so_far[nextId]) {
              cost_so_far[nextId] = new_cost;

              const priority = new_cost;
              frontier.add({
                priority,
                value: next,
              });
              came_from[nextId] = current.value;
            }
          }
        }
      }

      current = goal;
      const tracks = {};
      const dots = [];
      let ordinality = 0;

      while (current.x !== from.x || current.y !== from.y || current.z !== from.z) {
        dots.push(current);
        let next = came_from[([current.x, current.y, current.z].join(","))];

        const id = [connection.id, current.x, current.y, current.z].join(",");
        tracks[id] = {
          id,
          connectionId: connection.id,
          x1: current.x, y1: current.y, z1: current.z,
          x2: next.x, y2: next.y, z2: next.z,
          ordinality,
        };

        current = next;
        ordinality++;
      }

      const action = actions.createConnection({
        connection,
        tracks
      });

      dispatch(action);
    }
  }
};
