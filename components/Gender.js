import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { select } from "../reducers";
import actions from "../actions";

const perform = {
  circle: (x, y) => {
    // circle, doesnt matter if x&y are undefined
    return <circle cx={x} cy={y} r={5} />;
  },
  square: (x, y) => {
    const r = 4;
    const d = r * 2;

    if (x !== undefined && y !== undefined) {
      // square passenger waiting at a station
      // has x,y and is fine
      x -= r;
      y -= r;
    } else {
      // square passenger about to leave on a train
      // x and y are undefined and it's a problem
    }

    return <rect x={x} y={y} width={d} height={d} />;
  }
};

export class Gender extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    gender: PropTypes.object,
    x: PropTypes.number,
    y: PropTypes.number
  };

  render() {
    const id = this.props.gender.get("id");
    const { x, y } = this.props;

    return (
      <g className="gender" id={id}>
        {perform[id](x, y)}
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
