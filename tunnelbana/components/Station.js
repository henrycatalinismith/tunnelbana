import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { select } from "../reducers";
import actions from "../actions";
import Passenger from "./Passenger";
import Gender from "./Gender";

export class Station extends React.Component {
  static propTypes = {
    id: PropTypes.string,

    station: PropTypes.object,
    gender: PropTypes.object,
    passengers: PropTypes.object,
    dragon: PropTypes.object
  };

  render() {
    const id = this.props.station.get("id");
    const x = this.props.station.get("x");
    const y = this.props.station.get("y");
    const translate = `translate(${Math.round(x)}, ${Math.round(y)})`;
    const genderId = this.props.gender.get("id");

    return (
      <g className="station" id={id} transform={translate}>
        <Gender id={genderId} x={0} y={0} size="station" />
        {this.props.passengers.map((passenger, i) => {
          return (
            <Passenger
              key={`passenger-${i}`}
              id={passenger.get("id")}
              x={20 + i * 10}
              y={-5}
            />
          );
        })}
      </g>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const station = select("stations")
    .from(state)
    .byId(ownProps.id);
  const gender = select("genders")
    .from(state)
    .byId(station.get("genderId"));
  return {
    station,
    gender,
    passengers: select("passengers")
      .from(state)
      .byStationId(ownProps.id),
    dragon: select("dragon")
      .from(state)
      .dragon()
  };
};

export default connect(mapStateToProps)(Station);
