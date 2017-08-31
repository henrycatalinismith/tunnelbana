import React from 'react';
import PropTypes from 'prop-types';
import Connection from './Connection';
import { connect } from 'react-redux';
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
        {Object.keys(connections).map((id, i) => (
          <Connection
            key={`connection-${i}`}
            connection={connections[id]}
            line={line}
          />
        ))}
      </g>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    connections: state.connections, // todo: do memoization right across the whole data model and stop hacking around it like this
  };
}

export default connect(mapStateToProps)(Line);
