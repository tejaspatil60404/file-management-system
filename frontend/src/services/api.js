import axios from 'axios';

const api = axios.create({
  // This line reads the full address from your .env file
  baseURL: process.env.REACT_APP_API_URL, 
});

// The interceptor part remains the same
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      config.headers['Authorization'] = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;