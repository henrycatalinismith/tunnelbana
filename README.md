signalbox
=========

Wanted to put some 😍😍😍 into my redux middlewares and came up with this.

```javascript
const middleware = createMiddleware((before, after) => ({
  [before(actions.DEPARTURE)]: trains.closeDoors,
  [after(actions.DEPARTURE)]: journeys.animateJourneys,
  [after(actions.ARRIVAL)]: passengers.alightTrains,
  [after(actions.ARRIVAL)]: passengers.boardTrains,
  [after(actions.ARRIVAL)]: journeys.scheduleDeparture
}));
```

After a certain point my eyes get a little tired of reading thos big hefty
middleware `switch (action.type)` statements. I lose track of what actually
runs, what it's there for, and in what order it all happens.

The idea with this is to fix both of those problems by:

* Splitting up the middleware `case` statements into individual functions with
  names that explain what they do so that you can actually tell when you've
  found the middleware functionality you were looking for.
* Performing _all_ the composition together in one central place so that you
  have all the middleware ordering information together in one place for when
  you care about it and out of the way when you don't.

Documentation
-------------

##### createMiddleware

```javascript
const { createStore, applyMiddleware } = require("redux");
const { createMiddleware } = require("signalbox");

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

```

```
About to increment 0
Just incremented to 1
```

Contributing
------------

Contributors are subject to v1.4 of the [Contributor Covenant].

License
-------

signalbox is released under the [MIT License].

[Contributor Covenant]: https://www.contributor-covenant.org/version/1/4/code-of-conduct/
[MIT License]: http://www.opensource.org/licenses/MIT
