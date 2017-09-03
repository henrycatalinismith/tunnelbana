import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

export class Station extends React.Component {
  static propTypes = {
    station: PropTypes.object
  };

  render() {
    const id = this.props.station.get("id");
    const x = this.props.station.get("x");
    const y = this.props.station.get("y");

    return (
      <g className="station" id={id}>
        <circle
          cx={x}
          cy={y}
          r={10}
          stroke="black"
          strokeWidth="5"
          fill="white"
        />
      </g>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps)(Station);
