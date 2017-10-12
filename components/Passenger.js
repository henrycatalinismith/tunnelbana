import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import actions from "../actions";
import { select } from "../reducers";
import Gender from "./Gender";

export class Passenger extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    passenger: PropTypes.object,
    gender: PropTypes.object,
    x: PropTypes.number,
    y: PropTypes.number
  };

  render() {
    const id = this.props.passenger.get("id");
    const genderId = this.props.gender.get("id");
    const { x, y } = this.props;

    return (
      <g className="passenger" id={id}>
        <Gender id={genderId} x={x} y={y} />
      </g>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const passengerId = ownProps.id;
  const passenger = select("passengers")
    .from(state)
    .byId(passengerId);
  const gender = select("genders")
    .from(state)
    .byId(passenger.get("genderId"));

  return { passenger, gender };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Passenger);
