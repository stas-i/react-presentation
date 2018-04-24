import {ADD_COMMENT_SUCCESS, GET_ARTICLES_START, GET_ARTICLES_SUCCESS, UPDATE_RATING_START} from "../constants/actions";
import initialState from '../initialState';

export default function articlesReducer(state = initialState.articles, action) {
    switch (action.type) {
        case GET_ARTICLES_START:
            return state;
        case GET_ARTICLES_SUCCESS:
            return action.response;
        case UPDATE_RATING_START: {
            const {id, isIncrease} = action.payload;

            const articleIndex = state.findIndex(x => x.id === id);
            if (articleIndex === -1) {
                return state;
            }
            const article = state[articleIndex];
            const newRating = article.rating + (isIncrease ? 1 : -1);
            const updatedArticle = Object.assign({}, article, {rating: newRating});
            state.splice(articleIndex, 1, updatedArticle);
            return [...state];
        }
        case ADD_COMMENT_SUCCESS: {
            // bug fixed. We can listen to same actions in different reducers
            const {articleId, response} = action.payload;
            const articleIndex = state.findIndex(x => x.id === articleId);
            if (articleIndex === -1) {
                return state;
            }

            const article = state[articleIndex];
            const prevCommentsIds = article.commentsIds ? article.commentsIds : [];
            const commentsIds = [...prevCommentsIds, response.id];
            const updatedArticle = {...article, commentsIds};
            state.splice(articleIndex, 1, updatedArticle);

            return [...state];
        }
        default:
            return state;
    }
}