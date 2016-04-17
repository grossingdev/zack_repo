/**
 * Created by baebae on 4/6/16.
 */
import Api from '../utils/api';
// update contacts info
export const updateContact = (contacts) => {
  return (dispatch) => {
    dispatch(updateContact$(contacts));
  }
};

export const UPDATE_CONTACTS = 'UPDATE_CONTACTS';
const updateContact$ = (contacts) => ({
  type: UPDATE_CONTACTS,
  contacts
});

export const UPDATE_SEARCH_RESULT = "UPDATE_SEARCH_RESULT";
const updateSearchResult = (searchResult) => ({
  type: UPDATE_SEARCH_RESULT,
  searchResult
});

export const search = (keyword) => {
  return (dispatch) => {
    Api.search.users({keyword})
      .then((res) => {
        console.info('search result: ' + keyword, res.user);
        dispatch(updateSearchResult(res.user));
      })
  }
}