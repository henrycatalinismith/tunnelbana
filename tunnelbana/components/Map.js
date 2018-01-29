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
    window: PropTypes.object,
    stations: PropTypes.object,
    trains: PropTypes.object
  };

  render() {
    const viewbox = [
      0,
      0,
      this.props.window.get("width"),
      this.props.window.get("height")
    ].join(" ");
    const { lines, stations, trains } = this.props;

    return (
      <svg viewBox={viewbox}>
        {lines.map((l, i) => <Line key={`line-${i}`} id={l.get("id")} />)}
        {trains.map((t, i) => <Train key={`train-${i}`} id={t.get("id")} />)}
        {stations.map((s, i) => (
          <Station key={`station-${i}`} id={s.get("id")} />
        ))}
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
    window: select("window")
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
