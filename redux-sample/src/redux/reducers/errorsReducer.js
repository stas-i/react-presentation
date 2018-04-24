import initialState from '../initialState';

export default function errorLoggingReducer(state = initialState.lastError, action) {
    if (action.type.endsWith('_ERROR')) {
        console.error(action.reason);

        return action.reason;
    }

    return state;
}