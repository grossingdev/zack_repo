/**
 * Created by baebae on 4/05/16.
 */

import {
  UPDATE_SIDEBAR_SHOW_STATUS,
} from '../../actions/UIActions';
import {Actions} from 'react-native-router-flux';
let defaultState = {
  sidebar: 0,
  pageIndex: 0
};

export default function uiReducer (state = defaultState, action) {
  switch (action.type) {

    case UPDATE_SIDEBAR_SHOW_STATUS:
      return Object.assign({}, state, {
        sidebar: action.status,
      });

    case Actions.AFTER_ROUTE:
    case Actions.AFTER_POP:
      let pageIndex = action.route.props.pageIndex;
      if (action.route.name == "tab2") {
        pageIndex = 4;
      }
      console.info("action.route.name" , action.route.name);
      return Object.assign({}, state, {
        pageIndex: pageIndex
      });
    default:
      return state;
  }
}