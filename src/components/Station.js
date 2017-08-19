import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export class Station extends React.Component {
  static propTypes = {
    map: PropTypes.object,
    point: PropTypes.object,
  }

  render() {
    const x = (
      (this.props.map.viewBox.width / 2)
      + this.props.map.center.x
      + this.props.point.x
    );
    const y = (
      (this.props.map.viewBox.height / 2)
      + this.props.map.center.y
      + this.props.point.y
    );

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
  return {
    map: state.map,
  };
}

export default connect(mapStateToProps)(Station);
