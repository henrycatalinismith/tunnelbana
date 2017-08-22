import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import uuid from 'uuid/v1';

import actions from './actions';
import Map from './components/Map';
import store from './reducers';

document.addEventListener('DOMContentLoaded', () => {
  const app = document.createElement('div');
  document.body.appendChild(app);

  ReactDOM.render(
    <Provider store={store}>
      <Map />
    </Provider>,
    app
  );

  store.dispatch(actions.appStartup());

  store.dispatch(actions.addLine({
    id: 'Red',
    color: '#ff0000',
  }));

  store.dispatch(actions.addLine({
    id: 'Green',
    color: '#00c600',
  }));

  store.dispatch(actions.addLine({
    id: 'Blue',
    color: '#0273ff',
  }));

  store.dispatch(actions.addStation({
    id: 'T-Centralen',
    x: 300,
    y: 300,
  }));

  store.dispatch(actions.addStation({
    id: 'Kungstradgarden',
    x: 350,
    y: 300,
  }));

  store.dispatch(actions.addStation({
    id: 'Radhuset',
    x: 250,
    y: 300,
  }));

  store.dispatch(actions.addStation({
    id: 'Fridhemsplan',
    x: 200,
    y: 300,
  }));

  store.dispatch(actions.addStation({
    id: 'Stadshagen',
    x: 150,
    y: 250,
  }));

  store.dispatch(actions.addStation({
    id: 'VastraSkogen',
    x: 100,
    y: 200,
  }));

  store.dispatch(actions.addStation({
    id: 'GamlaStan',
    x: 300,
    y: 350,
  }));

  store.dispatch(actions.addStation({
    id: 'Slussen',
    x: 300,
    y: 400,
  }));

  store.dispatch(actions.addStation({
    id: 'Mariatorget',
    x: 250,
    y: 420,
  }));

  store.dispatch(actions.addStation({
    id: 'Zinkensdamm',
    x: 200,
    y: 420,
  }));

  store.dispatch(actions.addStation({
    id: 'Hornstull',
    x: 150,
    y: 450,
  }));

  store.dispatch(actions.addStation({
    id: 'Medborgarplatsen',
    x: 300,
    y: 450,
  }));

  store.dispatch(actions.addStation({
    id: 'Skanstull',
    x: 350,
    y: 500,
  }));

  store.dispatch(actions.addConnection({
    sourceId: 'T-Centralen',
    destinationId: 'Kungstradgarden',
    lineId: 'Blue',
  }));

  store.dispatch(actions.addConnection({
    sourceId: 'T-Centralen',
    destinationId: 'Radhuset',
    lineId: 'Blue',
  }));

  store.dispatch(actions.addConnection({
    sourceId: 'Radhuset',
    destinationId: 'Fridhemsplan',
    lineId: 'Blue',
  }));

  store.dispatch(actions.addConnection({
    sourceId: 'Fridhemsplan',
    destinationId: 'Stadshagen',
    lineId: 'Blue',
  }));

  store.dispatch(actions.addConnection({
    sourceId: 'Stadshagen',
    destinationId: 'VastraSkogen',
    lineId: 'Blue',
  }));

  store.dispatch(actions.addConnection({
    sourceId: 'T-Centralen',
    destinationId: 'GamlaStan',
    lineId: 'Red',
  }));

  store.dispatch(actions.addConnection({
    sourceId: 'GamlaStan',
    destinationId: 'Slussen',
    lineId: 'Red',
  }));

  store.dispatch(actions.addConnection({
    sourceId: 'Slussen',
    destinationId: 'Mariatorget',
    lineId: 'Red',
  }));

  store.dispatch(actions.addConnection({
    sourceId: 'Mariatorget',
    destinationId: 'Zinkensdamm',
    lineId: 'Red',
  }));

  store.dispatch(actions.addConnection({
    sourceId: 'Zinkensdamm',
    destinationId: 'Hornstull',
    lineId: 'Red',
  }));

  store.dispatch(actions.addConnection({
    sourceId: 'Slussen',
    destinationId: 'Medborgarplatsen',
    lineId: 'Green',
  }));

  store.dispatch(actions.addConnection({
    sourceId: 'Medborgarplatsen',
    destinationId: 'Skanstull',
    lineId: 'Green',
  }));

/*
  store.dispatch(actions.addTrain({
    id: 'Thomas',
    stationId: 'T-Centralen',
    lineId: 'Red',
  }));

  store.dispatch(actions.addTrain({
    id: 'Henry',
    stationId: 'Medborgarplatsen',
    lineId: 'Green',
  }));
  */

  store.dispatch(actions.addTrain({
    id: 'Edward',
    stationId: 'Kungstradgarden',
    lineId: 'Blue',
  }));

  /*
  store.dispatch(actions.departure({
    trainId: 'Thomas',
    sourceId: 'T-Centralen',
    destinationId: 'GamlaStan',
    lineId: 'Red',
  }));
  */

  /*
  store.dispatch(actions.departure({
    trainId: 'Henry',
    sourceId: 'Medborgarplatsen',
    destinationId: 'Skanstull',
    lineId: 'Green',
  }));


  */

  store.dispatch(actions.departure({
    id: uuid(),
    trainId: 'Edward',
    sourceId: 'Kungstradgarden',
    destinationId: 'T-Centralen',
    lineId: 'Blue',
  }));

  /*
  return;

  const tcentralen = new Station(Point.center());
  const gamlastan = new Station(Point.center().add({ y: 50 }));
  const slussen = new Station(Point.center().add({ y: 100 }));
  const mariatorget = new Station(Point.center().add({ y: 100, x: -50 }));
  const zinkensdamm = new Station(Point.center().add({ y: 100, x: -100 }));
  const hornstull = new Station(Point.center().add({ y: 125, x: -150 }));
  tcentralen.render();
  gamlastan.render();
  slussen.render();
  mariatorget.render();
  zinkensdamm.render();
  hornstull.render();

  const medborgarplatsen = new Station(Point.center().add({ y: 150 }), '#00c600');
  const skanstull = new Station(Point.center().add({ y: 175, x: 50 }), '#00c600');
  const gullmarsplan = new Station(Point.center().add({ y: 200, x: 100 }), '#00c600');
  const skarmarbrink = new Station(Point.center().add({ y: 225, x: 150 }), '#00c600');
  const hammarbyhöjden = new Station(Point.center().add({ y: 250, x: 200 }), '#00c600');
  const blasut = new Station(Point.center().add({ y: 250, x: 150 }), '#00c600');
  const globen = new Station(Point.center().add({ y: 250, x: 100 }), '#00c600');
  medborgarplatsen.render();
  skanstull.render();
  gullmarsplan.render();
  skarmarbrink.render();
  hammarbyhöjden.render();
  blasut.render();
  globen.render();

  const radhuset = new Station(Point.center().add({ y: 25, x: -50 }), '#0273ff');
  const fridhemsplan = new Station(Point.center().add({ y: 25, x: -100 }), '#0273ff');
  const stadshagen = new Station(Point.center().add({ y: 0, x: -150 }), '#0273ff');
  const vastraskogen = new Station(Point.center().add({ y: -25, x: -200 }), '#0273ff');
  const huvudsta = new Station(Point.center().add({ y: -50, x: -250 }), '#0273ff');
  const solnacentrum = new Station(Point.center().add({ y: -50, x: -200 }), '#0273ff');
  radhuset.render();
  fridhemsplan.render();
  stadshagen.render();
  vastraskogen.render();
  huvudsta.render();
  solnacentrum.render();

*/
});



class Station {
  constructor(point, color = '#FF0000') {
    this.point = point;
    this.color = color;
  }

  render() {
    renderPoint(this.point, 10, {
      fillStyle: '#FFFFFF',
      strokeStyle: this.color,
      lineWidth: 6,
    });
  }
}

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add ({ x = 0, y = 0}) {
    this.x += x;
    this.y += y;
    return this;
  }

  angle (point) {
    return Math.atan2(
      point.y - this.y,
      point.x - this.x
    );
  }

  distance ({ x, y }) {
    const a = Math.abs(this.x - x);
    const b = Math.abs(this.y - y);
    return Math.sqrt(
      Math.abs((a * a) + (b * b))
    );
  }
}
