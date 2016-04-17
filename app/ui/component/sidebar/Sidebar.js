/**
 * Created by baebae on 4/5/16.
 */

import React, {AppRegistry, Component, NativeModules, View, Navigator, Text, InteractionManager} from 'react-native';
import SideMenu from 'react-native-side-menu';
import {connect} from 'react-redux/native';

import {sidebarStatus$} from '../../../redux/selectors/UISelector';
import {updateShowSidebar} from '../../../actions/UIActions';
class SideDrawer extends React.Component {
  flagOpen = false;
  componentDidUpdate() {
    if (this.props.sidebarStatus == 1 || this.props.sidebarStatus == 2) {
      if (this.props.sidebarStatus == 1) {
        this.flagOpen = false;
      } else {
        this.flagOpen = !this.flagOpen ;
      }
      let component = this;
      InteractionManager.runAfterInteractions(() => {
        component.props.dispatch(updateShowSidebar(0));
      });
    }
  }

  render() {
    return (
      <SideMenu
        isOpen={this.flagOpen}
        menu={this.props.menu}
        {...this.props}
      >
        {React.Children.map(this.props.children, c => React.cloneElement(c, {
          route: this.props.route
        }))}
      </SideMenu>
    )
  }
}

export default connect(sidebarStatus$)(SideDrawer);