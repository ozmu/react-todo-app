import {url, cfAccessKey} from '../../config/app.config';

export default (request, response) => {
    if (!request.body.id){
        return response.status(400).json({
            error: 'id is required'
        });
    }
    fetch(url + 'tasks/' + request.body.id, {
        method: 'DELETE',
        headers: {
            cfAccessKey
        }
    })
    .then(data => {
        if (data.status === 204){
            return response.json({
                message: 'Task deleted'
            });
        }
        else if (data.status === 401){
            return response.json({
                error: 'Missing cfAccessKey header'
            });
        }
        else if (data.status === 404){
            return response.json({
                error: 'Non-existing instance'
            });
        }
        return response.json({
            error: 'Internal server error'
        })
    })
}