import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export class Station extends React.Component {
  static propTypes = {
    station: PropTypes.object,
  }

  render() {
    const x = this.props.station.x;
    const y = this.props.station.y;

    return (
      <circle
        cx={x}
        cy={y}
        r={10}
        stroke="black"
        strokeWidth="5"
        fill="white"
      />
    );
  }
}

const mapStateToProps = state => {
  return {};
}

export default connect(mapStateToProps)(Station);
