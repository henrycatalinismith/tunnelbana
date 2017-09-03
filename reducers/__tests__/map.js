import Immutable from "immutable";
import actions from "../../actions";
import { reducer, selectors } from "../map";

describe("map", () => {
  describe("reducer", () => {
    it("adds a station to the store on ADD_STATION", () => {
      const action = actions.windowResize({
        width: 100,
        height: 200
      });
      const newState = reducer(undefined, action);

      expect(newState.toJS().viewBox).toEqual({
        minX: 0,
        minY: 0,
        width: 100,
        height: 200
      });
    });
  });

  describe("selectors", () => {
    it("viewBox() returns just the viewBox", () => {
      const state = Immutable.fromJS({
        viewBox: { width: 100 }
      });
      const output = selectors.viewBox(state);
      expect(output.toJS()).toEqual({ width: 100 });
    });
  });
});
