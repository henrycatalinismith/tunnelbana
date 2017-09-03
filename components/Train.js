import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { select } from "../reducers";

export class Train extends React.Component {
  static propTypes = {
    station: PropTypes.object,
    train: PropTypes.object
  };

  render() {
    const { train } = this.props;
    const width = 30;
    const height = 15;
    return (
      <g className="train" id={train.get("id")}>
        <rect width={width} height={height} fill="gray" />
      </g>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    station: select("stations")
      .from(state)
      .byId(ownProps.train.get("stationId")),
    journey: select("journeys")
      .from(state)
      .byId(ownProps.train.get("journeyId"))
  };
};

export default connect(mapStateToProps)(Train);
