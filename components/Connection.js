import React from 'react';
import PropTypes from 'prop-types';
import Terminal from './Terminal';
import { connect } from 'react-redux';
import { line } from '../reducers/lines';
import { station, stations } from '../reducers/stations';
import { terminalByLineAndStation } from '../reducers/terminals';
import { getTracksByConnectionOneWay } from '../reducers/tracks';

export class Connection extends React.Component {
  static propTypes = {
    connection: PropTypes.object,
    line: PropTypes.object,
    map: PropTypes.object,
    source: PropTypes.object,
    destination: PropTypes.object,
    terminal: PropTypes.object,
    sourceTerminal: PropTypes.object,
    destinationTerminal: PropTypes.object,
  }

  render() {
    const { connection, source, destination, terminal } = this.props;
    const { tracks } = connection;

    console.log(Math.random());
    const from = {
      x: source.x,
      y: source.y,
    };

    const to = {
      ...terminal,
      ...destination,
    };

    const path = 'M' + tracks.map(t => `${t.x1} ${t.y1} ${t.x2} ${t.y2}`).join(' ');

    /*
    return (
      <g id={this.props.track.id}>
        <path
          d={path}
          stroke={this.props.line.color}
          strokeWidth={strokeWidth}
        />
      </g>
      */

    const outboundPath = 'M' + [from.x, from.y, to.x, to.y].join(' ');
    const returnPath = 'M' + [to.x, to.y, from.x, from.y].join(' ');
    const strokeWidth = 0;

    return (
      <g id={`connection-${this.props.source.id}-${destination && destination.id}-${this.props.line.id}`}>
        {this.props.sourceTerminal && (
          <Terminal
            station={this.props.source}
            terminal={this.props.sourceTerminal}
          />
        )}
        <path
          id={`track-${this.props.source.id}-${destination && destination.id}-${this.props.line.id}`}
          d={path}
          stroke={this.props.line.color}
          strokeWidth={10}
          strokeLinejoin="round"
          fill="none"
        />

        <path
          id={`track-${destination && destination.id}-${this.props.source.id}-${this.props.line.id}`}
          d={returnPath}
          stroke={this.props.line.color}
          strokeWidth={strokeWidth}
        />

        {this.props.destinationTerminal && (
          <Terminal
            station={this.props.destination}
            terminal={this.props.destinationTerminal}
          />
        )}
      </g>

    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { lineId, sourceId, destinationId } = ownProps.connection;
  return {
    line: line(state.lines, lineId),
    map: state.map,
    source: station(state.stations, sourceId),
    destination: station(state.stations, destinationId),
    sourceTerminal: terminalByLineAndStation(state.terminals, lineId, sourceId),
    destinationTerminal: terminalByLineAndStation(state.terminals, lineId, destinationId),
  };
}

export default connect(mapStateToProps)(Connection);
