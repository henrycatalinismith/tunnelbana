import * as app from './app';
import * as connections from './connections';
import * as lines from './lines';
import * as map from './map';
import * as stations from './stations';
import * as terminals from './terminals';
import * as trains from './trains';

export default {
  ...app,
  ...connections,
  ...lines,
  ...map,
  ...stations,
  ...terminals,
  ...trains,
};
