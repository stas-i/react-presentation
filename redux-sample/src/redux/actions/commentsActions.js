import {CallApi, baseUri} from '../../api/callApi';
import {
    GET_COMMENTS_START, GET_COMMENTS_ERROR, GET_COMMENTS_SUCCESS,
    ADD_COMMENT_START, ADD_COMMENT_SUCCESS, ADD_COMMENT_ERROR
} from "../constants/actions";

const requestComments = articleId => () => ({
    type: GET_COMMENTS_START,
    payload: {articleId}
});
const receiveComments = articleId => response => ({
    type: GET_COMMENTS_SUCCESS,
    payload: {comments: response, articleId}
});
const requestCommentsFail = articleId => reason => ({
    type: GET_COMMENTS_ERROR,
    reason,
    articleId
});

export const getArticleComments = articleId => (dispatch, getState) => {
    const state = getState();
    const {comments} = state;

    if (comments[articleId]) {
        return;
    }

    return dispatch({
        promise: getComments(articleId),
        pending: requestComments(articleId),
        success: receiveComments(articleId),
        fail: requestCommentsFail(articleId)
    })
};

const addCommentRequest = () => ({type: ADD_COMMENT_START});
const addCommentSuccess = (articleId, comment) => response => ({
    type: ADD_COMMENT_SUCCESS,
    payload: {
        response,
        articleId,
        comment
    }
});
const addCommentFail = reason => ({
    type: ADD_COMMENT_ERROR,
    reason
});

export const addComment = (articleId, comment) => dispatch => dispatch({
    promise: postComment(articleId, comment),
    pending: addCommentRequest,
    success: addCommentSuccess(articleId, comment),
    fail: addCommentFail
});

/// API
const getComments = (articleId) => {
    return CallApi(`${baseUri}/comments/${articleId}`)
};

const postComment = (articleId, comment) => {
    return CallApi(`${baseUri}/comments/${articleId}`, {
        body: JSON.stringify(comment),
        headers: {'content-type': 'application/json'},
        method: 'POST'
    });
};
