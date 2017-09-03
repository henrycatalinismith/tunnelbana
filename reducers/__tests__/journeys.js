import Immutable from "immutable";
import actions from "../../actions";
import { reducer, selectors } from "../journeys";

describe("journeys", () => {
  describe("reducer", () => {
    it("adds a journey to the store on DEPARTURE", () => {
      const state = new Immutable.Map();
      const action = actions.departure({
        id: "Example Departure",
        sourceId: "Gamla Stan",
        destinationId: "Slussen",
        lineId: "Red Line",
        trainId: "Thomas"
      });
      const newState = reducer(state, action);

      expect(newState.toJS()).toEqual({
        "Example Departure": {
          id: "Example Departure",
          sourceId: "Gamla Stan",
          destinationId: "Slussen",
          lineId: "Red Line",
          trainId: "Thomas",
          isComplete: false
        }
      });
    });

    it("deletes the journey on ARRIVAL", () => {
      const state = Immutable.fromJS({
        "Example Departure": {
          isComplete: false
        }
      });
      const action = actions.arrival({ id: "Example Departure" });
      const newState = reducer(state, action);

      expect(newState.toJS()).toEqual({});
    });
  });

  describe("selectors", () => {
    it("all() returns an array of journeys", () => {
      const state = Immutable.fromJS({ "Journey 1": {}, "Journey 2": {} });
      const output = selectors.all(state);
      expect(output.toJS()).toEqual([{}, {}]);
    });

    it("byId() returns a single journey", () => {
      const state = Immutable.fromJS({
        "Journey 1": { id: "Journey 1" },
        "Journey 2": { id: "Journey 2" }
      });
      const output = selectors.byId(state, "Journey 1");
      expect(output.toJS()).toEqual({ id: "Journey 1" });
    });
  });
});
