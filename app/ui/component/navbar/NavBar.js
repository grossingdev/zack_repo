/**
 * Created by baebae on 4/5/16.
 */

'use strict';
import React, {Component, View, Dimensions, Text, Image, TouchableOpacity, StyleSheet, TextInput} from 'react-native';
import constant from '../../styles/constant';
import {Icon} from 'react-native-icons';
const deviceScreen = Dimensions.get('window');
class NavBar extends Component {

  renderLeftIcon(pageIndex) {
    let {leftImage, leftIconStyle} = this.props;
    if (leftImage) {
      return (
        <View style={styles.leftContainer}>
          <Image style={leftIconStyle} source={leftImage} resizeMode={Image.resizeMode.contain}/>
        </View>
      );
    }
  }

  renderRightIcon(pageIndex) {
    let {rightImage, rightIconStyle} = this.props;
    if (rightImage) {
      return (
        <View style={styles.rightContainer}>
          <Image style={rightIconStyle} source={rightImage} resizeMode={Image.resizeMode.contain}/>
        </View>
      );
    }
  }

  renderLeft(pageIndex) {
    return (
      <TouchableOpacity
        style={[styles.navButton]}
        onPress={()=>{this.props.onLeftPress && this.props.onLeftPress()}}
      >
        {this.renderLeftIcon(pageIndex)}
      </TouchableOpacity>
    );
  }
  formatNumber(num){
    let n = num.toString(), p = n.indexOf('.');
    return n.replace(/\d(?=(?:\d{3})+(?:\.|$))/g, function($0, i){
      return p < 0 || i < p ? ($0+',') : $0;
    });
  }
  renderCenter(pageIndex) {
    let value = this.formatNumber(this.props.numericValue);
    return (
      <View style={styles.titleWrapper}>
        <Text style={styles.navTitle}>{this.props.numericCurrencyType + "" + value}</Text>
      </View>

    )
  }

  renderRight(pageIndex) {
    return (
      <TouchableOpacity
        underlayColor="transparent"
        style={[styles.navButton, {paddingRight: 10, alignItems: 'flex-end' }]}
        onPress={()=>{this.props.onRightPress && this.props.onRightPress()}}
      >
        {this.renderRightIcon(pageIndex)}
      </TouchableOpacity>
    )
  }

  render() {
    let {pageIndex} = this.props;
    return (
      <View style={{justifyContent: 'center', alignItems: 'center',}}>
        <View style={styles.navButtonContainer}>
          {this.renderLeft(pageIndex)}
          {this.renderCenter(pageIndex)}
          {this.renderRight(pageIndex)}
        </View>
        <Text style={styles.navText}>{this.props.numericType}</Text>
      </View>

    );
  }
}

let styles = StyleSheet.create({
  navButtonContainer: {
    width: deviceScreen.width,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    marginTop: 3,
    height: 65
  },
  navButton: {
    flex: 1
  },
  leftContainer: {
    justifyContent: 'center',
    flex:1,
  },
  rightContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex:1
  },
  centerContainer: {
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
    //textAlign:'center',
    flex:0.5,
  },
  titleWrapper: {
    width: deviceScreen.width * 0.6,
    height: 66/2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navTitle: {
    backgroundColor: 'transparent',
    color: constant.colors.navFontColor1,
    fontSize: 32,
  },
  navText: {
    color: constant.colors.navFontColor1,
    backgroundColor: 'transparent',
    fontSize: 20,
    marginBottom: 10
  },
});

import {connect} from '../../../../node_modules/react-redux/native';
export default connect()(NavBar);