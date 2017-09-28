const { createStore, applyMiddleware } = require("redux");
const { createMiddleware } = require("./index");

function counter(state = 0, action) {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
}

const middleware = createMiddleware((before, after) => ({
  [before("INCREMENT")](store) {
    console.log(`About to increment ${store.getState()}`);
  },
  [after("INCREMENT")](store) {
    console.log(`Just incremented to ${store.getState()}`);
  }
}));

const store = createStore(
  counter,
  undefined,
  applyMiddleware(...middleware)
);

store.dispatch({ type: "INCREMENT" });

