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

  game.dispatch.createCell({ radius: 1 });

  const hexagons = game.select.hexagons.all().toJS();

  game.dispatch.createStation({
    id: "Lime Street",
    hexagonId: game.select.hexagons.byPosition(0, -1, 1, 0).get("id"),
  });

  game.dispatch.createStation({
    id: "Moorfields",
    hexagonId: game.select.hexagons.byPosition(0, 1, -1, 0).get("id"),
  });

  /*
  game.dispatch.createStation({
    id: "Edge Hill",
    hexagonId: hexagons[6].id,
  });

  game.dispatch.createStation({
    id: "Moorfields",
    hexagonId: hexagons[4].id,
  });

  game.dispatch.createStation({
    id: "Hamilton Square",
    hexagonId: hexagons[3].id,
  });

  game.dispatch.createStation({
    id: "James Street",
    hexagonId: hexagons[1].id,
  });

  game.dispatch.createStation({
    id: "Central",
    hexagonId: hexagons[0].id,
  });
  */
});

