import axios from "axios";
import * as R from "ramda";

import { oneInspectTrue } from "helpers/tools";
import { store } from "store/index";

import * as authActions from 'store/auth/actions'
import * as authSelectors from 'store/auth/selectors'

import { storage } from "./storage";

const apiUrl = process.env.REACT_APP_API_URL;

const basic = (url, method, data, params) => {
  const accessTokenStorage = storage("accessToken");

  const headers = {};
  const hasAuthorizationToken = accessTokenStorage.has();

  if (hasAuthorizationToken) {
    headers.Authorization = `Bearer ${accessTokenStorage.get()}`;
  }

  return axios
    .create({
      baseURL: apiUrl,
      responseType: "json",
      headers: {
        "Content-Type": "application/json",
      },
    })({
      headers,
      method,
      url,
      data,
      params,
    })
    .then((response) => response.data)
    .catch(e => {
      const isLogged = authSelectors.getIsLogged(store.getState())
      const isUnauthorized = R.compose(R.equals('Unauthorized'), R.path(['response', 'data', 'error']))(e)

      if(isLogged && isUnauthorized) {
        store.dispatch(authActions.logout())
      }
    });
};

export const api = {
  service(serviceName) {
    if (
      oneInspectTrue(
        [R.isNil, R.isEmpty, R.compose(R.not, R.is(String))],
        serviceName
      )
    ) {
      throw new Error("api utils - service incorrect");
    } else {
      return {
        get: (id) => basic(serviceName, "get", null, { id }),
        create: (body) => basic(serviceName, "post", body),
        find: (body) => basic(serviceName, "get", body),
        remove: id => basic(serviceName, "delete", null, { id }),
        update: (id, body) => basic(serviceName, "put", body, { id }),
      };
    }
  },
  auth: {
    login: (body) => basic("/auth/login", "post", body),
    register: (body) => basic("/auth/register", "post", body),
  },
};
