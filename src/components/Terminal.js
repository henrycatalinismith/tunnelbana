import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { line } from '../reducers/lines';

export class Terminal extends React.Component {
  static propTypes = {
    station: PropTypes.object,
    terminal: PropTypes.object,
    line: PropTypes.object,
  }

  render() {
    const { line, station } = this.props;
    const points = [
      [station.x, station.y].join(','),
      [station.x - 10, station.y - 20].join(','),
      [station.x + 10, station.y - 20].join(','),
    ].join(' ');

    return (
      <polygon
        points={points}
        fill={line.color}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    line: line(state.lines, ownProps.terminal.lineId),
  };
}

export default connect(mapStateToProps)(Terminal);
