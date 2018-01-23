const React = require("react");
const ReactDOM = require("react-dom");
const { createApp } = require("signalbox");

const HighValley = require("../components").default;
const actions = require("../actions").default;
const store = require("../reducers").default;
const { selectors } = require("../reducers");
const middlewares = require("../middlewares").default;

document.addEventListener("DOMContentLoaded", () => {
  const app = createApp(store(), actions, middlewares, selectors);
  const root = document.createElement("div");

  document.body.appendChild(root);
  ReactDOM.render(<HighValley />, root);

  app.dispatch.resizeViewport(window.innerWidth, window.innerHeight);
  app.dispatch.createActor({ x: 0, y: 0 });

  console.log(app.select.viewport.dimensions());
  console.log(app.select.actors.all());
});

