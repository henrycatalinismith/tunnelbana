import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { journey } from '../reducers/journeys';
import { station, stations } from '../reducers/stations';
import { train } from '../reducers/trains';

export class Train extends React.Component {
  static propTypes = {
    journey: PropTypes.object,
    map: PropTypes.object,
    station: PropTypes.object,
    train: PropTypes.object,
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.station.id !== this.props.station.id
      || !this.props.journey
      || nextProps.journey && this.props.journey.id !== nextProps.journey.Id;
  }

  render() {
    const width = 30;
    const height = 15;
    let x = (this.props.station.x - (width / 2));
    let y = (this.props.station.y - (height / 2));

    const pathId = `#track-Kungsträdgården-T-Centralen-Blue`
    console.log(this.props.train.stationId, this.props.train.journeyId);
    x = this.props.journey ? undefined : x;
    y = this.props.journey ? undefined : x;


    console.log(x, y, !!this.props.journey)
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
        {this.props.journey && (
          <animateMotion dur="1s" repeatCount="0">
            <mpath xlinkHref={pathId} />
          </animateMotion>
        )}
      </rect>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    map: state.map,
    station: station(state.stations, ownProps.train.stationId),
    journey: journey(state.journeys, ownProps.train.journeyId),
  };
}

export default connect(mapStateToProps)(Train);
