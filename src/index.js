import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import RgbLine from './components/RgbLine';

const reducer = combineReducers({
  stations: (state = [], action) => {
    switch (action.type) {
      case 'ADD_STATION':
        return [...state, action.station];
      default:
        return [...state];
    }
  },
});

const store = createStore(reducer);

document.addEventListener('DOMContentLoaded', () => {
  const app = document.createElement('div');
  document.body.appendChild(app);

  store.dispatch({
    type: 'ADD_STATION',
    station: {
      name: 'T-Centralen',
      color: '#FF0000',
      point: { x: 200, y: 300 },
    }
  });

  ReactDOM.render(
    <Provider store={store}>
      <RgbLine />
    </Provider>,
    app
  );

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
  const skärmarbrink = new Station(Point.center().add({ y: 225, x: 150 }), '#00c600');
  const hammarbyhöjden = new Station(Point.center().add({ y: 250, x: 200 }), '#00c600');
  const blåsut = new Station(Point.center().add({ y: 250, x: 150 }), '#00c600');
  const globen = new Station(Point.center().add({ y: 250, x: 100 }), '#00c600');
  medborgarplatsen.render();
  skanstull.render();
  gullmarsplan.render();
  skärmarbrink.render();
  hammarbyhöjden.render();
  blåsut.render();
  globen.render();

  const rådhuset = new Station(Point.center().add({ y: 25, x: -50 }), '#0273ff');
  const fridhemsplan = new Station(Point.center().add({ y: 25, x: -100 }), '#0273ff');
  const stadshagen = new Station(Point.center().add({ y: 0, x: -150 }), '#0273ff');
  const västraskogen = new Station(Point.center().add({ y: -25, x: -200 }), '#0273ff');
  const huvudsta = new Station(Point.center().add({ y: -50, x: -250 }), '#0273ff');
  const solnacentrum = new Station(Point.center().add({ y: -50, x: -200 }), '#0273ff');
  rådhuset.render();
  fridhemsplan.render();
  stadshagen.render();
  västraskogen.render();
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
