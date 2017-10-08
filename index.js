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

export function start(options, callback) {
  ReactDOM.render(
    <Provider store={store}>
      <Map />
    </Provider>,
    options.element
  );

  store.dispatch(actions.start());
  const game = createApp(store, actions, middlewares, select);
  callback.call(null, game);
}
