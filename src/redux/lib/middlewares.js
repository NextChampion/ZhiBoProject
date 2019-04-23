import mapValues from 'lodash/mapValues';
import { createLogger } from 'redux-logger';

const middlewares = [];
// eslint-disable-next-line no-undef
if (__DEV__) {
    middlewares.push(
        createLogger({
            collapsed: true,
            stateTransformer: state =>
                mapValues(state, s => (s.toJS ? s.toJS() : s)),
        }),
    );
}

export default middlewares;
