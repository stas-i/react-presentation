import {Record, OrderedMap, List} from 'immutable';
import {createSelector} from 'reselect';
import {put, call, all, takeEvery} from 'redux-saga/effects';
import {appName} from "../config";
import {dataToEntities} from "./utils";
import {ADD_COMMENT_SUCCESS} from "../../../redux-sample/src/redux/constants/actions";
import {CallApi, baseUri} from '../api/callApi';

/**
 * Constants
 * */
export const moduleName = 'articles';
const prefix = `${appName}/${moduleName}`;
export const GET_ARTICLES = `${prefix}/GET_ARTICLES`;
export const GET_ARTICLES_START = `${prefix}/GET_ARTICLES_START`;
export const GET_ARTICLES_SUCCESS = `${prefix}/GET_ARTICLES_SUCCESS`;
export const GET_ARTICLES_ERROR = `${prefix}/GET_ARTICLES_ERROR`;

export const UPDATE_RATING = `${prefix}/UPDATE_RATING`;
export const UPDATE_RATING_START = `${prefix}/UPDATE_RATING_START`;
export const UPDATE_RATING_SUCCESS = `${prefix}/UPDATE_RATING_SUCCESS`;
export const UPDATE_RATING_ERROR = `${prefix}/UPDATE_RATING_ERROR`;

/**
 * Reducer
 * */
const ReducerState = Record({
    entities: new OrderedMap({})
});

class ArticleRecord extends Record({
    id: null,
    date: null,
    title: null,
    text: null,
    commentsIds: List([]),
    rating: 0
}) {
    constructor(article) {
        super();
        this.commentsIds = article.commentsIds ? List(article.commentsIds) : List([]);
    }
}

export default function reducer(state = new ReducerState(), action) {
    const {type} = action;

    switch (type) {
        case GET_ARTICLES_SUCCESS:
            return state.set('entities', dataToEntities(action.response, ArticleRecord));

        case UPDATE_RATING_START: {
            const {id, isIncrease} = action.payload;
            const article = state.get(id);
            const newRating = article.rating + (isIncrease ? 1 : -1);
            return state.setIn(['entities', id, 'rating'], newRating)
        }
        case ADD_COMMENT_SUCCESS: {
            const {articleId, response} = action.payload;
            return state.updateIn(['entities', articleId, 'commentsIds'], commentsIds => commentsIds.push(response.id));
        }
        default:
            return state
    }
}

/**
 * Selectors
 * */
export const stateSelector = state => state[moduleName];
export const articlesSelector = createSelector(stateSelector, state => state.entities);

/*
export const selectedEventsIds = createSelector(stateSelector, state => state.selected.toArray())
export const loadingSelector = createSelector(stateSelector, state => state.loading)
export const loadedSelector = createSelector(stateSelector, state => state.loaded)
export const eventListSelector = createSelector(entitiesSelector, entities => entities.valueSeq().toArray())
export const selectedEventsList = createSelector(entitiesSelector, selectedEventsIds,
    (entities, ids) => ids.map(id => entities.get(id))
)
export const idSelector = (state, props) => props.uid
export const eventSelector = createSelector(entitiesSelector, idSelector, (entities, id) => entities.get(id))
*/
/**
 * Action Creators
 * */
export function getArticles() {
    return {
        type: GET_ARTICLES
    }
}

export function updateArticleRating(id, isIncrease) {
    return {
        type: UPDATE_RATING,
        payload: {id, isIncrease}
    }
}

/**
 * Sagas
 */
export function* getArticlesSaga() {
    yield put({type: GET_ARTICLES_START});

    try {
        const response = yield call(CallApi, `${baseUri}/articles`);
        yield put({type: GET_ARTICLES_SUCCESS, response})
    }
    catch (error) {
        yield put({type: GET_ARTICLES_ERROR, reason: error.toString()});
    }
}

export function* updateRatingSaga(action) {
    const {id, isIncrease} = action.payload;

    yield put({type: UPDATE_RATING_START, payload: {id, isIncrease}});

    try {
        const response = yield call(CallApi,
            `${baseUri}/articles/update-rating/${id}`,
            {
                method: 'put',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify(isIncrease)
            });

        yield put({type: UPDATE_RATING_SUCCESS, response})
    }
    catch (error) {
        yield put({type: UPDATE_RATING_ERROR, reason: error.toString()});
    }
}

export const saga = function* () {
    yield all([
        takeEvery(GET_ARTICLES, getArticlesSaga),
        takeEvery(UPDATE_RATING, updateRatingSaga),
    ])
};