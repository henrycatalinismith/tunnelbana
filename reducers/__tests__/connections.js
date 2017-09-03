import Immutable from "immutable";
import actions from "../../actions";
import { reducer, selectors } from "../connections";

describe("connections", () => {
  describe("reducer", () => {
    it("adds a connection to the store on ADD_CONNECTION", () => {
      const state = new Immutable.Map();
      const action = actions.addConnection({
        id: "Norr Mälarstrand",
        sourceId: "T-Centralen",
        destinationId: "Rådhuset",
        lineId: "Blue"
      });
      const newState = reducer(state, action);

      expect(newState.toJS()).toEqual({
        "Norr Mälarstrand": {
          id: "Norr Mälarstrand",
          sourceId: "T-Centralen",
          destinationId: "Rådhuset",
          lineId: "Blue",
          terminalId: undefined,
          tracks: []
        }
      });
    });
  });

  describe("selectors", () => {
    test("all() returns an array of connections", () => {
      const state = Immutable.fromJS({
        "Connection 1": {},
        "Connection 2": {}
      });
      const output = selectors.all(state);
      expect(output.toJS()).toEqual([{}, {}]);
    });

    test("byId() returns a single connection", () => {
      const state = Immutable.fromJS({ C1: { id: "C1" }, C2: { id: "C2" } });
      const output = selectors.byId(state, "C1");
      expect(output.toJS()).toEqual({ id: "C1" });
    });

    test("byLineId() returns only connections on the given line", () => {
      const state = Immutable.fromJS({
        R1: { id: "R1", lineId: "Red" },
        B1: { id: "B1", lineId: "Blue" }
      });
      const output = selectors.byLineId(state, "Red");
      expect(output.toJS()).toEqual([{ id: "R1", lineId: "Red" }]);
    });

    test("forNextStop() returns the next destinationId for a train", () => {
      const state = Immutable.fromJS({
        R1: {
          id: "R1",
          sourceId: "Slussen",
          destinationId: "Gamla Stan",
          lineId: "Red"
        },
        R2: {
          id: "R2",
          sourceId: "Gamla Stan",
          destinationId: "T-Centralen",
          lineId: "Red"
        }
      });
      const output = selectors.forNextStop(
        state,
        "Slussen",
        "Gamla Stan",
        "Red"
      );
      expect(output).toEqual({
        connectionId: "R2",
        destinationId: "T-Centralen"
      });
    });
  });
});
