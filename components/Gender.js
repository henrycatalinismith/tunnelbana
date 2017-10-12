import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { select } from "../reducers";
import actions from "../actions";

export class Gender extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    gender: PropTypes.object,
    x: PropTypes.number,
    y: PropTypes.number
  };

  render() {
    const id = this.props.gender.get("id");

    return (
      <g className="gender" id={id}>
        <circle cx={this.props.x} cy={this.props.y} r={5} />
      </g>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const genderId = ownProps.id;
  const gender = select("genders")
    .from(state)
    .byId(genderId);
  return { gender };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Gender);
