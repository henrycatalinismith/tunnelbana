import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import actions from "../actions";
import Gender from "./Gender";

export class Passenger extends React.Component {
  static propTypes = {
    passenger: PropTypes.object,
    x: PropTypes.number,
    y: PropTypes.number
  };

  render() {
    const id = this.props.passenger.get("id");
    const { x, y } = this.props;

    return (
      <g className="passenger" id={id}>
        <Gender id="circle" x={x} y={y} />
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
