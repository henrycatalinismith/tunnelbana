import Immutable from "immutable";
import actions from "../../actions";
import { reducer, selectors } from "../tracks";

describe("tracks", () => {
  describe("reducer", () => {
    it("adds a track to the store on ADD_TRACK", () => {
      const state = new Immutable.Map();
      const action = actions.addTrack({
        id: "Track1"
      });
      const newState = reducer(state, action);

      expect(newState.toJS()).toEqual({
        Track1: {
          id: "Track1"
        }
      });
    });
  });

  describe("selectors", () => {
    it("all() returns an array of tracks", () => {
      const state = Immutable.fromJS({
        "Track 1": {},
        "Track 2": {}
      });
      const output = selectors.all(state);
      expect(output.toJS()).toEqual([{}, {}]);
    });

    it("byId() returns a single track", () => {
      const state = Immutable.fromJS({
        "Track 1": { id: "Track 1" },
        "Track 2": { id: "Track 2" }
      });
      const output = selectors.byId(state, "Track 1");
      expect(output.toJS()).toEqual({ id: "Track 1" });
    });

    it("forJourney() returns tracks from A to B", () => {
      const state = Immutable.fromJS({
        "1": {
          id: "1",
          connectionId: "a",
          sourceId: "T-Centralen",
          destinationId: "Gamla Stan",
          ordinality: 2
        },
        "2": {
          id: "2",
          connectionId: "a",
          sourceId: "T-Centralen",
          destinationId: "Gamla Stan",
          ordinality: 1
        },
        "3": {
          id: "3",
          connectionId: "b",
          sourceId: "T-Centralen",
          destinationId: "Gamla Stan",
          ordinality: 1
        },
        "4": {
          id: "4",
          connectionId: "a",
          sourceId: "Slussen",
          destinationId: "Gamla Stan",
          ordinality: 1
        },
        "5": {
          id: "5",
          connectionId: "a",
          sourceId: "T-Centralen",
          destinationId: "Hötorget",
          ordinality: 1
        }
      });
      const output = selectors.forJourney(state, {
        connectionId: "a",
        sourceId: "T-Centralen",
        destinationId: "Gamla Stan"
      });
      expect(output.toList().toJS()).toEqual([
        state.get("2").toJS(),
        state.get("1").toJS()
      ]);
    });
  });
});
