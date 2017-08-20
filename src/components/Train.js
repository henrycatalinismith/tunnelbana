import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export class Train extends React.Component {
  static propTypes = {
    stationName: PropTypes.string,
    map: PropTypes.object,
    station: PropTypes.object,
  }

  render() {
    const width = 15;
    const height = 30;
    const x = (
      (this.props.map.viewBox.width / 2)
      + this.props.map.center.x
      + this.props.station.point.x
      - (width / 2)
    );
    const y = (
      (this.props.map.viewBox.height / 2)
      + this.props.map.center.y
      + this.props.station.point.y
      - (height / 2)
    );

    return (
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill="gray"
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    map: state.map,
    station: state.stations.filter(s => s.name === ownProps.train.stationName)[0],
  };
}

export default connect(mapStateToProps)(Train);
