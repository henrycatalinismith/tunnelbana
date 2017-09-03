import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import actions from "../actions";

export class Station extends React.Component {
  static propTypes = {
    station: PropTypes.object,
    selectStation: PropTypes.func,
    deselectStation: PropTypes.func,
    moveStation: PropTypes.func
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
    this.props.selectStation(this.props.station.get("id")),
      this.setState({
        xStart: event.screenX,
        yStart: event.screenY
      });
  }

  onMouseMove(event) {
    const xOffset = event.screenX - this.state.xStart;
    const yOffset = event.screenY - this.state.yStart;

    this.setState({ xOffset, yOffset });
    this.props.moveStation(
      this.props.station.get("id"),
      xOffset + this.props.station.get("x"),
      yOffset + this.props.station.get("y")
    );
  }

  onMouseUp(event) {
    this.props.deselectStation(this.props.station.get("id"));
    this.setState({
      xOffset: 0,
      yOffset: 0
    });
  }

  render() {
    const id = this.props.station.get("id");
    const x = this.props.station.get("x");
    const y = this.props.station.get("y");
    const onMouseMove =
      this.props.station.get("isSelected") && this.onMouseMove;
    const onMouseUp = this.props.station.get("isSelected") && this.onMouseUp;
    console.log(this.props.station.get("isSelected"));

    return (
      <g className="station" id={id}>
        <circle
          cx={x}
          cy={y}
          r={10}
          stroke="black"
          strokeWidth="5"
          fill="white"
          onMouseDown={this.onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
        />
      </g>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    selectStation: id => dispatch(actions.selectStation(id)),
    deselectStation: id => dispatch(actions.deselectStation(id)),
    moveStation: (id, x, y) => dispatch(actions.moveStation(id, x, y))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Station);
