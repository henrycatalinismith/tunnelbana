import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { select } from "../reducers";
import actions from "../actions";

export class Dragon extends React.Component {
  static propTypes = {};

  render() {
    return (
      <g className="dragon">
        <text x="300" y="200">
          🐉
        </text>
      </g>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {};
};

export default connect(mapStateToProps)(Dragon);
