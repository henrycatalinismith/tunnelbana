import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export class RgbLine extends React.Component {
  static propTypes = {
    stations: PropTypes.array,
  }

  render() {
    console.log('rendering');
    return (
      <svg>
        <circle cx={50} cy={50} r={10} fill="red" />
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
