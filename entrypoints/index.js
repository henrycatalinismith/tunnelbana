const React = require("react");
const ReactDOM = require("react-dom");
const { createApp } = require("signalbox");
const { Provider } = require("react-redux");

const HighValley = require("../components").default;
const actions = require("../actions").default;
const store = require("../reducers").default;
const { selectors } = require("../reducers");
const middlewares = require("../middlewares").default;
const thunks = require("../thunks").default;

document.addEventListener("DOMContentLoaded", () => {
  const initialState = {
    terrains: {
      grass: {
        id: "grass",
        color: "#b3b128",
      },
      water: {
        id: "water",
        color: "#2369a6",
      }
    },
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
    }
  };

  const s = store(initialState);
  const game = createApp(s, actions, middlewares, selectors, thunks);
  const root = document.createElement("div");

  document.body.appendChild(root);
  ReactDOM.render(<Provider store={s}><HighValley /></Provider>, root);

  game.thunks.createCell(6);
  game.dispatch.createStation(-1, 1, 0);
  game.dispatch.createStation(1, -1, 0);
  game.thunks.changeTerrain("water", 0, 0, 0);
  game.thunks.changeTerrainRing("water", 2, 0, -2, 1);
  game.thunks.changeTerrainRing("water", -2, 0, 2, 1);
  game.thunks.changeTerrainRing("water", 0, 0, 0, 6);

});

