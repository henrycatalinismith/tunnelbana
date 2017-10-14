import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { select } from "../reducers";
import actions from "../actions";

const perform = {
  circle: size => {
    return {
      passenger: <circle cx={0} cy={0} r={5} />,
      station: (
        <circle
          cx={0}
          cy={0}
          r={10}
          stroke="black"
          strokeWidth="5"
          fill="white"
        />
      )
    }[size];
  },

  square: size => {
    return {
      passenger: () => {
        const r = 4;
        const d = r * 2;
        return <rect x={-4} y={-4} width={d} height={d} />;
      },
      station: () => {
        return (
          <rect
            x={0 - 18 / 2}
            y={0 - 18 / 2}
            width={18}
            height={18}
            stroke="black"
            strokeWidth="5"
            fill="white"
          />
        );
      }
    }[size].call();
  }
};

export class Gender extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    gender: PropTypes.object,
    size: PropTypes.oneOf(["passenger", "station"])
  };

  static defaultProps = {
    size: "station"
  };

  render() {
    const id = this.props.gender.get("id");
    const { size } = this.props;

    return (
      <g className="gender" id={id}>
        {perform[id](size)}
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
