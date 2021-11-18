import axios from 'axios';

axios.interceptors.request.use(config => {
    config.headers.cfAccessKey = process.env.CRUDFUL_API_KEY;
    return config;
})

export default axios;