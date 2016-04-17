/**
 * Created by baebae on 4/5/16.
 */

import {
  UPDATE_NUMERIC_TYPE,
  UPDATE_NUMERIC_VALUE,
  UPDATE_CURRENCY_TYPE
} from '../../actions/NumericActions';
import {Actions} from 'react-native-router-flux';
let defaultState = {
  type: 'Stake',
  value: 0,
  currencyType: '$'
};

export default function numericReducer (state = defaultState, action) {
  switch (action.type) {

    case UPDATE_NUMERIC_TYPE:
      return Object.assign({}, state, {
        type: action.value,
      });

    case UPDATE_NUMERIC_VALUE:
      return Object.assign({}, state, {
        value: action.value,
      });

    case UPDATE_CURRENCY_TYPE:
      return Object.assign({}, state, {
        currencyType: action.value,
      });
    default:
      return state;
  }
}