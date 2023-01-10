import axios from 'axios';

// const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
const CORS_PROXY = '';
const BASE_URL = `${CORS_PROXY}https://api-v2.soundcloud.com`;
const CLIENT_ID = 'EKw2COF69dor1ouPVbkxglStk9ZPEI1s';

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  params: {
    client_id: CLIENT_ID,
  },
});
