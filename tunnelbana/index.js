import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { TweenMax } from "gsap";
import { createApp } from "signalbox";

import actions from "./actions";
import clock from "./clock";
import Map from "./components/Map";
import middlewares from "./middlewares";
import store from "./reducers";
import { select } from "./reducers";
import { getConnection } from "./reducers/connections";
import importCity from "./importers";

document.addEventListener("DOMContentLoaded", () => {
  const game = createApp(store, actions, middlewares, select);
  const root = document.createElement("div");
  document.body.appendChild(root);

  ReactDOM.render(
    <Provider store={store}>
      <Map />
    </Provider>,
    root
  );

  game.dispatch.start();

  const { width, height } = game.select.window.all().toJS();
  const center = { x: width / 2, y: height / 2 };

  game.dispatch.createLine({
    id: "Riverside",
    color: "#0273ff"
  });

  game.dispatch.createStation({
    id: "Central",
    x: center.x,
    y: center.y
  });

  game.dispatch.createTrain({
    id: "Thomas",
    stationId: "Central",
    lineId: "Riverside"
  });

  setTimeout(() => {
    game.dispatch.createStation({
      id: "Downtown",
      x: center.x,
      y: center.y - 100
    });
  }, 1000);

  setTimeout(() => {
    game.dispatch.createPassenger({
      stationId: "Downtown"
    });
  }, 2000);

  setTimeout(() => {
    game.dispatch.createStation({
      id: "Main Street",
      x: center.x + 100,
      y: center.y - 100
    });
  }, 5000);

  let departed = false;
  game.after(game.actions.REALIZE_CONNECTION, (store, action) => {
    if (departed) {
      return;
    }

    // for some reason without the timeout the train vanishes into the top
    // left corner for the first trip but then animates perfectly for all
    // subsequent trips
    setTimeout(() => {
      game.dispatch.departure({
        trainId: "Thomas",
        destinationId: action.destination.id
      });
    }, 500);

    departed = true;
  });
});
