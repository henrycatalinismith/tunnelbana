import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { select } from "../reducers";
import Passenger from "./Passenger";

export class Train extends React.Component {
  static propTypes = {
    passengers: PropTypes.object,
    station: PropTypes.object,
    train: PropTypes.object
  };

  render() {
    const { train } = this.props;
    const { passengers } = this.props;
    const width = 30;
    const height = 15;
    if (this.props.station) {
      const x = this.props.station.get("x");
      const y = this.props.station.get("y");
      return <circle cx={x} cy={y} r={20} fill="gray" />;
    } else if (this.props.journey) {
      return (
        <g className="train" id={train.get("id")}>
          <circle r={10} fill="gray" />
          {this.props.passengers.map((passenger, i) => {
            return <Passenger key={`passenger-${i}`} passenger={passenger} />;
          })}
        </g>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    station: select("stations")
      .from(state)
      .byId(ownProps.train.get("stationId")),
    journey: select("journeys")
      .from(state)
      .byId(ownProps.train.get("journeyId")),
    passengers: select("passengers")
      .from(state)
      .byTrainId(ownProps.train.get("id"))
  };
};

export default connect(mapStateToProps)(Train);
