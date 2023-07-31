import axios from 'axios';

const baseUrl = 'https://jsonplaceholder.typicode.com/';
const instance = axios.create({
  baseURL: baseUrl,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
