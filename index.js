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
        id: "Circle",
        color: "yellow"
      })
    );

    store.dispatch(
      actions.addLine({
        id: "Riverside",
        color: "#0273ff"
      })
    );

    store.dispatch(
      actions.addLine({
        id: "Polar",
        color: "#ff0000"
      })
    );

    store.dispatch(
      actions.addLine({
        id: "Hogwarts",
        color: "#ff00ff"
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
        lineId: "Circle"
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

    const links = [
      { lineId: "Riverside", from: 0, to: 5 },
      { lineId: "Polar", from: 2, to: 7 },
      { lineId: "Hogwarts", from: 4, to: 8 }
    ];

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
            lineId: "Circle"
          })
        );
      }
      if (i === 9) {
        store.dispatch(
          actions.addConnection({
            id: uuid(),
            sourceId: id,
            destinationId: firstId,
            lineId: "Circle"
          })
        );
      }

      if (firstId === null) {
        firstId = id;
      }

      for (let link of links) {
        if (link.from === i) {
          link.fromId = id;
        } else if (link.to === i) {
          link.toId = id;
        }
      }

      if (i === 0) blue1 = id;
      if (i === 5) blue2 = id;
      lastId = id;
    });

    for (let link of links) {
      store.dispatch(
        actions.addConnection({
          id: uuid(),
          sourceId: link.fromId,
          destinationId: link.toId,
          lineId: link.lineId
        })
      );
    }

    store.dispatch(
      actions.departure({
        id: uuid(),
        trainId: "Gordon",
        sourceId: lastId,
        destinationId: firstId,
        lineId: "Circle",
        connectionId: getConnection(
          store.getState().get("connections"),
          "Circle",
          lastId,
          firstId
        ).id
      })
    );

    store.dispatch(
      actions.addTrain({
        id: "Henry",
        stationId: links[0].fromId,
        lineId: "Polar"
      })
    );

    store.dispatch(
      actions.addTrain({
        id: "Dave",
        stationId: links[2].fromID,
        lineId: "Hogwarts"
      })
    );

    store.dispatch(
      actions.departure({
        id: uuid(),
        trainId: "Henry",
        sourceId: links[1].fromId,
        destinationId: links[1].toId,
        lineId: links[1].lineId,
        connectionId: getConnection(
          store.getState().get("connections"),
          links[1].lineId,
          links[1].fromId,
          links[1].toId
        ).id
      })
    );

    store.dispatch(
      actions.departure({
        id: uuid(),
        trainId: "Dave",
        sourceId: links[2].fromId,
        destinationId: links[2].toId,
        lineId: links[2].lineId,
        connectionId: getConnection(
          store.getState().get("connections"),
          links[2].lineId,
          links[2].fromId,
          links[2].toId
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

    store.dispatch(
      actions.addPassenger({
        id: uuid(),
        stationId: blue1
      })
    );
  }
});
