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
    const translate = `translate(${dragon.x}, ${dragon.y})`;
    return (
      <g className="dragon" transform={translate}>
        <circle style={{ pointerEvents: "none" }} cx={0} cy={0} r={0} />

        <use xlinkHref={`#${dragon.id}`} transform="translate(0,0)" />
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
