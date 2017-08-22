import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { line } from '../reducers/lines';
import { journey } from '../reducers/journeys';
import { station, stations } from '../reducers/stations';
import { train } from '../reducers/trains';

export class Train extends React.Component {
  static propTypes = {
    source: PropTypes.object,
    destination: PropTypes.object,
    line: PropTypes.object,
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

    //const pathId = `#track-Kungsträdgården-T-Centralen-Blue`
    console.log(this.props.train.stationId, this.props.train.journeyId);

    //id={`track-${this.props.source.id}-${this.props.destination.id}-${this.props.line.id}`}
    //id={}

    let pathId;
    if (this.props.journey) {
      pathId = `#track-${this.props.source.id}-${this.props.destination.id}-${this.props.line.id}`;
      console.log(pathId);
    }

    return (
      <rect
        id={`train-${this.props.train.id}`}
        ref={el => this.element = el}
        x={pathId ? undefined : x}
        y={pathId ? undefined : y}
        width={width}
        height={height}
        fill="gray"
      >
        {this.props.journey && (
          <animateMotion id={Math.random()} dur={`1s`} repeatCount="infinite">
            <mpath xlinkHref={pathId} />
          </animateMotion>
        )}
      </rect>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const j = ownProps.train.journeyId
    ? journey(state.journeys, ownProps.train.journeyId)
    : undefined;

  return {
    map: state.map,
    station: station(state.stations, ownProps.train.stationId),
    journey: j,
    source: j && station(state.stations, j.sourceId),
    destination: j && station(state.stations, j.destinationId),
    line: j && line(state.lines, j.lineId),
  };
}

export default connect(mapStateToProps)(Train);
