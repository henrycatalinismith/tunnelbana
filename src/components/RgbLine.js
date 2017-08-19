import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Station from './Station';

export class RgbLine extends React.Component {
  static propTypes = {
    stations: PropTypes.array,
  }

  render() {
    console.log('rendering', this.props.stations);
    return (
      <svg viewBox="0 0 400 400">
        {this.props.stations.map((station, i) => (
          <Station key={`station-${i}`} {...station} />
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
