import {combineReducers} from 'redux';
import articles from './articlesReducer';
import commentsReducer from './commentsReducer';
import errorLogging from './errorsReducer'
import filter from './filterReducer'

const rootReducer = combineReducers({
    articles,
    comments: commentsReducer, // This property name is IMPORTANT
    filter,
    errorLogging
});

export default rootReducer;