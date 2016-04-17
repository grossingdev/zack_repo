/**
 * Created by baebae on 4/6/16.
 */

import {
  UPDATE_CONTACTS,
  UPDATE_SEARCH_RESULT
} from '../../actions/ContactActions';
let defaultState = {
  contacts: [],
  searchResult:[]
};

export default function contactReducer (state = defaultState, action) {
  switch (action.type) {

    case UPDATE_CONTACTS:
      return Object.assign({}, state, {
        contacts: action.contacts,
      });
    case UPDATE_SEARCH_RESULT:
      return Object.assign({}, state, {
        searchResult: action.searchResult,
      });
      break;
    default:
      return state;
  }
}