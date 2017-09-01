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

    const from = {
      x: source.x,
      y: source.y,
    };

    const to = {
      ...terminal,
      ...destination,
    };

    let path;

    if (tracks.length > 0) {
      path = 'M' + tracks.map(t => `${t.x1} ${t.y1} ${t.x2} ${t.y2}`).join(' ');
    } else {
      path = 'M' + [from.x, from.y, to.x, to.y].join(' ');
    }

    const strokeWidth = this.props.line.isSelected ? 12 : 8;

    return (
      <g className='connection' id={connection.id}>
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
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
          fill="none"
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
    line: line(state.get('lines'), lineId),
    map: state.get('map'),
    source: station(state.get('stations'), sourceId),
    destination: station(state.get('stations'), destinationId),
    sourceTerminal: terminalByLineAndStation(state.get('terminals'), lineId, sourceId),
    destinationTerminal: terminalByLineAndStation(state.get('terminals'), lineId, destinationId),
  };
}

export default connect(mapStateToProps)(Connection);
