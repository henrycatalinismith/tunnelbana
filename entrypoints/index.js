const React = require("react");
const ReactDOM = require("react-dom");
const { createApp } = require("signalbox");
const { Provider } = require("react-redux");
const { throttle } = require("lodash");

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
        id: "main",
        cellId: 0,
        hexagonId: "0,0,0,0",
        radius: 32,
        zoom: 1.5,
        x: 0,
        y: 0,
      }
    },
    terrains: {
      grass: {
        id: "grass",
        color: "#b3b128",
        side: "#8e8d1d",
        height: 10,
      },
      water: {
        id: "water",
        color: "#2369a6",
        side: "#174d7c",
        height: 2,
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

  document.addEventListener("mousewheel", event => {
    game.thunks.zoom(event.deltaY);
  });

  let isClicked = false;
  document.addEventListener("mousedown", event => {
    isClicked = true;
  });

  const onMove = throttle(event => {
    if (!isClicked) {
      return;
    }
    console.log(event);
  }, 1000);

  document.addEventListener("mousemove", onMove);

  document.addEventListener("mouseup", event => {
    isClicked = false;
  });

  game.thunks.createCell(10);
  game.thunks.createStation(-1, 1, 0);
  game.thunks.createStation(1, -1, 0);

  game.thunks.changeTerrainRing("water", 2, 0, -2, 1);
  game.thunks.changeTerrainRing("water", -2, 0, 2, 1);
  game.thunks.changeTerrainRing("forest", -2, 3, -1, 1);
  game.thunks.changeTerrain("forest", -2, 3, -1);
  game.thunks.changeTerrain("forest", 2, -3, 1);
  game.thunks.changeTerrain("forest", 2, -4, 2);
  game.thunks.changeTerrain("forest", 1, -5, 4);
  game.thunks.changeTerrain("forest", -2, -2, 4);
  game.thunks.changeTerrain("forest", 0, -4, 4);
  game.thunks.changeTerrain("forest", 0, -3, 3);
  game.thunks.changeTerrain("forest", 1, -2, 1);
  game.thunks.changeTerrainRing("water", 0, 0, 0, 6);
  game.thunks.changeTerrainRing("water", 0, 0, 0, 7);
  game.thunks.changeTerrainRing("water", 0, 0, 0, 8);
  game.thunks.changeTerrainRing("water", 0, 0, 0, 9);
  game.thunks.changeTerrainRing("water", 0, 0, 0, 10);
  game.thunks.createConnection(-1, 1, 0, 1, -1, 0);

  game.thunks.createStation(3, 1, -4);
  game.thunks.createStation(-4, 4, 0);
  game.thunks.createStation(3, -4, 1);
  game.thunks.createConnection(1, -1, 0, 3, 1, -4);
  game.thunks.createConnection(3, 1, -4, -4, 4, 0);
  game.thunks.createConnection(-4, 4, 0, 3, -4, 1);

  game.thunks.createTrain(-1, 1, 0);
  setTimeout(() => {
    game.thunks.departure("0", 1, -1, 0);
  }, 300);

});

