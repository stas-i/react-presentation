import {Record} from 'immutable';
import {createSelector} from 'reselect';
import {appName} from "../config";

/**
 * Constants
 * */
export const moduleName = 'filter';
const prefix = `${appName}/${moduleName}`;
export const CHANGE_FILTER_TEXT = `${prefix}/CHANGE_FILTER_TEXT`;
export const TOGGLE_FILTER_POPULAR_FLAG = `${prefix}/TOGGLE_FILTER_POPULAR_FLAG`;

/**
 * Reducer
 * */
const ReducerState = Record({
    filterText: '',
    showOnlyPopular: false
});

export default function reducer(state = new ReducerState(), action) {
    const {type} = action;

    switch (type) {
        case TOGGLE_FILTER_POPULAR_FLAG:
            return state.update('showOnlyPopular', current => !current);
        case CHANGE_FILTER_TEXT:
            return state.set('filterText', action.payload);
        default:
            return state
    }
}

/**
 * Selectors
 * */
export const stateSelector = state => state[moduleName];
export const filterTextSelector = createSelector(stateSelector, state => state.filterText);
export const showOnlyPopularSelector = createSelector(stateSelector, state => state.showOnlyPopular);

/**
 * Action Creators
 * */
export const changeFilterText = text => ({type: CHANGE_FILTER_TEXT, payload: text});
export const toggleShowOnlyPopular = () => ({type: TOGGLE_FILTER_POPULAR_FLAG});