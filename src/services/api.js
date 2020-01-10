import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.gobarber.cf',
});

export default api;
