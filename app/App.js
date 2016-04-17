/**
 * Created by baebae on 3/24/16.
 */
import React, {AppRegistry, Component, NativeModules, View, Navigator, Text, StatusBar, InteractionManager, Platform} from 'react-native';

var RNRF = require('react-native-router-flux');
var {Route, Schema, Animations, Actions, TabBar} = RNRF;

import Drawer from 'react-native-drawer';
import {connect} from 'react-redux/native';

import SideDrawer from './ui/component/sidebar/Sidebar';
import SidebarContent from './ui/component/sidebar/SidebarContent';

import SearchPageContainer from './ui/page/SearchPageContainer';
import NumericPageContainer from './ui/page/numericPage/PageContainer';

const Router = connect()(RNRF.Router);

import CurrencyUtils from './utils/currency';
import ContactUtils from './utils/contact';
class App extends Component {
  currencyUtils = null;

  componentWillMount() {
    if (this.currencyUtils == null) {
      this.currencyUtils = new CurrencyUtils();
      this.currencyUtils.initialize();

      new ContactUtils().getContacts(this.props.dispatch);
    }
  }
  constructor() {
    super();
  }

  componentDidMount() {
    if (Platform.OS === 'ios') {
      setTimeout(() => StatusBar.setBarStyle('light-content'));
    }
  }

  renderContent() {
    return (
      <Router hideNavBar={true} name="root">
        <Schema name="modal" sceneConfig={{...Navigator.SceneConfigs.FloatFromBottom, gestures: null}}/>
        <Schema name="default" sceneConfig={{...Navigator.SceneConfigs.FloatFromRight, gestures: null}}/>
        <Route name="testPageContainer" schema="modal" navigationBarStyle={{backgroundColor: 'transparent'}} hideNavBar={true} pageIndex={0}>
          <SideDrawer menu={<SidebarContent  />}>
            <Router name="testPageRouter">
              <Route name="numericPage" component={NumericPageContainer} title="Test Page" hideNavBar={true} pageIndex={0} currencyUtils={this.currencyUtils}/>
              <Route name="searchPage" component={SearchPageContainer} title="Test Page" hideNavBar={true} pageIndex={1} currencyUtils={this.currencyUtils}/>
            </Router>
          </SideDrawer>
        </Route>
      </Router>
    );
  }

  render() {
    return (
      <View style={{flex: 1}}>
        {this.renderContent()}
      </View>
    );
  }
}


export default connect()(App);