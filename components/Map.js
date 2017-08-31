import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Line from './Line';
import Station from './Station';
import Connection from './Connection';
import Track from './Track';
import Train from './Train';
import { connections } from '../reducers/connections';
import { lines } from '../reducers/lines';
import { stations } from '../reducers/stations';
import { tracks } from '../reducers/tracks';
import { trains } from '../reducers/trains';

export class Map extends React.Component {
  static propTypes = {
    connections: PropTypes.array,
    lines: PropTypes.object,
    map: PropTypes.object,
    stations: PropTypes.array,
    tracks: PropTypes.array,
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
        {lines(this.props.lines).map((line, i) => (
          <Line
            key={`line-${i}`}
            line={line}
          />
        ))}

        {this.props.tracks.map((track, i) => (
          <Track
            key={`track-${i}`}
            track={track}
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
    connections: connections(state.connections),
    lines: state.lines,
    map: state.map,
    stations: stations(state.stations),
    tracks: tracks(state.tracks),
    trains: trains(state.trains),
  };
}

export default connect(mapStateToProps)(Map);
