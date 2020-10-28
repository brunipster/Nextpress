import axios from "axios";

export class HttpService {
  API_KEY = "";
  httpClient = axios.create({
    baseURL: './api/',
    timeout: 5000,
  });

  setApiKey(API_KEY) {
    this.API_KEY = API_KEY
  }

  _getHeaders() {
    let headers = {"Content-Type":"application/json",'Accept': 'application/json'};
    return headers;
  }

  get(url, params) {
    return this.httpClient.get(url, { ...params })
  }

  post(url, params, body) {
      return this.httpClient.post(url, body, { params: params})
  }
}

// if (axios.interceptors) {
//   axios.interceptors.response.use(function (response) {
//     return response;
//   }, function (error) {
//     if (error.response &&error.response.status === 504) {
//       return Router.push(routes.RequestNotAvailablePage + "?timeout")
//     } else {
//       return Promise.reject(error);
//     }
//   });
// }
