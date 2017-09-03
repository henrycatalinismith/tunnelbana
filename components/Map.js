import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Line from './Line';
import Station from './Station';
import Connection from './Connection';
import Track from './Track';
import Train from './Train';
import { select } from '../reducers';

export class Map extends React.Component {
  static propTypes = {
    lines: PropTypes.object,
    map: PropTypes.object,
    stations: PropTypes.object,
    trains: PropTypes.object,
  }

  render() {
    const viewBox = [
      this.props.map.viewBox.minX,
      this.props.map.viewBox.minY,
      this.props.map.viewBox.width,
      this.props.map.viewBox.height,
    ].join(' ');

    return (
      <svg viewBox={viewBox}>
        {this.props.lines.map((line, i) => (
          <Line
            key={`line-${i}`}
            line={line}
          />
        ))}

        {this.props.trains.map((train, i) => (
          <Train
            key={`train-${i}`}
            train={train}
          />
        ))}

        {this.props.stations.map((station, i) => (
          <Station
            key={`station-${i}`}
            station={station}
          />
        ))}
      </svg>
    );
  }
}

const mapStateToProps = state => {
  return {
    lines: select('lines').from(state).all(),
    map: state.get('map'),
    stations: select('stations').from(state).all(),
    trains: select('trains').from(state).all(),
  };
}

export default connect(mapStateToProps)(Map);
