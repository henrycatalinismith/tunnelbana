import React from "react";
import PropTypes from "prop-types";
import Terminal from "./Terminal";
import Track from "./Track";
import { connect } from "react-redux";
import { select } from "../reducers";

export class Connection extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    connection: PropTypes.object,
    line: PropTypes.object,
    source: PropTypes.object,
    destination: PropTypes.object,
    terminal: PropTypes.object,
    sourceTerminal: PropTypes.object,
    destinationTerminal: PropTypes.object,
    tracks: PropTypes.object
  };

  render() {
    const connection = this.props.connection.toJS();
    const source = this.props.source && this.props.source.toJS();
    const line = this.props.line && this.props.line.toJS();
    const destination = this.props.destination && this.props.destination.toJS();
    const terminal = this.props.terminal;
    const tracks = this.props.tracks;

    let path;

    if (tracks.length > 0) {
      path = "M" + tracks.map(t => `${t.x1} ${t.y1} ${t.x2} ${t.y2}`).join(" ");
    }
    const strokeWidth = line.isSelected ? 12 : 8;

    return (
      <g className="connection" id={connection.id}>
        {this.props.sourceTerminal && (
          <Terminal
            station={this.props.source}
            terminal={this.props.sourceTerminal}
          />
        )}

        {tracks.map((track, i) => {
          return <Track key={`track-${i}`} id={track.get("id")} />;
        })}

        {this.props.destinationTerminal && (
          <Terminal
            station={this.props.destination}
            terminal={this.props.destinationTerminal}
          />
        )}
      </g>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const connection = select("connections")
    .from(state)
    .byId(ownProps.id);
  const lineId = connection.get("lineId");
  const line = select("lines")
    .from(state)
    .byId(lineId);
  const sourceId = connection.get("sourceId");
  const destinationId = connection.get("destinationId");

  return {
    connection,
    line,
    source: select("stations")
      .from(state)
      .byId(sourceId),
    destination: select("stations")
      .from(state)
      .byId(destinationId),
    sourceTerminal: select("terminals")
      .from(state)
      .byLineAndStation(lineId, sourceId),
    destinationTerminal: select("terminals")
      .from(state)
      .byLineAndStation(lineId, destinationId),
    tracks: select("tracks")
      .from(state)
      .forRenderingConnection(connection.get("id"))
  };
};

export default connect(mapStateToProps)(Connection);
