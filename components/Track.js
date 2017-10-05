import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
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

    return (
      <g className="track" id={this.props.track.id}>
        <path
          d={path}
          stroke={line.color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
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
