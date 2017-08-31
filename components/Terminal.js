import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import actions from '../actions';
import { connection } from '../reducers/connections';
import { line } from '../reducers/lines';
import { angle, rotate } from '../geometry/points';

export class Terminal extends React.Component {
  static propTypes = {
    connection: PropTypes.object,
    station: PropTypes.object,
    terminal: PropTypes.object,
    line: PropTypes.object,
    selectTerminal: PropTypes.func,
    deselectTerminal: PropTypes.func,
    moveTerminal: PropTypes.func,
  }

  static defaultProps = {
    selectTerminal: () => {},
  }

  constructor() {
    super();
    this.state = {
      xStart: 0,
      yStart: 0,
      xOffset: 0,
      yOffset: 0,
    };
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }

  onMouseDown(event) {
    this.props.selectTerminal({
      terminalId: this.props.terminal.id,
      connectionId: this.props.connection.id,
      lineId: this.props.line.id,
      stationId: this.props.station.id,
    });
    this.setState({
      xStart: event.screenX,
      yStart: event.screenY,
    })
  }

  onMouseMove(event) {
    const xOffset = (event.screenX - this.state.xStart);
    const yOffset = (event.screenY - this.state.yStart);
    this.setState({ xOffset, yOffset });
    this.props.moveTerminal(
      this.props.terminal.id,
      xOffset + this.props.station.x,
      yOffset + this.props.station.y
    )
  }

  onMouseUp(event) {
    this.props.deselectTerminal({
      terminalId: this.props.terminal.id,
      connectionId: this.props.connection.id,
      lineId: this.props.line.id,
      stationId: this.props.station.id,
    });
    this.setState({
      xOffset: 0,
      yOffset: 0,
    })
  }

  render() {
    const { line, station, terminal } = this.props;
    const x = typeof terminal.x === 'undefined' ? station.x : terminal.x;
    const y = typeof terminal.y === 'undefined' ? station.y : terminal.y;

    const width = terminal.isSelected ? 26 : 20;
    const height = terminal.isSelected ? 26 : 20;

    let bottom = { x, y };
    let topLeft = { x: x - width, y: y - height };
    let topRight = { x: x + width, y: y - height };
    const center = {
      x: bottom.x,
      y: bottom.y - height / 2,
    }

    if (terminal.isSelected) {
      const origin = { x: 0, y: 0 };
      const point = { x: this.state.xOffset, y: this.state.yOffset };
      const radians = angle(point, origin) - Math.PI / 2;
      bottom = rotate(center, bottom, radians);
      topLeft = rotate(center, topLeft, radians);
      topRight = rotate(center, topRight, radians);
    }

    const points = [
      [ bottom.x, bottom.y ].join(','),
      [ topLeft.x, topLeft.y ].join(','),
      [ topRight.x, topRight.y ].join(','),
    ].join(' ');

    const onMouseMove = terminal.isSelected && this.onMouseMove;
    const onMouseUp = terminal.isSelected && this.onMouseUp;

    // stick a huge transparent border around it while it's selected so that
    // the user doesn't accidentally mouseout the polygon because of the slight
    // redux/svg lag
    const stroke = terminal.isSelected ? 'transparent' : undefined;

    return (
      <g className="terminal" id={terminal.id}>
        <rect
          style={({ cursor: 'move' })}
          width={10} height={30}
          fill={line.color}
          x={bottom.x - 5}
          y={bottom.y - 25}
          onMouseDown={this.onMouseDown}
          onMouseMove={onMouseMove}
          onMouseOut={onMouseUp}
          onMouseUp={onMouseUp}
        />
      </g>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    connection: connection(state.connections, ownProps.terminal.connectionId),
    line: line(state.lines, ownProps.terminal.lineId),
  };
}

const mapDispatchToProps = dispatch => {
  return {
    selectTerminal: id => dispatch(actions.selectTerminal(id)),
    deselectTerminal: id => dispatch(actions.deselectTerminal(id)),
    moveTerminal: (id, x, y) => dispatch(actions.moveTerminal(id, x, y)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Terminal);
