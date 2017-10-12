import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { select } from "../reducers";
import actions from "../actions";

const perform = {
  circle: (x, y) => <circle cx={x} cy={y} r={5} />,
  square: (x, y) => <circle cx={x} cy={y} r={5} />
  /*
  square: (x, y) => {
    const width = 10;
    const height = 10;
    const center = {
      x: x - (width / 2),
      y: y - (height / 2)
    };
    console.log(x, y, center);
    return (
      <rect
        x={center.x}
        y={center.y}
        width={width}
        height={height}
        stroke="none"
        fill="black"
      />
    );
  },
  */
};
//const perform = genderId => ({
//circle:
////square: (x, y) => <circle cx={x} cy={y} r={5} />,
//})[genderId]

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

    if (!x) {
      console.log(id, this.props);
      return null;
    }

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
