import {url, cfAccessKey} from '../../config/app.config';

export default (request, response) => {
    return fetch(url + 'tasks', {
        method: 'GET',
        headers: {
            cfAccessKey
        }
    })
    .then(res => res.json())
    .then(data => {
        let result = data;
        return response.status(200).json(result);
    })
}