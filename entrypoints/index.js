const React = require("react");
const ReactDOM = require("react-dom");
const { createApp } = require("signalbox");
const { Provider } = require("react-redux");

const HighValley = require("../components").default;
const actions = require("../actions").default;
const store = require("../reducers").default;
const { selectors } = require("../reducers");
const middlewares = require("../middlewares").default;

document.addEventListener("DOMContentLoaded", () => {
  const s = store();
  const game = createApp(s, actions, middlewares, selectors);
  const root = document.createElement("div");

  document.body.appendChild(root);
  ReactDOM.render(<Provider store={s}><HighValley /></Provider>, root);

  game.dispatch.resizeViewport(window.innerWidth, window.innerHeight);
  game.dispatch.createActor({ x: 0, y: 0 });
  game.dispatch.createHexagon({ x: 190, y: 100 });
  game.dispatch.createHexagon({ x: 280, y: 100 });

  game.dispatch.createHexagon({ x: 145, y: 178 });
  game.dispatch.createHexagon({ x: 235, y: 178 });
  game.dispatch.createHexagon({ x: 325, y: 178 });

  game.dispatch.createHexagon({ x: 190, y: 256 });
  game.dispatch.createHexagon({ x: 280, y: 256 });

  console.log(game.select.viewport.dimensions());
  console.log(game.select.actors.all());
  console.log(game.select.hexagons.all());
});

