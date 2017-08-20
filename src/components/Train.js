import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Snap from 'snapsvg';

export class Train extends React.Component {
  static propTypes = {
    stationName: PropTypes.string,
    map: PropTypes.object,
    station: PropTypes.object,
  }

  componentDidMount() {
    const r = Snap(this.element);
    console.log(this.element, r);
    r.animate({
      x: 50,
      y: 50,
    }, 1000);
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
        ref={el => this.element = el}
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
