import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Station from './Station';

export class RgbLine extends React.Component {
  static propTypes = {
    stations: PropTypes.array,
    viewBox: PropTypes.shape({
      minX: PropTypes.number,
      minY: PropTypes.number,
      width: PropTypes.number,
      height: PropTypes.number,
    }),
  }

  render() {
    const viewBox = [
      this.props.viewBox.minX,
      this.props.viewBox.minY,
      this.props.viewBox.width,
      this.props.viewBox.height,
    ].join(' ');
    console.log(this.props);

    return (
      <svg viewBox={viewBox}>
        {this.props.stations.map((station, i) => (
          <Station key={`station-${i}`} {...station} />
        ))}
      </svg>
    );
  }
}

const mapStateToProps = state => {
  return {
    stations: state.stations,
    viewBox: state.viewBox,
  };
}

export default connect(mapStateToProps)(RgbLine);
