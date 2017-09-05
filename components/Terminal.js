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
    terminal: PropTypes.object,
    line: PropTypes.object,
    selectTerminal: PropTypes.func,
    deselectTerminal: PropTypes.func,
    moveTerminal: PropTypes.func
  };

  static defaultProps = {
    selectTerminal: () => {}
  };

  constructor() {
    super();
    this.state = {
      xStart: 0,
      yStart: 0,
      xOffset: 0,
      yOffset: 0
    };
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }

  onMouseDown(event) {
    this.props.selectTerminal(this.props.terminal.get("id"));
  }

  onMouseMove(event) {
    const xOffset = event.screenX - this.state.xStart;
    const yOffset = event.screenY - this.state.yStart;

    this.setState({ xOffset, yOffset });
    this.props.moveTerminal(
      this.props.terminal.get("id"),
      xOffset + this.props.station.get("x"),
      yOffset + this.props.station.get("y")
    );
  }

  onMouseUp(event) {
    this.props.deselectTerminal({
      terminalId: this.props.terminal.get("id"),
      connectionId: this.props.connection.get("id"),
      lineId: this.props.line.get("id"),
      stationId: this.props.station.get("id")
    });
    this.setState({
      xOffset: 0,
      yOffset: 0
    });
  }

  render() {
    const terminal = this.props.terminal.toJS();
    const line = this.props.line.toJS();
    const station = this.props.station.toJS();
    const x = typeof terminal.x === "undefined" ? station.x : terminal.x;
    const y = typeof terminal.y === "undefined" ? station.y : terminal.y;

    const width = 20;
    const height = 20;

    let bottom = { x, y };
    let topLeft = { x: x - width, y: y - height };
    let topRight = { x: x + width, y: y - height };
    const center = {
      x: bottom.x,
      y: bottom.y - height / 2
    };

    if (false && terminal.isSelected) {
      const origin = { x: 0, y: 0 };
      const point = { x: this.state.xOffset, y: this.state.yOffset };
      const radians = angle(point, origin) - Math.PI / 2;
      bottom = rotate(center, bottom, radians);
      topLeft = rotate(center, topLeft, radians);
      topRight = rotate(center, topRight, radians);
    }

    const points = [
      [bottom.x, bottom.y].join(","),
      [topLeft.x, topLeft.y].join(","),
      [topRight.x, topRight.y].join(",")
    ].join(" ");

    //const onMouseMove = terminal.isSelected && this.onMouseMove;
    const onMouseUp = terminal.isSelected && this.onMouseUp;

    // stick a huge transparent border around it while it's selected so that
    // the user doesn't accidentally mouseout the polygon because of the slight
    // redux/svg lag
    const stroke = terminal.isSelected ? "transparent" : undefined;

    return (
      <g className="terminal" id={terminal.id}>
        <rect
          style={{ cursor: "move" }}
          width={10}
          height={30}
          fill={line.color}
          x={bottom.x - 5}
          y={bottom.y - 25}
          onMouseDown={this.onMouseDown}
          onMouseOut={onMouseUp}
          onMouseUp={onMouseUp}
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
    line: select("lines")
      .from(state)
      .byId(ownProps.terminal.get("lineId"))
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectTerminal: id => dispatch(actions.dragonGrab("terminal", id)),
    deselectTerminal: id => dispatch(actions.dragonDrop("terminal", id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Terminal);
