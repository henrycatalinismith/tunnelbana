import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export class RgbLine extends React.Component {
  static propTypes = {
    stations: PropTypes.array,
  }

  render() {
    console.log('rendering', this.props.stations);
    return (
      <svg viewBox="0 0 400 400">
        {this.props.stations.map((station, i) => (
          <circle
            key={`station-${i}`}
            cx={station.point.x}
            cy={station.point.y}
            r={10}
            fill="red"
          />
        ))}
      </svg>
    );
  }
}

const mapStateToProps = state => {
  return {
    stations: state.stations,
  };
}

export default connect(mapStateToProps)(RgbLine);
