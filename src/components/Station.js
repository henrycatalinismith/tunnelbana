import React from 'react';
import PropTypes from 'prop-types';

export default class Station extends React.Component {
  static propTypes = {
    point: PropTypes.object,
  }

  render() {
    return (
      <circle
        cx={this.props.point.x}
        cy={this.props.point.y}
        r={10}
        stroke="red"
        strokeWidth="5"
        fill="white"
      />
    );
  }
}
