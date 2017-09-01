import React from 'react';
import PropTypes from 'prop-types';
import Connection from './Connection';
import { connect } from 'react-redux';
import { select } from '../reducers';
import { getConnectionsByLine } from '../reducers/connections';

export class Line extends React.Component {
  static propTypes = {
    line: PropTypes.object,
    connections: PropTypes.object,
  }

  render() {
    const { line, connections } = this.props;
    return (
      <g className="line" id={line.id}>
        {connections.map((c, i) => {
          return (
            <Connection
              key={`connection-${i}`}
              connection={c}
              line={line}
            />
          );
        })}
      </g>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const lineId = ownProps.line.get('id');
  return {
    connections: select('connections').from(state).byLineId(lineId),
  };
}

export default connect(mapStateToProps)(Line);
