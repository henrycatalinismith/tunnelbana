import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { line } from '../reducers/lines';
import { journey } from '../reducers/journeys';
import { station, stations } from '../reducers/stations';
import { train } from '../reducers/trains';

export class Train extends React.Component {
  static propTypes = {
    source: PropTypes.object,
    destination: PropTypes.object,
    line: PropTypes.object,
    journey: PropTypes.object,
    map: PropTypes.object,
    station: PropTypes.object,
    train: PropTypes.object,
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.station.id !== this.props.station.id
      || !this.props.journey
      || nextProps.journey && this.props.journey.id !== nextProps.journey.Id;
  }

  render() {
    const width = 30;
    const height = 15;
    let x = (this.props.station.x - (width / 2));
    let y = (this.props.station.y - (height / 2));

    return (
      <rect
        id={`train-${this.props.train.id}`}
        ref={el => this.element = el}
        width={width}
        height={height}
        fill="gray"
      >
        {this.props.journey && false && (
          <animateMotion id={Math.random()} dur={`1s`} repeatCount="infinite">
            <mpath xlinkHref={pathId} />
          </animateMotion>
        )}
      </rect>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const j = ownProps.train.journeyId
    ? journey(state.journeys, ownProps.train.journeyId)
    : undefined;

  return {
    map: state.map,
    station: station(state.stations, ownProps.train.stationId),
    journey: j,
    source: j && station(state.stations, j.sourceId),
    destination: j && station(state.stations, j.destinationId),
    line: j && line(state.lines, j.lineId),
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
