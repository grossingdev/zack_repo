/**
 * Created by baebae on 4/5/16.
 */
import {log_console} from '../utils/log';

// update numeric type
export const updateNumericType = (value) => {
  return (dispatch) => {
    dispatch(updateNumericType$(value));
  }
};

export const UPDATE_NUMERIC_TYPE = 'UPDATE_NUMERIC_TYPE';
const updateNumericType$ = (value) => ({
  type: UPDATE_NUMERIC_TYPE,
  value
});

// update numeric value
export const updateNumericValue = (value) => {
  return (dispatch) => {
    dispatch(updateNumericValue$(value));
  }
};

export const UPDATE_NUMERIC_VALUE = 'UPDATE_NUMERIC_VALUE';
const updateNumericValue$ = (value) => ({
  type: UPDATE_NUMERIC_VALUE,
  value
});

// update currency type
export const updateCurrencyType = (value) => {
  return (dispatch) => {
    dispatch(updateCurrencyType$(value));
  }
};

export const UPDATE_CURRENCY_TYPE = 'UPDATE_CURRENCY_TYPE';
const updateCurrencyType$ = (value) => ({
  type: UPDATE_CURRENCY_TYPE,
  value
});