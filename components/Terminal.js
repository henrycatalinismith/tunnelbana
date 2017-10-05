import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { select } from "../reducers";
import actions from "../actions";
import { angle, rotate } from "../geometry/points";

export class Terminal extends React.Component {
  static propTypes = {
    connection: PropTypes.object,
    station: PropTypes.object,
    dragon: PropTypes.object,
    terminal: PropTypes.object,
    line: PropTypes.object,
    selectTerminal: PropTypes.func
  };

  static defaultProps = {
    selectTerminal: () => {}
  };

  constructor() {
    super();
    this.onMouseDown = this.onMouseDown.bind(this);
  }

  onMouseDown(event) {
    this.props.selectTerminal(this.props.terminal.get("id"));
  }

  render() {
    const terminal = this.props.terminal.toJS();
    const line = this.props.line.toJS();
    const station = this.props.station
      ? this.props.station.toJS()
      : this.props.dragon.toJS();
    const x = typeof terminal.x === "undefined" ? station.x : terminal.x;
    const y = typeof terminal.y === "undefined" ? station.y : terminal.y;

    const width = 10;
    const height = 30;
    let bottom = { x, y };

    return (
      <g className="terminal" id={terminal.id}>
        <rect
          style={{ cursor: "move" }}
          width={width}
          height={height}
          fill={line.color}
          x={bottom.x - 5}
          y={bottom.y - 25}
          onMouseDown={this.onMouseDown}
        />
      </g>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    connection: select("connections")
      .from(state)
      .byId(ownProps.terminal.get("connectionId")),
    dragon: select("dragon")
      .from(state)
      .dragon(),
    line: select("lines")
      .from(state)
      .byId(ownProps.terminal.get("lineId"))
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectTerminal: id => dispatch(actions.dragonGrab("terminal", id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Terminal);
