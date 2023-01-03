import axios from 'axios';
import { config } from '../config';

export const api = axios.create({
    baseURL: config.API_URL,
    // here are some default headers
    headers: {
        'Cache-Control': 'no-cache'
    },
    // 10 second timeout...
    timeout: 10000
});