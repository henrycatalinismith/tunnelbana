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

    return (
      <g className="passenger" id={id}>
        <circle cx={this.props.x} cy={this.props.y} r={5} />
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
