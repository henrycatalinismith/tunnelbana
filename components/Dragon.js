import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { select } from "../reducers";
import actions from "../actions";

export class Dragon extends React.Component {
  static propTypes = {
    dragon: PropTypes.object
  };

  render() {
    const dragon = this.props.dragon.toJS();
    console.log(dragon);
    return (
      <g className="dragon">
        <text x={dragon.x} y={dragon.y}>
          🐉
        </text>
      </g>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    dragon: select("dragon")
      .from(state)
      .dragon()
  };
};

export default connect(mapStateToProps)(Dragon);
