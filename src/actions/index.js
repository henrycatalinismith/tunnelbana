import * as connections from './connections';
import * as lines from './lines';
import * as map from './map';
import * as stations from './stations';
import * as terminals from './terminals';
import * as trains from './trains';
import * as window from './window';

export default {
  ...connections,
  ...lines,
  ...map,
  ...stations,
  ...terminals,
  ...trains,
  ...window,
};
