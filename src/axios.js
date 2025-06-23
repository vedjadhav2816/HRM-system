// src/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://hrm-api-production.up.railway.app', // ✅ your actual backend URL
});

export default instance;
