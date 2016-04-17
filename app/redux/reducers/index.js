/**
 * Created by baebae on 3/24/16.
 */
import {combineReducers} from 'redux';
import ui_status from './UIReducer';
import numericValue from './NumericReducer';
import contacts from './ContactReducer';

export default combineReducers({
  ui_status,
  numericValue,
  contacts
});