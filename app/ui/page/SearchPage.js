/**
 * Created by baebae on 4/5/16.
 */
'use strict';
import React, {
  Component,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  ListView,
} from 'react-native';
import _ from 'lodash';
import {Actions} from 'react-native-router-flux';

import constant from '../styles/constant';
const colorSelected = "#77CCA4";

class SearchPage extends Component {
  state = {
    selectedIndex: 0,
    dataSource: new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    }),
  };

  searchContact() {
    let ret = [];
    _.forEach(this.props.contacts, (contactInfo) => {
      let name = this.getName(contactInfo).toLowerCase();
      let {keyword} = this.props;
      if (keyword.length == 0 || name.indexOf(keyword.toLowerCase()) != -1) {
        ret.push(contactInfo);
      }
    });
    return ret;
  }
  renderSearchResultListView() {
    let contact = this.searchContact();
    let dataSource = this.state.dataSource.cloneWithRows(contact);

    let dataSource1 = this.state.dataSource.cloneWithRows(this.props.searchResult);
    if (this.props.flagShowContact) {
      return (
        <ListView
          style={styles.listview}
          dataSource={dataSource}
          renderRow={(item, sectionID, rowID)=>this.renderContactRow(item, sectionID, rowID)}
        />
      )
    } else {
      return (
        <ListView
          style={styles.listview}
          dataSource={dataSource1}
          renderRow={(item, sectionID, rowID)=>this.renderSearchResultRow(item, sectionID, rowID)}
        />
      )
    }
  }
  renderListView() {
    return (
      <View style={styles.container}>
        {this.renderSearchResultListView()}
      </View>
    );
  }

  onSelectRow(selectedIndex) {
    this.setState({selectedIndex});
  }

  getName(contactItem) {
    let ret = "";
    if (contactItem.familyName) {
      ret = contactItem.familyName;
    }
    if (contactItem.middleName) {
      ret = ret + " " + contactItem.middleName;
    }
    if (contactItem.givenName) {
      ret = ret + " " + contactItem.givenName;
    }

    return ret;
  }
  renderValue(index, value) {
    if (value && value.length > 0) {
      return (
        <Text key={index} style={styles.itemName}>{value}</Text>
      );
    }
  }
  renderContactPhoneNumber(contactItem) {
    let index = 0;
    return _.map(contactItem.phoneNumbers, (phoneInfo) => {
      let txtInfo = phoneInfo.label + " " + phoneInfo.number;
      index ++;
      return this.renderValue(index, txtInfo);
    });
  }

  renderContactMail(contactItem) {
    let index = 0;
    return _.map(contactItem.emailAddresses, (emailInfo) => {
      index ++;
      let txtInfo = emailInfo.label + " " + emailInfo.email;
      return this.renderValue(index, txtInfo);
    });
  }

  renderContactRow(item, sectionID, rowID) {
    let name = this.getName(item);
    let rowStyle = styles.itemBlock;
    if (rowID == this.state.selectedIndex) {
      rowStyle = [styles.itemBlock, {backgroundColor: colorSelected}];
    }
    return (
      <TouchableHighlight
        style={rowStyle}
        underlayColor={colorSelected}
        onPress={()=>{this.onSelectRow(rowID)}}
      >
        <View style={styles.contactInfoContainer}>
          <Text style={styles.itemName}>{name}</Text>
          {this.renderContactPhoneNumber(item)}
          {this.renderContactMail(item)}
        </View>

      </TouchableHighlight>
    );
  }

  renderSearchPhoneNumbers(item) {
    let index = 0;
    return _.map(item.secondary_numbers, (number) => {
      index ++;
      return this.renderValue(index, number);
    });
  }

  renderSearchMails(item) {
    let index = 0;
    return _.map(item.secondary_emails, (email) => {
      index ++;
      return this.renderValue(index, email);
    });
  }

  renderSearchResultRow(item, sectionID, rowID) {
    console.info("render", item);
    let name = item.username;
    let rowStyle = styles.itemBlock;
    if (rowID == this.state.selectedIndex) {
      rowStyle = [styles.itemBlock, {backgroundColor: colorSelected}];
    }
    return (
      <TouchableHighlight
        style={rowStyle}
        underlayColor={colorSelected}
        onPress={()=>{this.onSelectRow(rowID)}}
      >
        <View style={styles.contactInfoContainer}>
          <Text style={styles.itemName}>{name}</Text>
          {this.renderValue(0, item.number)}
          {this.renderValue(1, item.email)}
          {this.renderSearchPhoneNumbers(item)}
          {this.renderSearchMails(item)}
        </View>

      </TouchableHighlight>
    );
  }
  render() {
    return this.renderListView();
  }
}

let styles = StyleSheet.create({
  container: {
    flexDirection:'column',
    flex:1,
  },
  listview:{
    flex:1
  },
  sep: {
    backgroundColor: '#DDDDDD',
    height: 1,
    marginLeft:10,
    marginRight: 10
  },
  contactInfoContainer: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemBlock:{
    flex:1,
    margin: 10,
    marginVertical: 5,
    padding: 4,
    backgroundColor: '#D8D8D8',
    borderColor: '#979797',
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemName:{
    fontSize: 15,
    color:constant.colors.fontColor1,
  },
});

import {connect} from 'react-redux/native';
import {contact$} from '../../redux/selectors/ContactSelector';
export default connect(contact$)(SearchPage);
