import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import actions from "../actions";

export class Passenger extends React.Component {
  static propTypes = {
    passenger: PropTypes.object,
    x: PropTypes.number,
    y: PropTypes.number
  };

  render() {
    const id = this.props.passenger.get("id");
    console.log(this.props.x);

    return (
      <g className="passenger" id={id}>
        <text x={this.props.x} y={this.props.y} fontSize={10}>
          ❤️
        </text>
      </g>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Passenger);
