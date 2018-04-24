import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import logger from "./middleware/logger";
import promiseMiddleware from "./middleware/promiseMiddleware";
import rootReducer from './reducers'

function configureStoreProd(initialState) {
    const middlewares = [
        thunk,
        promiseMiddleware
    ];

    return createStore(rootReducer, initialState, compose(applyMiddleware(...middlewares)));
}

function configureStoreDev(initialState) {
    const middlewares = [
        thunk,
        promiseMiddleware,
        logger
    ];

    const composeEnhancers =
        typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
                // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
            }) : compose;

    return createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(...middlewares)));
}

const configureStore = process.env.NODE_ENV === 'production' ? configureStoreProd : configureStoreDev;

export default configureStore;
