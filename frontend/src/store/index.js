import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducer from '../usercomponents/reducers';

function configureStore(initialState) {
    let createStoreWithMiddleware;

    const logger = createLogger();
    const middleware = applyMiddleware(thunk, logger);

    createStoreWithMiddleware = compose(
        middleware,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

    return createStoreWithMiddleware(createStore)(reducer, initialState);
}

let store = configureStore();

export default store;