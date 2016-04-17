/**
 * Created by baebae on 4/5/16.
 */
import {log_console} from '../utils/log';

// show/hide sidebar on navigation
export const updateShowSidebar = (value) => {
  return (dispatch) => {
    dispatch(updateSidebarStatus(value));
  }
};

export const UPDATE_SIDEBAR_SHOW_STATUS = 'UPDATE_SIDEBAR_SHOW_STATUS';
const updateSidebarStatus = (status) => ({
  type: UPDATE_SIDEBAR_SHOW_STATUS,
  status
});
