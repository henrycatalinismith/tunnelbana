import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { select } from "../reducers";
import actions from "../actions";

const perform = {
  circle: (x, y, size) => {
    return {
      passenger: <circle cx={x} cy={y} r={5} />,
      station: (
        <circle
          cx={x}
          cy={y}
          r={10}
          stroke="black"
          strokeWidth="5"
          fill="white"
        />
      )
    }[size];
  },

  square: (x, y, size) => {
    return {
      passenger: () => {
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

  /*
    })(size) {
  }
  */
};

export class Gender extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    gender: PropTypes.object,
    size: PropTypes.oneOf(["passenger", "station"]),
    x: PropTypes.number,
    y: PropTypes.number
  };

  static defaultProps = {
    size: "station"
  };

  render() {
    const id = this.props.gender.get("id");
    const { x, y, size } = this.props;

    return (
      <g className="gender" id={id}>
        {perform[id](x, y, size)}
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
