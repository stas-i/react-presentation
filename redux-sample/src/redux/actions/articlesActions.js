import {CallApi, baseUri} from '../../api/callApi';
import {
    GET_ARTICLES_START, GET_ARTICLES_ERROR, GET_ARTICLES_SUCCESS,
    UPDATE_RATING_START, UPDATE_RATING_SUCCESS, UPDATE_RATING_ERROR
} from "../constants/actions";

const requestArticles = () => ({type: GET_ARTICLES_START});
const receiveArticles = response => ({type: GET_ARTICLES_SUCCESS, response});
const requestArticlesFail = reason => ({type: GET_ARTICLES_ERROR, reason});

export const getArticles = () => dispatch => dispatch({
    promise: getArticlesList(),
    pending: requestArticles,
    success: receiveArticles,
    fail: requestArticlesFail
});

const updateRatingStart = (id, isIncrease) => () => ({type: UPDATE_RATING_START, payload: {id, isIncrease}});
const updateRatingSuccess = response => ({type: UPDATE_RATING_SUCCESS, response});
const updateRatingFail = reason => ({type: UPDATE_RATING_ERROR, reason});

export const updateArticleRating = (id, isIncrease) => dispatch => dispatch({
    promise: updateRating(id, isIncrease),
    pending: updateRatingStart(id, isIncrease),
    success: updateRatingSuccess,
    fail: updateRatingFail
});


const getArticlesList = () => {
    return CallApi(`${baseUri}/articles`);
};

// const getArticle = (id) => {
//     return CallApi(`${baseUri}/articles/${id}`);
// };

const updateRating = (id, isIncrease) => {
    return CallApi(`${baseUri}/articles/update-rating/${id}`, {
        method: 'put',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(isIncrease)
    });
};