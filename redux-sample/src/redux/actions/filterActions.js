import {CHANGE_FILTER_TEXT, TOGGLE_FILTER_POPULAR_FLAG} from "../constants/actions";

export const changeFilterText = text => ({type: CHANGE_FILTER_TEXT, payload: text});
export const toggleShowOnlyPopular = () => ({type: TOGGLE_FILTER_POPULAR_FLAG});



