import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { select } from "../reducers";
import actions from "../actions";
import Passenger from "./Passenger";

export class Station extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    station: PropTypes.object,
    passengers: PropTypes.object,
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
        {this.props.passengers.map((passenger, i) => {
          return (
            <Passenger
              key={`passenger-${i}`}
              passenger={passenger}
              x={x + 20}
              y={y - 5}
            />
          );
        })}
      </g>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    station: select("stations")
      .from(state)
      .byId(ownProps.id),
    passengers: select("passengers")
      .from(state)
      .byStationId(ownProps.id)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectStation: id => dispatch(actions.dragonGrab("station", id)),
    deselectStation: id => dispatch(actions.dragonDrop("station", id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Station);
