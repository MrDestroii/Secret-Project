import axios from "axios";
import * as R from "ramda";

import { storage } from "./storage";
import { oneInspectTrue } from "helpers/tools";

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
    .then((response) => response.data);
};

export const api = {
  service(serviceName) {
    if (
      oneInspectTrue(
        [R.isNil, R.isEmpty, R.compose(R.not, R.is(String))],
        serviceName
      )
    ) {
      throw new Error("api util - service not incorrect");
    } else {
      return {
        get: (id) => basic(serviceName, "get", null, { id }),
        create: (body) => basic(serviceName, "post", body),
        find: (body) => basic(serviceName, "get", body),
        remove: (body) => basic(serviceName, "delete", body),
        update: (body) => basic(serviceName, "put", body),
      };
    }
  },
  auth: {
    login: (body) => basic("/auth/login", "post", body),
    register: (body) => basic("/auth/register", "post", body),
  },
};
