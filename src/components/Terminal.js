import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import actions from '../actions';
import { line } from '../reducers/lines';

export class Terminal extends React.Component {
  static propTypes = {
    station: PropTypes.object,
    terminal: PropTypes.object,
    line: PropTypes.object,
    selectTerminal: PropTypes.func,
    deselectTerminal: PropTypes.func,
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
    this.props.selectTerminal(this.props.terminal.id);
    this.setState({
      xStart: event.screenX,
      yStart: event.screenY,
    })
  }

  onMouseMove(event) {
    this.setState({
      xOffset: (event.screenX - this.state.xStart) / 2, // no idea why it helps
      yOffset: (event.screenY - this.state.yStart) / 2, // to divide by 2 here
    })
  }

  onMouseUp(event) {
    this.props.deselectTerminal(this.props.terminal.id);
    this.setState({
      xOffset: 0,
      yOffset: 0,
    })
  }

  render() {
    const { line, station } = this.props;
    const points = [
      [
        this.state.xOffset + station.x + this.state.xOffset,
        this.state.yOffset + station.y + this.state.yOffset,
      ].join(','),
      [
        this.state.xOffset + station.x - 10 + this.state.xOffset,
        this.state.yOffset + station.y - 20 + this.state.yOffset,
      ].join(','),
      [
        this.state.xOffset + station.x + 10 + this.state.xOffset,
        this.state.yOffset + station.y - 20 + this.state.yOffset,
      ].join(','),
    ].join(' ');
    console.log(points);
    const onMouseMove = this.props.terminal.isSelected && this.onMouseMove;
    const onMouseUp = this.props.terminal.isSelected && this.onMouseUp;

    // stick a huge transparent border around it while it's selected so that
    // the user doesn't accidentally mouseout the polygon because of the slight
    // redux/svg lag
    const stroke = this.props.terminal.isSelected
      ? 'transparent'
      : undefined;

    return (
      <g>
        <polygon
          style={({ cursor: 'move' })}
          points={points}
          fill={line.color}
          stroke={stroke}
          strokeWidth={1000}
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
    line: line(state.lines, ownProps.terminal.lineId),
  };
}

const mapDispatchToProps = dispatch => {
  return {
    selectTerminal: id => dispatch(actions.selectTerminal(id)),
    deselectTerminal: id => dispatch(actions.deselectTerminal(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Terminal);
