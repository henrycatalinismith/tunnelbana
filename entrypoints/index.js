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
    cameras: {
      main: {
        cellId: 0,
        hexagonId: "0,0,0,0",
        radius: 4,
        x: 0,
        y: 0,
      }
    },
    terrains: {
      grass: {
        id: "grass",
        color: "#b3b128",
        side: "#8e8d1d",
        height: 6,
      },
      water: {
        id: "water",
        color: "#2369a6",
        height: 0,
      },
      forest: {
        id: "forest",
        color: "#152d07",
        side: "#071a04",
        height: 18,
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

  game.thunks.createCell(16);
  game.thunks.createStation(-1, 1, 0);
  game.thunks.createStation(1, -1, 0);
  // game.thunks.changeTerrain("water", 0, 0, 0);
  game.thunks.changeTerrainRing("water", 2, 0, -2, 1);
  game.thunks.changeTerrainRing("water", -2, 0, 2, 1);
  game.thunks.changeTerrainRing("forest", -2, 3, -1, 1);
  game.thunks.changeTerrain("forest", -2, 3, -1);
  game.thunks.changeTerrainRing("water", 0, 0, 0, 6);

});

