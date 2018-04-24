import {CHANGE_FILTER_TEXT, TOGGLE_FILTER_POPULAR_FLAG} from "../constants/actions";
import initialState from '../initialState';

export default function filterReducer(state = initialState.filter, action) {
    switch (action.type) {
        case TOGGLE_FILTER_POPULAR_FLAG:
            return Object.assign({}, state, {showOnlyPopular: !state.showOnlyPopular});
        case CHANGE_FILTER_TEXT:
            return {...state, filterText: action.payload};
        default:
            return state;
    }
}