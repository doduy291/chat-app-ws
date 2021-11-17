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

// ! In case that get error, use another option to replace
// ! ex: const options = (token) => { headers: { Authorization: token }}
const authSetHeader = (token) => {
  axiosClient.interceptors.request.use((config) => {
    config.headers['Authorization'] = token ? `Bearer ${token}` : '';
    return config;
  });
  return axiosClient;
};

export { axiosClient, authSetHeader };
