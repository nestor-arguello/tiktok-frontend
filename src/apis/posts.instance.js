import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://nes-tiktok-backend.herokuapp.com',
});

export default instance;
