import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { select } from "../reducers";
import Dragon from "./Dragon";
import Line from "./Line";
import Station from "./Station";
import Train from "./Train";

export class Map extends React.Component {
  static propTypes = {
    lines: PropTypes.object,
    viewbox: PropTypes.object,
    stations: PropTypes.object,
    trains: PropTypes.object
  };

  render() {
    const viewbox = [
      this.props.viewbox.get("minX"),
      this.props.viewbox.get("minY"),
      this.props.viewbox.get("width"),
      this.props.viewbox.get("height")
    ].join(" ");
    const { lines, stations, trains } = this.props;

    return (
      <svg viewBox={viewbox}>
        {lines.map((l, i) => <Line key={`line-${i}`} line={l} />)}
        {trains.map((t, i) => <Train key={`train-${i}`} train={t} />)}
        {stations.map((s, i) => <Station key={`station-${i}`} station={s} />)}
        <Dragon />
      </svg>
    );
  }
}

const mapStateToProps = state => {
  return {
    lines: select("lines")
      .from(state)
      .all(),
    viewbox: select("viewbox")
      .from(state)
      .all(),
    stations: select("stations")
      .from(state)
      .all(),
    trains: select("trains")
      .from(state)
      .all()
  };
};

export default connect(mapStateToProps)(Map);
