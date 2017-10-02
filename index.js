import React from "react";
import ReactDOM from "react-dom";
import { bindActionCreators } from "redux";
import { Provider, connect } from "react-redux";
import { combineReducers, createStore } from "redux";
import { TweenMax, TweenLite } from "gsap";

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

  const dispatch = {};
  Object.keys(actions).forEach(action => {
    if (typeof actions[action] === "function") {
      dispatch[action] = actions[action];
    }
  });

  const game = {
    dispatch: bindActionCreators(dispatch, store.dispatch),
    select: select.bindStore(store),
    before: (actionType, m) => {
      middlewares.befores[actionType].push(m);
    }
  };

  callback.call(null, game);
}
