import {GET_ARTICLES_START, GET_ARTICLES_ERROR, GET_ARTICLES_SUCCESS} from './../actions/articlesActions';

const defaultArticles = [];

export default function daypartsReducer(state = defaultArticles, action) {
    switch (action.type) {
        case GET_ARTICLES_START:
            return state;
        case GET_ARTICLES_SUCCESS:
            return action.response;
        case GET_ARTICLES_ERROR:
            return defaultArticles;
        default:
            return state;
    }
}