import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { select } from "../reducers";
import Line from "./Line";
import Station from "./Station";
import Train from "./Train";

export class Map extends React.Component {
  static propTypes = {
    lines: PropTypes.object,
    map: PropTypes.object,
    stations: PropTypes.object,
    trains: PropTypes.object
  };

  render() {
    const viewBox = [
      this.props.map.viewBox.minX,
      this.props.map.viewBox.minY,
      this.props.map.viewBox.width,
      this.props.map.viewBox.height
    ].join(" ");
    const { lines, stations, trains } = this.props;

    return (
      <svg viewBox={viewBox}>
        {lines.map((l, i) => <Line key={`line-${i}`} line={l} />)}
        {trains.map((t, i) => <Train key={`train-${i}`} train={t} />)}
        {stations.map((s, i) => <Station key={`station-${i}`} station={s} />)}
      </svg>
    );
  }
}

const mapStateToProps = state => {
  return {
    lines: select("lines")
      .from(state)
      .all(),
    map: state.get("map"),
    stations: select("stations")
      .from(state)
      .all(),
    trains: select("trains")
      .from(state)
      .all()
  };
};

export default connect(mapStateToProps)(Map);
