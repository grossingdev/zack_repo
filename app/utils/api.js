/**
 * Created by baebae on 4/5/16.
 */

import request from 'superagent';
import LocalStorage from './localStorage';
import _ from 'lodash';

let base = 'https://ancient-mountain-80917.herokuapp.com/api';
export default {
  search: {
    users: _generateRequest({
      token: false,
      method: 'GET',
      route: '/search/user/:keyword'
    })
  }
};

function _generateRequest(options) {
  return options.token ? (
    _requestWithToken.bind(this, options.method, options.route)
  ) : (
    _publicRequest.bind(this, options.method, options.route)
  );
}

function _requestWithToken(method, route, params, body, customToken) {

  if(!body) body = {};
  if(params) route = _parameterizeRoute(route, params);
  return new Promise((resolve, reject) => {
    LocalStorage.get('token')
      .then((token) => {
        request(method, base + route)
          .set('Authorization', customToken || token)
          .accept('json')
          .send(body)
          .end((err, res) => {
            //console.info(res)
            if (!res) { res = {} }
            if(err) {
              console.warn(err, res);
              if (res.body) AlertIOS.alert('API Error', res.body.errors.join('\n'));
              reject(res.body);
            } else {
              resolve(res.body.data);
            }
          });
      });
  });

}

function _parameterizeRoute(route, params) {
  let parameterized = route;
  _.forEach(params, (v, k) => {
    if (typeof v === 'undefined') log_console(`warning: parameter ${k} was ${v}`);
    parameterized = parameterized.replace(':' + k, v);
  });
  return parameterized;
}

function _publicRequest(method, route, params, body) {

  if(!body) body = {};
  if(params) route = _parameterizeRoute(route, params);
  return new Promise((resolve, reject) => {

    request(method, base + route)
      .accept('json')
      .send(body)
      .end((err, res) => {
        if (!res) { res = {} }
        if (err) {
          console.warn(err);
          reject(res.body);
        } else {
          resolve(res.body);
        }
      });
  });
}

export function _externalRequest(method, route) {

  return new Promise((resolve, reject) => {
    request(method, route)
      .accept('json')
      .end((err, res) => {
        if (!res) {
          res = {}
        }
        if (err) {
        } else {
          resolve(res.body);
        }
      });
  });
}