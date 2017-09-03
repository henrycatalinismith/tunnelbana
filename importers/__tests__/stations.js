import configureStore from "redux-mock-store";
import React from "react";
import ReactDOMServer from "react-dom/server";
import importStations from "../stations";
import actions from "../../actions";
import { Station } from "../../components/Station";

describe("importStations", () => {
  it("dispatches an IMPORT_STATION for each station found", () => {
    const middlewares = [];
    const mockStore = configureStore(middlewares);
    const initialState = {};
    const store = mockStore(initialState);

    const props = {
      station: {
        id: "Bandhagen",
        x: 100,
        y: 100
      }
    };

    const element = ReactDOMServer.renderToString(<Station {...props} />);
    const input = `<svg>${element}</svg>`;

    importStations(input, store);

    expect(store.getActions()).toEqual([
      actions.importStation({
        id: "Bandhagen",
        x: "100",
        y: "100"
      })
    ]);
  });
});
