import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { distance } from "../geometry/points";
import { select } from "../reducers";

export class Track extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    track: PropTypes.object,
    line: PropTypes.object
  };

  render() {
    const track = this.props.track.toJS();
    const line = this.props.line.toJS();

    const path = "M" + [track.x1, track.y1, track.x2, track.y2].join(" ");
    const strokeWidth = 10;

    const length = distance(
      { x: track.x1, y: track.y1 },
      { x: track.x2, y: track.y2 }
    );
    const halfway = length / 2;

    const markerStyle = {
      fill: line.color
    };

    return (
      <g className="track" id={this.props.track.id}>
        <defs>
          <marker
            style={markerStyle}
            id={`m-${track.id}`}
            viewBox="0 0 10 10"
            refX={halfway / 2}
            refY="5"
            markerWidth="4"
            markerHeight="2"
            orient="auto"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" />
          </marker>
        </defs>

        <path
          d={path}
          stroke={line.color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          markerEnd={`url(#m-${track.id})`}
        />
      </g>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const track = select("tracks")
    .from(state)
    .byId(ownProps.id);
  return {
    track,
    line: select("lines")
      .from(state)
      .byId(track.get("lineId"))
  };
};

export default connect(mapStateToProps)(Track);
