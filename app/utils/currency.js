/**
 * Created by baebae on 4/5/16.
 */

import {_externalRequest} from './api';
var fx = require("money");

export default class CurrencyUtils {

  flagInitialized = false;

  initialize() {
    let component = this;
    if (!this.flagInitialized) {
      _externalRequest('get', 'https://openexchangerates.org/api/latest.json?app_id=f7b71ca45910443da521e299c2f08433').then(
        (res)=> {
          fx.rates = res.rates;
          component.flagInitialized = true;
        }
      );
    }
  }
  getCurrencyName(type) {
    if (type == '$') {
      return "USD";
    } else if (type == '€') {
      return "EUR";
    } else if (type == '¥') {
      return "CNY"
    } else if (type == '£' || type == '₤') {
      return "GBP";
    }
    return '';
  }
  convertCurrency(value, fromType, toType) {
    if (this.flagInitialized) {
      let from = this.getCurrencyName(fromType);
      let to = this.getCurrencyName(toType);
      if (from != '' && to != '') {
        let convertParam = {
          from: from,
          to: to
        }
        return fx.convert(value, convertParam);
      }
      return 0;

    } else {
      this.initialize();
    }
  }
}