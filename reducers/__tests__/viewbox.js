import Immutable from "immutable";
import actions from "../../actions";
import { reducer, selectors } from "../viewbox";

describe("viewbox", () => {
  describe("reducer", () => {
    it("adds a station to the store on ADD_STATION", () => {
      const action = actions.windowResize({
        width: 100,
        height: 200
      });
      const newState = reducer(undefined, action);

      expect(newState.toJS()).toEqual({
        minX: 0,
        minY: 0,
        width: 100,
        height: 200
      });
    });
  });

  describe("selectors", () => {
    it("all() returns just the viewbox", () => {
      const state = Immutable.fromJS({
        width: 100
      });
      const output = selectors.all(state);
      expect(output.toJS()).toEqual({ width: 100 });
    });
  });
});
