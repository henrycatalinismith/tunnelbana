import React from "react";
import PropTypes from "prop-types";
import Connection from "./Connection";
import { connect } from "react-redux";
import { select } from "../reducers";

export class Line extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    line: PropTypes.object,
    connections: PropTypes.object
  };

  render() {
    const { line, connections } = this.props;
    return (
      <g className="line" id={line.id}>
        {connections.map((c, i) => {
          return <Connection key={`connection-${i}`} id={c.get("id")} />;
        })}
      </g>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    line: select("lines")
      .from(state)
      .byId(ownProps.id),
    connections: select("connections")
      .from(state)
      .byLineId(ownProps.id)
  };
};

export default connect(mapStateToProps)(Line);
