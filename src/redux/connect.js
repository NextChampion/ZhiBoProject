import { connect as connectRedux } from 'react-redux';
import * as R from 'ramda';

// eslint-disable-next-line import/prefer-default-export
export function connect(keys) {
    return connectRedux(R.pick(keys));
}
