import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import actions from "../actions";

export class Station extends React.Component {
  static propTypes = {
    station: PropTypes.object,
    selectStation: PropTypes.func,
    deselectStation: PropTypes.func
  };

  constructor() {
    super();
    this.onMouseDown = this.onMouseDown.bind(this);
  }

  onMouseDown(event) {
    this.props.selectStation(this.props.station.get("id"));
  }

  render() {
    const id = this.props.station.get("id");
    const x = this.props.station.get("x");
    const y = this.props.station.get("y");

    return (
      <g className="station" id={id}>
        <circle
          cx={x}
          cy={y}
          r={10}
          stroke="black"
          strokeWidth="5"
          fill="white"
          onMouseDown={this.onMouseDown}
        />
      </g>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    selectStation: id => dispatch(actions.dragonGrab("station", id)),
    deselectStation: id => dispatch(actions.dragonDrop("station", id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Station);
