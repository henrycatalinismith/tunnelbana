import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export class Track extends React.Component {
  static propTypes = {
    track: PropTypes.object,
  }

  render() {
    const { track } = this.props;

    const path = 'M' + [track.x1, track.y1, track.x2, track.y2].join(' ');

    return (
      <g id={this.props.track.id}>
        <path
          d={path}
          stroke={'#000'}
          strokeWidth={2}
        />
      </g>

    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
  };
}

export default connect(mapStateToProps)(Track);
