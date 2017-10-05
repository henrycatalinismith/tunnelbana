import Immutable from "immutable";
import actions from "../../actions";
import { reducer, selectors } from "../terminals";

describe("terminals", () => {
  describe("reducer", () => {
    it("adds a terminal to the store on CREATE_TERMINAL", () => {
      const state = new Immutable.Map();
      const action = actions.createTerminal({
        id: "Example Terminal",
        connectionId: "Connection 1",
        lineId: "Red",
        stationId: "Liljeholmen"
      });
      const newState = reducer(state, action);

      expect(newState.toJS()).toEqual({
        "Example Terminal": {
          id: "Example Terminal",
          connectionId: "Connection 1",
          lineId: "Red",
          stationId: "Liljeholmen",
          isSelected: false
        }
      });
    });
  });

  describe("selectors", () => {
    it("all() returns an array of terminals", () => {
      const state = Immutable.fromJS({
        "Terminal 1": {},
        "Terminal 2": {}
      });
      const output = selectors.all(state);
      expect(output.toJS()).toEqual([{}, {}]);
    });

    it("byId() returns a single terminal", () => {
      const state = Immutable.fromJS({
        "Terminal 1": { id: "Terminal 1" },
        "Terminal 2": { id: "Terminal 2" }
      });
      const output = selectors.byId(state, "Terminal 1");
      expect(output.toJS()).toEqual({ id: "Terminal 1" });
    });
  });
});
