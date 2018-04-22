export const GET_ARTICLES_START = 'GET_ARTICLES_START';
export const GET_ARTICLES_SUCCESS = 'GET_ARTICLES_SUCCESS';
export const GET_ARTICLES_ERROR = 'GET_ARTICLES_ERROR';

import CallApi from '../../api/callApi';

const requestDayparts = () => ({ type: GET_DAYPARTS_START });
const receiveDayparts = response => ({ type: GET_DAYPARTS_SUCCESS, response });
const requestDaypartsFail = reason => ({ type: GET_DAYPARTS_ERROR, reason });

export const getArticles = () => dispatch => dispatch({
    promise: CallApi(`${DAYPARTS_API_ROUTE}`, { method: 'GET' }),
    pending: requestDayparts,
    success: receiveDayparts,
    fail: requestDaypartsFail
});
