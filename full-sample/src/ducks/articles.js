import {Record, OrderedMap, List} from 'immutable';
import {createSelector, defaultMemoize, createSelectorCreator} from 'reselect';
import {put, call, all, takeEvery} from 'redux-saga/effects';
import {appName} from "../config";
import {dataToEntities} from "./utils";
import {filterTextSelector, showOnlyPopularSelector} from './filter'
import {CallApi, baseUri} from '../api/callApi';
import {ADD_COMMENT_SUCCESS} from "./comments";

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
        article.commentsIds = article.commentsIds ? List(article.commentsIds) : List([]);
        super(article);
    }
}

export default function reducer(state = new ReducerState(), action) {
    const {type} = action;

    switch (type) {
        case GET_ARTICLES_SUCCESS:
            return state.set('entities', dataToEntities(action.response, ArticleRecord));

        case UPDATE_RATING_START: {
            const {id, isIncrease} = action.payload;
            return state.updateIn(['entities', id, 'rating'], rating => rating + (isIncrease ? 1 : -1))
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
const stateSelector = state => state[moduleName];
const idSelector = (state, props) => props.articleId;
const articlesSelector = createSelector(stateSelector, state => state.entities);
const filteredArticlesIdSelector = createSelector(
    articlesSelector,
    filterTextSelector,
    showOnlyPopularSelector,
    (articles, filterText, showPopular) => {
        let result = articles;
        if(filterText.length > 0){
            result = result.filter(x => x.title.includes(filterText));
        }
        if(showPopular && result.find(x => x.rating <= 0)){
            result = result.filter(x => x.rating > 0);
        }

        return result.map(x => x.id).toArray();
    }
);
const isEqual = (array1, array2) => array1.length === array2.length && array1.every((v,i)=> v === array2[i]);

const createDeepEqualSelector = createSelectorCreator(
    defaultMemoize,
    isEqual
);

const articlesIdsDeepEqualSelector = createDeepEqualSelector(
    filteredArticlesIdSelector,
    ids => ids
);

export const filteredItemsSelector = createSelector(
    articlesIdsDeepEqualSelector,
    articlesSelector,
    (articlesIds, articles) => articlesIds.map(id => articles.get(id))
);
export const createArticleSelector = () => createSelector(articlesSelector, idSelector, (entities, id) => entities.get(id));

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