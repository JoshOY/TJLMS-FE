/**
 * Created by joshoy on 2017/3/23.
 */

import fetch from 'isomorphic-fetch';

const BASE_URL = '';

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
};

// GET请求的query对象转换为url中的params
const parseQueryParams = (queryParamsObj) => {
  let ret = '?';
  // eslint-disable-next-line
  for (const key of Object.keys(queryParamsObj)) {
    if (!(queryParamsObj[key] instanceof Array)) {
      ret += `${window.encodeURIComponent(key)}=${window.encodeURIComponent(queryParamsObj[key])}&`;
    } else {
      // eslint-disable-next-line
      for (const keyArrayElem of queryParamsObj[key]) {
        ret += `${window.encodeURIComponent(key)}=${window.encodeURIComponent(keyArrayElem)}&`;
      }
    }
  }
  return ret.slice(0, ret.length - 1);
};

export default class ApiUtil {
  static tokenGet(url, queryParams = {}) {
    return fetch(
      `${BASE_URL + url + parseQueryParams(queryParams)}`,
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          Accept: 'application/json;charset=utf-8',
          'Content-Type': 'application/json;charset=utf-8',
        },
      },
    )
      .then(
        resp => checkStatus(resp),
      )
      .then(
        resp => resp.json(),
      );
  }
  static tokenPost(url, bodyObj = {}) {
    return fetch(
      `${BASE_URL + url}`,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          Accept: 'application/json;charset=utf-8',
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(bodyObj),
      },
    )
      .then(
        resp => checkStatus(resp),
      )
      .then(
        resp => resp.json(),
      );
  }
  static tokenPut(url, bodyObj = {}) {
    return fetch(
      `${BASE_URL + url}`,
      {
        method: 'PUT',
        headers: {
          credentials: true,
          Accept: 'application/json;charset=utf-8',
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(bodyObj),
      },
    )
      .then(
        resp => checkStatus(resp),
      )
      .then(
        resp => resp.json(),
      );
  }
  static tokenDelete(url, bodyObj = {}) {
    return fetch(
      `${BASE_URL + url}`,
      {
        method: 'DELETE',
        headers: {
          credentials: true,
          Accept: 'application/json;charset=utf-8',
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(bodyObj),
      },
    )
      .then(
        resp => checkStatus(resp),
      )
      .then(
        resp => resp.json(),
      );
  }
}
