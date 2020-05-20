import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

const basic = (url, method, data) =>
  axios
    .create({
      baseURL: apiUrl,
      responseType: "json",
      headers: {
        "Content-Type": "application/json",
      },
    })({
      headers: {
        Authorization: "getAccessToken()",
      },
      method,
      url,
      data,
    })
    .then((response) => response.data);

export const api = {
  auth: (data) => basic("/auth/login", "post", data),
  post: (url, data) => basic(`${url}`, "post", data),
  get: (url) => basic(`${url}`, "get"),
  delete: (url) => basic(`${url}`, "delete"),
  put: (url, data) => basic(`${url}`, "put", data),
};
