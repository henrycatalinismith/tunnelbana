import configureStore from 'redux-mock-store'
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import importCity from '../index';
import { Station } from '../../components/Station';

describe('importCity', () => {
  it('does something', () => {
    const middlewares = [];
    const mockStore = configureStore(middlewares);
    const initialState = {}
    const store = mockStore(initialState)

    const props = {
      station: {
        x: 100,
        y: 100,
      },
    };

    const element = ReactDOMServer.renderToString(<Station {...props} />);
    const input = `<svg>${element}</svg>`;

    importCity(input, store);

    console.log(store.getActions());
  });

});
