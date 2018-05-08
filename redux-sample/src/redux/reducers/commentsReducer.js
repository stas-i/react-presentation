import {GET_COMMENTS_ERROR, GET_COMMENTS_START, GET_COMMENTS_SUCCESS, ADD_COMMENT_SUCCESS} from "../constants/actions";
import initialState from '../initialState';

export default function commentsReducer(state = initialState.comments, action) {
    switch (action.type) {
        case GET_COMMENTS_START:
            return {
                ...state,
                [action.payload.articleId]: {
                    comments: [],
                    isLoaded: false,
                    isLoading: true,
                }
            };
        case GET_COMMENTS_SUCCESS: {
            const {articleId, comments} = action.payload;
            return Object.assign({}, state, {
                [articleId]: {
                    comments,
                    isLoaded: true,
                    isLoading: false,
                }
            });
        }
        case GET_COMMENTS_ERROR:
            return {
                ...state,
                [action.payload.articleId]: {
                    comments: [],
                    isLoaded: false,
                    isLoading: false,
                }
            };
        case ADD_COMMENT_SUCCESS: {
            const {articleId, comment, response} = action.payload;

            const newComment = {
                ...comment,
                id: response.id
            };
            const articleComments = Object.assign({}, state[articleId], {
                comments: [newComment, ...state[articleId].comments]
            });

            return Object.assign({}, state, {
                [articleId]: articleComments
            });
        }
        default:
            return state;
    }
}