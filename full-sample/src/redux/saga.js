import {all} from 'redux-saga/effects'
import {saga as commentsSaga} from '../ducks/comments'
import {saga as articlesSaga} from '../ducks/articles'

export default function * rootSaga() {
    yield all([
        commentsSaga(),
        articlesSaga()
    ])
}