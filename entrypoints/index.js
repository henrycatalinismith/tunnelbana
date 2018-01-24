const React = require("react");
const ReactDOM = require("react-dom");
const { createApp } = require("signalbox");
const { Provider } = require("react-redux");

const HighValley = require("../components").default;
const actions = require("../actions").default;
const store = require("../reducers").default;
const { selectors } = require("../reducers");
const middlewares = require("../middlewares").default;
const cube = require("../math/cube").default;

document.addEventListener("DOMContentLoaded", () => {
  const initialState = {
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
    }
  };

  const s = store(initialState);
  const game = createApp(s, actions, middlewares, selectors);
  const root = document.createElement("div");

  document.body.appendChild(root);
  ReactDOM.render(<Provider store={s}><HighValley /></Provider>, root);

  game.dispatch.createActor({ x: 0, y: 0 });

  game.dispatch.createHexagon(0, 0, 0);

/*
  game.dispatch.createHexagon({ x: -10, y: -80 });
  game.dispatch.createHexagon({ x: 80, y: -80 });

  game.dispatch.createHexagon({ x: -55, y: -2 });
  game.dispatch.createHexagon({ x: 35, y: -2 });
  game.dispatch.createHexagon({ x: 125, y: -2 });

  game.dispatch.createHexagon({ x: -10, y: 76 });
  */


  const center = cube(0, 0, 0);
  const ring = cube.ring(center, 1);

  game.dispatch.createHexagon(center.x, center.y, center.z);
  ring.forEach(c => {
    game.dispatch.createHexagon(c.x, c.y, c.z);
  });

  console.log(center);
  console.log(ring);
  console.log(game.select.hexagons.all());

});

