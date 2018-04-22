export default store => next => action => {
    console.log('---logger middleware: state before', store.getState())
    console.log('---logger middleware: dispatching action', action)
    next(action)
    console.log('---logger middleware: state after', store.getState())
}