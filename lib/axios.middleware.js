import axios from 'axios';
import { getUniversalCookies } from './cookies';

axios.interceptors.request.use(config => {
    const cookie = getUniversalCookies().get('cfAccessKey');
    config.headers.cfAccessKey = cookie;
    return config;
}, error => {
    console.log('config error: ', error);
    return Promise.reject(error);
})

axios.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response.status === 401){
        return Promise.reject({error, message: 'Missing cfAccessKey header'});
    }
    return Promise.reject(error);
})

export default axios;