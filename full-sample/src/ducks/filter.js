import {Record, OrderedMap, List} from 'immutable';
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
export const changeFilterText = text => ({type: CHANGE_FILTER_TEXT, payload: text});
export const toggleShowOnlyPopular = () => ({type: TOGGLE_FILTER_POPULAR_FLAG});