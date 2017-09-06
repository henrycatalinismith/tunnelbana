import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { select } from "../reducers";

export class Track extends React.Component {
  static propTypes = {
    track: PropTypes.object,
    line: PropTypes.object
  };

  render() {
    const track = this.props.track;
    const line = this.props.line.toJS();

    const path = "M" + [track.x1, track.y1, track.x2, track.y2].join(" ");
    const strokeWidth = 10;

    return (
      <g className="track" id={this.props.track.id}>
        <path
          d={path}
          stroke={"black"}
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
  return {
    line: select("lines")
      .from(state)
      .byId(ownProps.track.lineId)
  };
};

export default connect(mapStateToProps)(Track);
