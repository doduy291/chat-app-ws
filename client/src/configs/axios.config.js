import axios from 'axios';

const axiosClient = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? process.env.REACT_APP_API_LOCAL_BASE_URL
      : process.env.REACT_APP_API_BASE_URL,
  headers: {
    'Content-type': 'application/json; charset=utf-8',
  },
  withCredentials: true, // Use to pass cookie from server to browser
});

const formDataConfig = {
  'Content-type': 'multipart/form-data',
};
// axiosClient.interceptors.response.use(
//   (response) => {
//     const config = response.config;

//     // Routes don't need to check Token
//     if (config.url.indexOf('/login') >= 0) {
//       return response;
//     }
//     const { statusCode, message } = response.data;
//     if (statusCode && statusCode === 401) {
//       if (message === 'jwt expired') {
//         console.log('Token is out of expired', message);
//       }
//     }
//     return response;
//   },
//   (err) => {
//     return Promise.reject(err);
//   }
// );

export { axiosClient, formDataConfig };
