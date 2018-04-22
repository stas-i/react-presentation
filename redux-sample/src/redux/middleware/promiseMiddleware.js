const PromiseMiddleware = ({dispatch}) => next => action => {
    const {promise, pending, success, fail} = action;
    if (!promise) {
        return next(action);
    }

    dispatch(pending());
    return promise.then(
        res => dispatch(success(res)),
        err => dispatch(fail(err))
    );
};

export default PromiseMiddleware;