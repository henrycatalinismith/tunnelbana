import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export class Terminal extends React.Component {
  static propTypes = {
    station: PropTypes.object,
    terminal: PropTypes.object,
  }

  render() {
    return (
      <circle
        cx={this.props.station.x}
        cy={this.props.station.y}
        r={20}
        stroke="black"
        strokeWidth="5"
        fill="red"
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
  };
}

export default connect(mapStateToProps)(Terminal);
