import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Snap from 'snapsvg';
import { stations } from '../reducers/stations';
import { train } from '../reducers/trains';

export class Train extends React.Component {
  static propTypes = {
    map: PropTypes.object,
    station: PropTypes.object,
    train: PropTypes.object,
  }

  componentDidMount() {
    const r = Snap(this.element);
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
      + this.props.station.x
      - (width / 2)
    );
    const y = (
      (this.props.map.viewBox.height / 2)
      + this.props.map.center.y
      + this.props.station.y
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
    station: stations(state.stations).filter(s => s.name === ownProps.train.stationName)[0],
  };
}

export default connect(mapStateToProps)(Train);
