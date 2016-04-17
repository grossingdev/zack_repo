/**
 * Created by baebae on 4/5/16.
 */
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
  TouchableOpacity,
  ListView,
} from 'react-native';

import {connect} from 'react-redux/native';
import {Actions} from 'react-native-router-flux';
import constant from '../../styles/constant';
import _ from 'lodash';

import {updateNumericType, updateNumericValue, updateCurrencyType} from '../../../actions/NumericActions';
const labelButtons = [
  ['£ ¥ ₤\n ₣ ₰', '$', '€', '%'],
  ['7', '8', '9', 'Swap'],
  ['4', '5', '6', 'Stake'],
  ['1', '2', '3', 'Transfer'],
  ['0', '.', 'A/C'],
]
class NumericPage extends Component {
  flagInputNumeric = true;
  flagDecimal = false;
  decimalSize = 0;
  state = {
  };

  updateNumericValue(newValue) {
    if (this.flagInputNumeric) {
      let value = this.props.numericValue;
      if (!this.flagDecimal) {
        value = value * 10 + parseInt(newValue);
      } else {
        value = (parseFloat(value) + newValue / (Math.pow(10, this.decimalSize))).toFixed(5);
        this.decimalSize ++ ;
      }
      this.props.dispatch(updateNumericValue(Number(value)));
    }

  }
  convertCurrency(newCurrencyType) {
    this.flagInputNumeric = false;
    let oldCurrencyType = this.props.numericCurrencyType;
    if (oldCurrencyType != newCurrencyType) {
      let value = this.props.currencyUtils.convertCurrency(this.props.numericValue, oldCurrencyType, newCurrencyType);
      if (value != 0) {
        this.props.dispatch(updateCurrencyType(newCurrencyType));
        this.props.dispatch(updateNumericValue(Number(value.toFixed(5))));
      } else {
        this.props.dispatch(updateCurrencyType(newCurrencyType));
      }
    }
  }

  clearNumericPanel() {
    this.flagDecimal = false;
    this.props.dispatch(updateNumericValue(0));
    this.flagInputNumeric = true;
  }

  onButtonPressed(rowIndex, colIndex) {
    if (rowIndex == 0) {
      //update numeric currency type
      let newCurrencyType = labelButtons[rowIndex][colIndex];
      let oldCurrencyType = this.props.numericCurrencyType;

      if (colIndex == 0) {
        if (oldCurrencyType == '$' || oldCurrencyType == '€') {
          newCurrencyType = '£';
        } else if (oldCurrencyType == '£') {
          newCurrencyType = '¥';
        } else if (oldCurrencyType == '¥') {
          newCurrencyType = '₤'
        } else if (oldCurrencyType == '₤') {
          newCurrencyType = '₣';
        } else if (oldCurrencyType == '₣') {
          newCurrencyType = '₰';
        } else if (oldCurrencyType == '₰') {
          newCurrencyType = '£';
        }
      }
      this.convertCurrency(newCurrencyType)
    }

    if (rowIndex > 0 && rowIndex < 4) {
      //update numeric type 'swap, stake, loan'
      if (colIndex == 3) {
        this.props.dispatch(updateNumericType(labelButtons[rowIndex][colIndex]));
      } else {
        //tap number from '1 ~ 9'
        this.updateNumericValue(labelButtons[rowIndex][colIndex]);
      }
    }

    if (rowIndex == 4) {
      if (colIndex == 0) {
        //tap number value '0'
        this.updateNumericValue(labelButtons[rowIndex][colIndex]);
      } else if (colIndex == 1) {
        //tap '.'
        if (this.flagDecimal == false) {
          this.flagDecimal = true;
          this.decimalSize = 1;
        }
      } else if (colIndex == 2) {
        //tap 'clear'
        this.clearNumericPanel();
      }
    }

    if (rowIndex == 5) {
      if (colIndex == 1) {
        //tap 'A/C'
        this.clearNumericPanel();
      }
    }
  }
  renderColumnSection(rowIndex) {
    let size = labelButtons[rowIndex].length;
    return _.map(_.range(size), (colIndex) => {
      let style = {
        flex:1,
        borderRightWidth: 1,
        borderColor: '#797676'
      };
      if (rowIndex == 0) {
        style.backgroundColor = '#5C5B5A';
        style.flex = 1;
      } else {
        style.backgroundColor ='#CACBCF';
      }
      if (colIndex == size - 1) {
        style.backgroundColor = '#959595';
        style.flex = 1.4;
      }
      if (rowIndex == 4) {
        if (colIndex == 0) {
          style.flex = 2;
          style.paddingLeft = 1;
        }
      }
      return (
        <TouchableOpacity
          key={colIndex}
          style={[style, {alignItems: 'center', justifyContent: 'center',}]}
          onPress={()=>{this.onButtonPressed(rowIndex, colIndex)}}
        >
          <Text style={styles.numericButton}>
            {labelButtons[rowIndex][colIndex]}
          </Text>
        </TouchableOpacity>
      )
    });
  }
  renderRowSection(rowIndex) {
    let style = {
      flexDirection:'row',
      flex: 1,
      borderTopWidth: 1,
      borderColor: '#797676',
    };

    if (rowIndex == 0) {
      style.borderTopWidth = 0;
    }
    return (
      <View style={style} key={rowIndex}>
        {this.renderColumnSection(rowIndex)}
      </View>
    )
  }
  renderNumericView() {
    let size = labelButtons.length;
    return _.map(_.range(size), (rowIndex) => {
      return this.renderRowSection(rowIndex)
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderNumericView()}
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flexDirection:'column',
    flex:1,
    margin: 1/2,
  },
  numericButton: {
    color: 'white',
    fontSize: 25
  }
});
export default connect()(NumericPage);
