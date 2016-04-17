/**
 * Created by baebae on 4/5/16.
 */
'use strict';
import React, {
  Dimensions,
  StyleSheet,
  View,
  Component,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity
} from 'react-native';

import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux/native';

import SwitchButton from '../component/common/SwitchButton';
import SearchPage from './SearchPage';
import NavBar from '../component/navbar/NavBar';

import constant from '../styles/constant';
import {search} from '../../actions/ContactActions';
import {updateShowSidebar} from '../../actions/UIActions';

class SearchPageContainer extends Component {

  state = {
    searchText: '',
    flagShowContact: false
  };

  renderListingContainer() {
    return (
      <SearchPage
        keyword={this.state.searchText}
        flagShowContact={this.state.flagShowContact}
        {...this.props}
      />
    );
  }
  onPressBack() {
    Actions.pop();
  }

  render() {
    return (
      <View style={styles.pageContainer}>
        <NavBar
          leftImage={require('image!icon_back')}
          leftIconStyle={{
            width: 20,
            marginLeft: 3,
            flex: 1
          }}
          onLeftPress={()=>{this.onPressBack()}}
          {...this.props}
        ></NavBar>
        <View style={styles.wrapper}>

          <View style={styles.topSearchBarArea}>
            <View style={styles.searchBarWrapper}>
              <Image
                style={styles.iconSearch}
                source={require('image!icon_search')} />
              <TextInput
                style={styles.input}
                placeholder="search for player..."
                ref="input"
                clearButtonMode="never"
                returnKeyType="search"
                onChangeText={(text) => {this.props.dispatch(search(text))}}
                onSubmitEditing={() => {}
                }
              />
            </View>
            <TouchableOpacity onPress={()=>{this.setState({flagShowContact: true})}}>
              <Image
                style={styles.iconAdd}
                source={require('image!icon_add')} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.listContainer} automaticallyAdjustContentInsets={false}>
            {this.renderListingContainer()}
          </ScrollView>
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
    backgroundColor: constant.colors.mainBackColor
  },
  listContainer: {
    flex: 1,
    marginBottom: 5
  },
  topSearchBarArea: {
    margin: 20,
    height: 66/2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  searchBarWrapper: {
    flex: 1,
    height: 40,
    marginRight: 20,
    borderRadius: 3,
    borderWidth: 1/2,
    borderColor: constant.colors.grey,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: constant.colors.white
  },
  input: {
    flex: 1,
    marginLeft: 20,
    textAlignVertical: 'center',
    marginBottom: -5
  },
  iconSearch: {
    width: 25,
    height: 25,
    left: 10
  },
  iconAdd: {
    width: 50,
    height: 50,
  }
});

import {createSelector} from 'reselect';
import {numeric$} from '../../redux/selectors/NumericSelector';
export default connect(numeric$)(SearchPageContainer);