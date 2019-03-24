import { connect as connectRedux } from 'react-redux';
import * as R from 'ramda';

export function connect(keys) {
  return connectRedux(R.pick(keys));
}
