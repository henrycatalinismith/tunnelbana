import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { station, stations } from '../reducers/stations';
import { train } from '../reducers/trains';

export class Train extends React.Component {
  static propTypes = {
    map: PropTypes.object,
    station: PropTypes.object,
    train: PropTypes.object,
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.station.id !== this.props.station.id;
  }

  render() {
    const width = 15;
    const height = 30;
    const x = (
      (this.props.map.viewBox.width / 2)
      + this.props.map.center.x
      + this.props.station.x
      - (width / 2)
    );
    const y = (
      (this.props.map.viewBox.height / 2)
      + this.props.map.center.y
      + this.props.station.y
      - (height / 2)
    );

    const pathId = `#connection-T-Centralen-Kungsträdgården-Blue`

    return (
      <rect
        id={`train-${this.props.train.id}`}
        ref={el => this.element = el}
        x={x}
        y={y}
        width={width}
        height={height}
        fill="gray"
      >
        <animateMotion dur="0.1s" repeatCount="indefinite">
          <mpath xlinkHref={pathId} />
        </animateMotion>
      </rect>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    map: state.map,
    station: station(state.stations, ownProps.train.stationId),
  };
}

export default connect(mapStateToProps)(Train);
