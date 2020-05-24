import axios from "axios";

import { storage } from "./storage";

const apiUrl = process.env.REACT_APP_API_URL;

const basic = (url, method, data) => {
  const accessTokenStorage = storage('accessToken')

  const headers = {}
  const hasAuthorizationToken = accessTokenStorage.has()

  if(hasAuthorizationToken) {
    headers.Authorization = `Bearer ${accessTokenStorage.get()}`
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
    })
    .then((response) => response.data);
};

export const api = {
  post: (url, data) => basic(`${url}`, "post", data),
  get: (url) => basic(`${url}`, "get"),
  delete: (url) => basic(`${url}`, "delete"),
  put: (url, data) => basic(`${url}`, "put", data),
  auth(data, url = "login") {
    return this.post(`/auth/${url}`, data)
  },
};
