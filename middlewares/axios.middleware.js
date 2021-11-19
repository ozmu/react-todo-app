import axios from 'axios';

axios.interceptors.request.use(config => {
    config.headers.cfAccessKey = process.env.CRUDFUL_API_KEY;
    return config;
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