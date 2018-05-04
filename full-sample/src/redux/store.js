import {createStore, applyMiddleware, compose} from 'redux'
import {routerMiddleware} from 'react-router-redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './reducer'
import history from '../history'
import rootSaga from './saga'

const sagaMiddleware = createSagaMiddleware();

function configureStoreProd() {
    const middlewares = [
        sagaMiddleware,
        routerMiddleware(history)
    ];

    return (initialState) => {
        const store = createStore(rootReducer, initialState, compose(applyMiddleware(...middlewares)));
        sagaMiddleware.run(rootSaga);

        return store;
    };
}

function configureStoreDev() {
    const middlewares = [
        sagaMiddleware,
        routerMiddleware(history)
    ];

    const composeEnhancers =
        typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
                // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
            }) : compose;

    return (initialState) => {
        const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(...middlewares)));
        sagaMiddleware.run(rootSaga);

        return store;
    };
}

const configureStore = process.env.NODE_ENV === 'production' ? configureStoreProd() : configureStoreDev();

export default configureStore;
