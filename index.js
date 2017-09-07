import React from "react";
import ReactDOM from "react-dom";
import { Provider, connect } from "react-redux";
import { combineReducers, createStore } from "redux";
import uuid from "uuid/v1";
import { TweenMax, TweenLite } from "gsap";

import actions from "./actions";
import clock from "./clock";
import Map from "./components/Map";
import store from "./reducers";
import { getConnection } from "./reducers/connections";
import importCity from "./importers";

document.addEventListener("DOMContentLoaded", () => {
  const app = document.createElement("div");
  document.body.appendChild(app);

  ReactDOM.render(
    <Provider store={store}>
      <Map />
    </Provider>,
    app
  );

  window.addEventListener("blur", () => {
    store.dispatch(actions.windowBlur());
    clock.pause();
    TweenMax.pauseAll(true, true);
  });

  let throttle = false;
  window.addEventListener("mousemove", event => {
    if (!throttle) {
      store.dispatch(actions.dragonMove(event.clientX, event.clientY));
      throttle = true;
      setTimeout(() => (throttle = false), 50);
    }
  });

  window.addEventListener("mouseup", event => {
    const { entity, id } = store
      .getState()
      .get("dragon")
      .toJS();
    if (entity && id) {
      store.dispatch(actions.dragonDrop(entity, id));
    }
  });

  window.addEventListener("focus", () => {
    store.dispatch(actions.windowFocus());
    clock.resume();
    TweenMax.resumeAll(true, true);
  });

  window.addEventListener("resize", () => {
    store.dispatch(
      actions.windowResize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    );
  });

  store.dispatch(
    actions.windowResize({
      width: window.innerWidth,
      height: window.innerHeight
    })
  );

  if (false) {
    importCity("boringville", store);
  } else {
    store.dispatch(
      actions.addLine({
        id: "Special",
        color: "Gold"
      })
    );

    store.dispatch(
      actions.addLine({
        id: "Riverside",
        color: "#0273ff"
      })
    );

    store.dispatch(
      actions.addTrain({
        id: "Thomas",
        stationId: "Kungstradgarden",
        lineId: "Riverside"
      })
    );

    store.dispatch(
      actions.addTrain({
        id: "Gordon",
        stationId: "Kungstradgarden",
        lineId: "Special"
      })
    );

    const π = Math.PI;
    const points = ({ x, y }, r, n) => {
      const angle = 2 * π / n;

      return [...Array(n)].map((_, i) => ({
        x: x + r * Math.cos(angle * i),
        y: y + r * Math.sin(angle * i)
      }));
    };

    const center = { x: 300, y: 300 };
    let firstId = null,
      lastId = null,
      blue1 = null,
      blue2 = null;
    points(center, 250, 10).map((point, i) => {
      let id = uuid();
      store.dispatch(
        actions.addStation({
          id: id,
          x: point.x,
          y: point.y
        })
      );

      if (lastId) {
        store.dispatch(
          actions.addConnection({
            id: uuid(),
            sourceId: lastId,
            destinationId: id,
            lineId: "Special"
          })
        );
      }
      if (i === 9) {
        store.dispatch(
          actions.addConnection({
            id: uuid(),
            sourceId: id,
            destinationId: firstId,
            lineId: "Special"
          })
        );
      }

      if (firstId === null) {
        firstId = id;
      }
      if (i === 0) blue1 = id;
      if (i === 5) blue2 = id;
      lastId = id;
    });

    store.dispatch(
      actions.addConnection({
        id: uuid(),
        sourceId: blue1,
        destinationId: blue2,
        lineId: "Riverside"
      })
    );

    store.dispatch(
      actions.departure({
        id: uuid(),
        trainId: "Gordon",
        sourceId: firstId,
        destinationId: lastId,
        lineId: "Special",
        connectionId: getConnection(
          store.getState().get("connections"),
          "Special",
          firstId,
          lastId
        ).id
      })
    );

    store.dispatch(
      actions.departure({
        id: uuid(),
        trainId: "Thomas",
        sourceId: blue1,
        destinationId: blue2,
        lineId: "Riverside",
        connectionId: getConnection(
          store.getState().get("connections"),
          "Riverside",
          blue1,
          blue2
        ).id
      })
    );
  }
});
