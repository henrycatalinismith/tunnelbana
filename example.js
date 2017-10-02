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

const one = createMiddleware((before, after) => ({
  [before("INCREMENT")](store) {
    console.log(`About to increment ${store.getState()}`);
  },
}));
const two = createMiddleware((before, after) => ({
  [after("INCREMENT")](store) {
    console.log(`Just incremented to ${store.getState()}`);
  }
}));

const middleware = createMiddleware([one, two]);

const store = createStore(
  counter,
  undefined,
  applyMiddleware(middleware)
);

store.dispatch({ type: "INCREMENT" });

