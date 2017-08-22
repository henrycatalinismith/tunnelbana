import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { line } from '../reducers/lines';
import { station, stations } from '../reducers/stations';

export class Connection extends React.Component {
  static propTypes = {
    connection: PropTypes.object,
    line: PropTypes.object,
    map: PropTypes.object,
    source: PropTypes.object,
    destination: PropTypes.object,
  }

  render() {
    const from = {
      x: this.props.map.viewBox.width / 2
        + this.props.map.center.x
        + this.props.source.x,
      y: this.props.map.viewBox.height / 2
        + this.props.map.center.y
        + this.props.source.y,
    };

    const to = {
      x: this.props.map.viewBox.width / 2
        + this.props.map.center.x
        + this.props.destination.x,
      y: this.props.map.viewBox.height / 2
        + this.props.map.center.y
        + this.props.destination.y,
    };
    if (isNaN(from.y)) {
      console.log(this.props.source);
      console.error('omg')
    }

    const d = 'M' + [from.x, from.y, to.x, to.y].join(' ');

    return (
      <path
        id={`connection-${this.props.source.id}-${this.props.destination.id}-${this.props.line.id}`}
        d={d}
        stroke={this.props.line.color}
        strokeWidth="8"
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    line: line(state.lines, ownProps.connection.lineId),
    map: state.map,
    source: station(state.stations, ownProps.connection.sourceId),
    destination: station(state.stations, ownProps.connection.destinationId),
  };
}

export default connect(mapStateToProps)(Connection);
