import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://192.168.31.51:3333',
  baseURL: 'http://35.185.63.231:3333',
});

export default api;
