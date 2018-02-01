const React = require("react");
const ReactDOM = require("react-dom");
const { createApp } = require("signalbox");
const { Provider } = require("react-redux");

const HighValley = require("../components").default;
const actions = require("../actions").default;
const store = require("../reducers").default;
const { selectors } = require("../reducers");
const middlewares = require("../middlewares").default;
const cube = require("../geometry/cube").default;

document.addEventListener("DOMContentLoaded", () => {
  const initialState = {
    terrains: {
      grass: {
        id: "grass",
        color: "#6dd254",
      },
      water: {
        id: "water",
        color: "blue",
      }
    },
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

  game.dispatch.createCell(4);
  game.dispatch.createStation(-1, 1, 0);
  game.dispatch.createStation(1, -1, 0);
  game.dispatch.changeTerrain(0, 0, 0, "water");
  game.dispatch.changeTerrainRing(2, 0, -2, 0, "water");
  game.dispatch.changeTerrainRing(2, 0, -2, 1, "water");
  game.dispatch.changeTerrainRing(-2, 0, 2, 0, "water");
  game.dispatch.changeTerrainRing(-2, 0, 2, 1, "water");

});

