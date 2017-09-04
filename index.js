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
        id: "Red",
        color: "#ff0000"
      })
    );

    store.dispatch(
      actions.addLine({
        id: "Green",
        color: "#00c600"
      })
    );

    store.dispatch(
      actions.addLine({
        id: "Blue",
        color: "#0273ff"
      })
    );

    store.dispatch(
      actions.addLine({
        id: "Special",
        color: "Gold"
      })
    );

    store.dispatch(
      actions.addStation({
        id: "T-Centralen",
        x: 300,
        y: 300
      })
    );

    store.dispatch(
      actions.addStation({
        id: "Kungstradgarden",
        x: 350,
        y: 300
      })
    );

    store.dispatch(
      actions.addStation({
        id: "Radhuset",
        x: 250,
        y: 300
      })
    );

    store.dispatch(
      actions.addStation({
        id: "Fridhemsplan",
        x: 200,
        y: 300
      })
    );

    store.dispatch(
      actions.addStation({
        id: "Stadshagen",
        x: 150,
        y: 250
      })
    );

    store.dispatch(
      actions.addStation({
        id: "VastraSkogen",
        x: 100,
        y: 200
      })
    );

    store.dispatch(
      actions.addStation({
        id: "SolnaStation",
        x: 120,
        y: 100
      })
    );

    store.dispatch(
      actions.addStation({
        id: "GamlaStan",
        x: 300,
        y: 350
      })
    );

    store.dispatch(
      actions.addStation({
        id: "Slussen",
        x: 300,
        y: 400
      })
    );

    store.dispatch(
      actions.addStation({
        id: "Mariatorget",
        x: 250,
        y: 420
      })
    );

    store.dispatch(
      actions.addStation({
        id: "Zinkensdamm",
        x: 200,
        y: 420
      })
    );

    store.dispatch(
      actions.addStation({
        id: "Hornstull",
        x: 150,
        y: 450
      })
    );

    store.dispatch(
      actions.addStation({
        id: "Medborgarplatsen",
        x: 300,
        y: 450
      })
    );

    store.dispatch(
      actions.addStation({
        id: "Skanstull",
        x: 350,
        y: 500
      })
    );

    store.dispatch(
      actions.addConnection({
        id: uuid(),
        sourceId: "T-Centralen",
        destinationId: "Kungstradgarden",
        lineId: "Blue"
      })
    );

    store.dispatch(
      actions.addConnection({
        id: uuid(),
        sourceId: "T-Centralen",
        destinationId: "Radhuset",
        lineId: "Blue"
      })
    );

    store.dispatch(
      actions.addConnection({
        id: uuid(),
        sourceId: "Radhuset",
        destinationId: "Fridhemsplan",
        lineId: "Blue"
      })
    );

    store.dispatch(
      actions.addConnection({
        id: uuid(),
        sourceId: "Fridhemsplan",
        destinationId: "Stadshagen",
        lineId: "Blue"
      })
    );

    store.dispatch(
      actions.addConnection({
        id: uuid(),
        sourceId: "Stadshagen",
        destinationId: "VastraSkogen",
        lineId: "Blue"
      })
    );

    store.dispatch(
      actions.addConnection({
        id: uuid(),
        sourceId: "VastraSkogen",
        destinationId: "SolnaStation",
        lineId: "Blue"
      })
    );

    store.dispatch(
      actions.addConnection({
        id: uuid(),
        sourceId: "T-Centralen",
        destinationId: "GamlaStan",
        lineId: "Red"
      })
    );

    store.dispatch(
      actions.addConnection({
        id: uuid(),
        sourceId: "GamlaStan",
        destinationId: "Slussen",
        lineId: "Red"
      })
    );

    store.dispatch(
      actions.addConnection({
        id: uuid(),
        sourceId: "Slussen",
        destinationId: "Mariatorget",
        lineId: "Red"
      })
    );

    store.dispatch(
      actions.addConnection({
        id: uuid(),
        sourceId: "Mariatorget",
        destinationId: "Zinkensdamm",
        lineId: "Red"
      })
    );

    store.dispatch(
      actions.addConnection({
        id: uuid(),
        sourceId: "Zinkensdamm",
        destinationId: "Hornstull",
        lineId: "Red"
      })
    );

    store.dispatch(
      actions.addConnection({
        id: uuid(),
        sourceId: "Slussen",
        destinationId: "Medborgarplatsen",
        lineId: "Green"
      })
    );

    store.dispatch(
      actions.addConnection({
        id: uuid(),
        sourceId: "Medborgarplatsen",
        destinationId: "Skanstull",
        lineId: "Green"
      })
    );

    store.dispatch(
      actions.addTrain({
        id: "Thomas",
        stationId: "T-Centralen",
        lineId: "Red"
      })
    );

    store.dispatch(
      actions.addTrain({
        id: "Henry",
        stationId: "Medborgarplatsen",
        lineId: "Green"
      })
    );

    store.dispatch(
      actions.addTrain({
        id: "Edward",
        stationId: "Kungstradgarden",
        lineId: "Blue"
      })
    );

    store.dispatch(
      actions.addTrain({
        id: "Gordon",
        stationId: "Kungstradgarden",
        lineId: "Special"
      })
    );

    store.dispatch(
      actions.departure({
        id: uuid(),
        trainId: "Thomas",
        sourceId: "T-Centralen",
        destinationId: "GamlaStan",
        lineId: "Red",
        connectionId: getConnection(
          store.getState().get("connections"),
          "Red",
          "T-Centralen",
          "GamlaStan"
        ).id
      })
    );

    store.dispatch(
      actions.departure({
        id: uuid(),
        trainId: "Henry",
        sourceId: "Medborgarplatsen",
        destinationId: "Skanstull",
        lineId: "Green",
        connectionId: getConnection(
          store.getState().get("connections"),
          "Green",
          "Medborgarplatsen",
          "Skanstull"
        ).id
      })
    );

    store.dispatch(
      actions.departure({
        id: uuid(),
        trainId: "Edward",
        sourceId: "Kungstradgarden",
        destinationId: "T-Centralen",
        lineId: "Blue",
        connectionId: getConnection(
          store.getState().get("connections"),
          "Blue",
          "Kungstradgarden",
          "T-Centralen"
        ).id
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
      lastId = null;
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
      lastId = id;
    });

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
  }
});
