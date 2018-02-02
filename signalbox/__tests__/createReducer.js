const { createReducer } = require("../createReducer");

describe("createReducer", () => {
  it("runs the action handler for the dispatched action type", done => {
    const reducer = createReducer({}, {
      EXAMPLE_ACTION: (state, action) => {
        done();
      }
    });
    reducer(undefined, { type: "EXAMPLE_ACTION" });
  });

  it("passes the initial state if state is passed undefined", done => {
    const reducer = createReducer(12345, {
      EXAMPLE_ACTION: (state, action) => {
        expect(state).toBe(12345);
        done();
      }
    });
    reducer(undefined, { type: "EXAMPLE_ACTION" });
  });

  it("passes the state if present", done => {
    const reducer = createReducer(12345, {
      EXAMPLE_ACTION: (state, action) => {
        expect(state).toBe(67890);
        done();
      }
    });
    reducer(67890, { type: "EXAMPLE_ACTION" });
  });
});
