const { createStore, applyMiddleware, compose } = require("redux");
const { createMiddleware } = require("../createMiddleware");

describe("createMiddleware", () => {
  it("cancels the action if a cancelware returns true", () => {
    const callOrder = [];

    const middleware = createMiddleware((cancel) => ({
      [cancel("EXAMPLE_ACTION")]() {
        return true;
      }
    }));

    const store = createStore(
      (state, action) => {
        if (action.type === "EXAMPLE_ACTION") {
          throw new Error("Should have been cancelled");
        }
      },
      undefined,
      compose(applyMiddleware(middleware))
    );

    store.dispatch({ type: "EXAMPLE_ACTION" });
  });

  it("fires any beforewares before the action hits the store", () => {
    const callOrder = [];

    const middleware = createMiddleware((cancel, before) => ({
      [before("EXAMPLE_ACTION")]() {
        callOrder.push("beforeware");
      }
    }));

    const store = createStore(
      (state, action) => {
        action.type === "EXAMPLE_ACTION" && callOrder.push("store");
      },
      undefined,
      compose(applyMiddleware(middleware))
    );

    store.dispatch({ type: "EXAMPLE_ACTION" });
    expect(callOrder).toEqual(["beforeware", "store"]);
  });

  it("fires any afterwares after the action hits the store", () => {
    const callOrder = [];

    const middleware = createMiddleware((cancel, before, after) => ({
      [after("EXAMPLE_ACTION")]() {
        callOrder.push("afterware");
      }
    }));

    const store = createStore(
      (state, action) => {
        action.type === "EXAMPLE_ACTION" && callOrder.push("store");
      },
      undefined,
      compose(applyMiddleware(middleware))
    );

    store.dispatch({ type: "EXAMPLE_ACTION" });
    expect(callOrder).toEqual(["store", "afterware"]);
  });

});

