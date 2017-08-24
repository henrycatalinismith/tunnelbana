import React from 'react';
import PropTypes from 'prop-types';
import Terminal from './Terminal';
import { connect } from 'react-redux';
import { line } from '../reducers/lines';
import { station, stations } from '../reducers/stations';
import { terminalByLineAndStation } from '../reducers/terminals';

export class Connection extends React.Component {
  static propTypes = {
    connection: PropTypes.object,
    line: PropTypes.object,
    map: PropTypes.object,
    source: PropTypes.object,
    destination: PropTypes.object,
    sourceTerminal: PropTypes.object,
    destinationTerminal: PropTypes.object,
  }

  render() {
    const from = {
      x: this.props.source.x,
      y: this.props.source.y,
    };

    const to = {
      x: this.props.destination.x,
      y: this.props.destination.y,
    };

    if (isNaN(from.y)) {
      console.log(this.props.source);
      console.error('omg')
    }

    const outboundPath = 'M' + [from.x, from.y, to.x, to.y].join(' ');
    const returnPath = 'M' + [to.x, to.y, from.x, from.y].join(' ');

    return (
      <g id={`connection-${this.props.source.id}-${this.props.destination.id}-${this.props.line.id}`}>
        {this.props.sourceTerminal && (
          <Terminal
            station={this.props.source}
            terminal={this.props.sourceTerminal}
          />
        )}
        <path
          id={`track-${this.props.source.id}-${this.props.destination.id}-${this.props.line.id}`}
          d={outboundPath}
          stroke={this.props.line.color}
          strokeWidth="8"
        />

        <path
          id={`track-${this.props.destination.id}-${this.props.source.id}-${this.props.line.id}`}
          d={returnPath}
          stroke={this.props.line.color}
          strokeWidth="8"
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
