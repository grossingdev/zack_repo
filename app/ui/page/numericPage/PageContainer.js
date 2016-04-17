/**
 * Created by baebae on 4/5/16.
 */
import React, {
  Dimensions,
  StyleSheet,
  View,
  Component,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';

import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux/native';

import NavBar from '../../component/navbar/NavBar';
import NumericPage from './NumericPage';
import constant from '../../styles/constant';
import {updateShowSidebar} from '../../../actions/UIActions';

class PageContainer extends Component {

  state = {
    searchText: '',
  };

  updateTypeFilter(selectedFilter) {
    // Update the display
    this.setState({selectedFilter});
  }

  renderListingContainer() {
    return (
      <TestPage
        {...this.props}
      />
    );
  }
  onNextPress() {
    Actions.searchPage();
  }
  renderTopBar() {
    return (
      <View style={styles.topBar}>
        <TouchableOpacity
          style={[styles.iconContainer, {marginLeft: 10}]}
          onPress={()=>{this.props.dispatch(updateShowSidebar(2))}}
        >
          <Image style={styles.icon} source={require('image!icon_menu')} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.iconContainer, {alignItems: 'center', width: 50}]}
          onPress={()=>{this.onNextPress()}}
        >
          <Image style={styles.icon} source={require('image!icon_clipboard')} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.iconContainer, {alignItems: 'flex-end', marginRight: 10}]}>
          <Image style={styles.icon} source={require('image!icon_verification')} />
          <View style={styles.verificationTextContainer}>
            <Text style={styles.verificationText}>12</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  render() {

    return (
      <View style={styles.pageContainer}>
        {this.renderTopBar()}
        <NavBar
          leftImage={require('image!icon_back')}
          leftIconStyle={{
            width: 20,
            marginLeft: 3,
            flex: 1
          }}
          {...this.props}
        ></NavBar>

        <View style={styles.wrapper}>
          <NumericPage {...this.props} />
        </View>

        <View style={{backgroundColor: constant.colors.mainBackColor}}>
          <TouchableOpacity style={styles.nextButtonWrapper} onPress={() => {this.onNextPress()}}>
            <Text style={styles.txtNext}>Next</Text>
            <Image
              style={styles.iconNext}
              source={require('image!icon_next')} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: constant.colors.navBackColor,
    paddingTop:20
  },
  wrapper: {
    flex: 1,
    backgroundColor: '#797676',
  },
  topBar: {
    flexDirection: 'row',
    backgroundColor: 'black',
    height: 35,
  },
  nextButtonWrapper: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    backgroundColor: '#3ADB76',
    height: 61,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconNext: {
    marginLeft: 15,
    width: 32,
    height: 24
  },
  txtNext: {
    fontSize: 28,
    marginBottom: 3,
    color: 'white'
  },
  iconContainer: {
    justifyContent: 'center',
    flex:1,
    marginTop: 5
  },
  icon: {
    width: 33,
    height: 28,
  },
  verificationTextContainer: {
    position: 'absolute',
    backgroundColor: '#7ED321',
    width: 18,
    height: 18,
    borderRadius: 9,
    right: 2,
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  verificationText: {
    backgroundColor: 'transparent',
  }
});

import {createSelector} from 'reselect';
import {numeric$} from '../../../redux/selectors/NumericSelector';
export default connect(numeric$)(PageContainer);
