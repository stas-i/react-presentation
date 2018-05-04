import {combineReducers} from 'redux'
import {routerReducer as router} from 'react-router-redux'
import {reducer as form} from 'redux-form'
import articlesReducer, {moduleName as articlesModule} from '../ducks/articles'
import commentsReducer, {moduleName as commentsModule} from '../ducks/comments'
import filterReducer, {moduleName as filterModule} from '../ducks/filter'

export default combineReducers({
    router,
    form,
    [articlesModule]: articlesReducer,
    [commentsModule]: commentsReducer,
    [filterModule]: filterReducer
})