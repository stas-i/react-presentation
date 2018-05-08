import {Record, OrderedMap} from 'immutable';
import {createSelector} from 'reselect';
import {put, call, all, takeEvery} from 'redux-saga/effects';
import {appName} from "../config";
import {CallApi, baseUri} from '../api/callApi';
import {dataToEntities} from "./utils";

/**
 * Constants
 * */
export const moduleName = 'comments';
const prefix = `${appName}/${moduleName}`;
export const GET_COMMENTS = `${prefix}/GET_COMMENTS`;
export const GET_COMMENTS_START = `${prefix}/GET_COMMENTS_START`;
export const GET_COMMENTS_SUCCESS = `${prefix}/GET_COMMENTS_SUCCESS`;
export const GET_COMMENTS_ERROR = `${prefix}/GET_COMMENTS_ERROR`;

export const ADD_COMMENT = `${prefix}/ADD_COMMENT`;
export const ADD_COMMENT_START = `${prefix}/ADD_COMMENT_START`;
export const ADD_COMMENT_SUCCESS = `${prefix}/ADD_COMMENT_SUCCESS`;
export const ADD_COMMENT_ERROR = `${prefix}/ADD_COMMENT_ERROR`;

/**
 * Reducer
 * */
const ReducerState = Record({
    articlesComments: new OrderedMap({})
});

const ArticleComments = Record({
    id: null,
    comments: OrderedMap({}),
    isLoaded: false,
    isLoading: true,
});

const CommentRecord = Record({
    id: null,
    user: null,
    text: null
});

export default function reducer(state = new ReducerState(), action) {
    const {type} = action;

    switch (type) {
        case GET_COMMENTS_START: {
            const {articleId} = action.payload;
            return state.setIn(['articlesComments', articleId], new ArticleComments({id: articleId}));
        }
        case GET_COMMENTS_SUCCESS: {
            const {articleId, comments} = action.payload;
            return state
                .updateIn(['articlesComments', articleId], articleComments =>
                    articleComments
                        .set('isLoaded', true)
                        .set('isLoading', false)
                        .set('comments', dataToEntities(comments, CommentRecord))
                );
        }
        case GET_COMMENTS_ERROR: {
            const {articleId} = action.payload;
            return state
                .updateIn(['articlesComments', articleId], articleComments =>
                    articleComments
                        .set('isLoaded', false)
                        .set('isLoading', false)
                        .set('comments', OrderedMap({}))
                );
        }
        case ADD_COMMENT_SUCCESS: {
            const {articleId, comment, response} = action.payload;
            return state
                .updateIn(['articlesComments', articleId, 'comments'], comments =>
                    comments.set(response.id, new CommentRecord({id: response.id, ...comment}))
                );
        }
        default:
            return state
    }
}

/**
 * Selectors
 * */
export const stateSelector = state => state[moduleName];
export const articlesCommentsSelector = createSelector(
  stateSelector,
  state => state.articlesComments
);
export const articleIdSelector = (state, props) => props.articleId;

const commentsSelector = createSelector(
  articlesCommentsSelector,
  articleIdSelector,
  (articlesComments, articleId) => articlesComments.get(articleId, new ArticleComments())
);
export const isLoadingSelector = createSelector(
    commentsSelector,
    comments => comments.isLoading
);
export const isLoadedSelector = createSelector(
    commentsSelector,
    comments => comments.isLoaded
);
export const commentsListSelector = createSelector(
    commentsSelector,
    ac => ac.comments.valueSeq().toArray()
);

/**
 * Action Creators
 * */
export function getArticleComments(articleId) {
    return {
        type: GET_COMMENTS,
        payload: {articleId}
    }
}

export function addComment(articleId, comment) {
    return {
        type: ADD_COMMENT,
        payload: {articleId, comment}
    }
}

/**
 * Sagas
 */
export function* getArticleCommentsSaga(action) {
    const {articleId} = action.payload;
    yield put({type: GET_COMMENTS_START, payload: {articleId}});

    try {
        const response = yield call(CallApi, `${baseUri}/comments/${articleId}`);
        yield put({
            type: GET_COMMENTS_SUCCESS,
            payload: {articleId, comments: response}
        })
    }
    catch (error) {
        yield put({
            type: GET_COMMENTS_ERROR,
            payload: {articleId, reason: error.toString()}
        });
    }
}

export function* addCommentSaga(action) {
    const {articleId, comment} = action.payload;

    yield put({type: ADD_COMMENT_START, payload: {articleId, comment}});

    try {
        const response = yield call(CallApi,
            `${baseUri}/comments/${articleId}`, {
                body: JSON.stringify(comment),
                headers: {'content-type': 'application/json'},
                method: 'POST'
            });

        yield put({
            type: ADD_COMMENT_SUCCESS,
            payload: {
                response,
                articleId,
                comment
            }
        })
    }
    catch (error) {
        yield put({
            type: ADD_COMMENT_ERROR,
            payload: {
                reason: error.toString(),
                articleId,
                comment
            }
        });
    }
}

export const saga = function* () {
    yield all([
        takeEvery(GET_COMMENTS, getArticleCommentsSaga),
        takeEvery(ADD_COMMENT, addCommentSaga),
    ])
};