signalbox
=========

Wanted to put some 😍😍😍 into my redux middlewares and came up with this.

<table>
<thead><th>🏇 Vanilla Redux Middleware 🛶</th><th>🚄 With Signalbox 🚀</th></thead>
<tbody>
<tr>
<td>

<pre><code>const middleware = store => {
  return next => action => {
    switch (action.type) {
      case actions.DEPARTURE:
        trains.closeDoors(action.journey);
        break;
    }

    const result = next(action);

    switch (action.type) {
      case actions.DEPARTURE:
        journeys.animateJourney(action.journey);
        break;

      case actions.ARRIVAL:
        passengers.alightTrains(action.journey);
        break;
    }
  }
}
</code></pre>

</td>

<td>
<pre><code>import { createMiddleware } from "signalbox";
const middleware = createMiddleware(
  (before, after) => ({
    [before(actions.DEPARTURE)](store, action) {
      trains.closeDoors(action.journey);
    },
    [after(actions.DEPARTURE)](store, action) {
      journeys.animateJourney(action.journey);
    },
    [after(actions.ARRIVAL)](store, action) {
      passengers.alightTrains(action.journey);
    }
  })
);
&nbsp;
&nbsp;
&nbsp;
&nbsp;
&nbsp;
&nbsp;
&nbsp;
&nbsp;
</code></pre>
</td>

</tr>
</tbody>
</table>

After a certain point my eyes get a little tired of reading those big hefty
middleware `switch (action.type)` statements. I lose track of what actually
runs, what it's there for, and in what order it all happens.

The idea with this is to fix both of those problems by:

* Splitting up the middleware `case` statements into individual functions so
  that they're not all sharing one big messy block scope with lots of unwanted
  `let` statements at the top.

* Expressing the timing of a middleware function (i.e. before or after the
  action that triggers it) directly, using `before()` and `after()` instead of
  having to do lots of strange custom metaprogramming to juggle the timming of
  the `next(action)` call.

Documentation
-------------

##### createMiddleware

Kinda seems like more examples are the way to document this thing since it's so simple.
So here's another one. There's also an [example.js](https://github.com/hnrysmth/signalbox/blob/master/example.js)
which is a working version of this that actually runs.

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
