import {createStore, applyMiddleware, compose} from 'redux'
import createSagaMiddleware from 'redux-saga'
import Reactotron from 'reactotron-react-js'
import reactotron from '../reactotron'
import rootReducer from './reducer'
import rootSaga from './saga'

const sagaMonitor = Reactotron.createSagaMonitor();
const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

function configureStoreProd() {
    const middlewares = [
        sagaMiddleware,
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
    ];

    const composeEnhancers =
        typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
                // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
            }) : compose;

    return (initialState) => {
        const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(...middlewares), reactotron.createEnhancer()));
        sagaMiddleware.run(rootSaga);

        return store;
    };
}

const configureStore = 
process.env.NODE_ENV === 'production' ?
 configureStoreProd() 
 : configureStoreDev();

export default configureStore;
