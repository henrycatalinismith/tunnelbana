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
    return (
      <g className="dragon">
        <circle
          style={{ pointerEvents: "none" }}
          cx={dragon.x}
          cy={dragon.y}
          r={0}
        />
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
