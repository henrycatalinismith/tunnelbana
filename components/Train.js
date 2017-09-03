import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { select } from '../reducers';

export class Train extends React.Component {
  static propTypes = {
    source: PropTypes.object,
    destination: PropTypes.object,
    line: PropTypes.object,
    station: PropTypes.object,
    train: PropTypes.object,
  }

  render() {
    const width = 30;
    const height = 15;
    let x = (this.props.station.get('x') - (width / 2));
    let y = (this.props.station.get('y') - (height / 2));
    return (
      <g className="train" id={this.props.train.id}>
        <rect width={width} height={height} fill="gray" />
      </g>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const journey = ownProps.train.journeyId
    ? select('journeys').from(state).byId(ownProps.train.journeyId)
    : undefined;

  return {
    station: select('stations').from(state).byId(ownProps.train.get('stationId')),
    journey: journey,
    source: journey && select('stations').from(state).byId(journey.get('sourceId')),
    destination: journey && select('stations').from(state).byId(journey.get('destinationId')),
    line: journey && select('lines').from(state).byId(journey.get('lineId')),
  };
}

export default connect(mapStateToProps)(Train);


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

  rotateAround({ x, y }, angle) {
    var radians = (Math.PI / 180) * angle,
        cos = Math.cos(radians),
        sin = Math.sin(radians),
        nx = (cos * (this.x - x)) + (sin * (this.y - y)) + x,
        ny = (cos * (this.y - y)) - (sin * (this.x - x)) + y;
    this.x = nx;
    this.y = ny;
  }
}
