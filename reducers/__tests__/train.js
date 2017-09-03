import Immutable from "immutable";
import actions from "../../actions";
import { reducer, selectors } from "../trains";

describe("trains", () => {
  describe("reducer", () => {
    it("adds a train to the store on ADD_TRAIN", () => {
      const state = new Immutable.Map();
      const action = actions.addTrain({
        id: "Thomas"
      });
      const newState = reducer(state, action);

      expect(newState.toJS()).toEqual({
        Thomas: {
          id: "Thomas",
          lineId: undefined,
          stationId: undefined
        }
      });
    });

    it("attaches a journey to a train on DEPARTURE", () => {
      const state = Immutable.fromJS({
        Thomas: {
          journeyId: undefined
        }
      });
      const action = actions.departure({ id: "123", trainId: "Thomas" });
      const newState = reducer(state, action);

      expect(newState.toJS().Thomas.journeyId).toBe("123");
    });

    it("deattaches a journey from a train on ARRIVAL", () => {
      const state = Immutable.fromJS({
        Thomas: {
          journeyId: "123"
        }
      });
      const action = actions.arrival({ trainId: "Thomas" });
      const newState = reducer(state, action);

      expect(newState.toJS().Thomas.journeyId).toBe(undefined);
    });
  });

  describe("selectors", () => {
    it("all() returns an array of trains", () => {
      const state = Immutable.fromJS({
        "Train 1": {},
        "Train 2": {}
      });
      const output = selectors.all(state);
      expect(output.toJS()).toEqual([{}, {}]);
    });

    it("byId() returns a single train", () => {
      const state = Immutable.fromJS({
        "Train 1": { id: "Train 1" },
        "Train 2": { id: "Train 2" }
      });
      const output = selectors.byId(state, "Train 1");
      expect(output.toJS()).toEqual({ id: "Train 1" });
    });
  });
});
