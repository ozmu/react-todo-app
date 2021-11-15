import {url, cfAccessKey} from '../../config/app.config';

export default (request, response) => {
    if (!request.query.title){
        return response.status(400).json({
            error: 'title is required'
        });
    }
    else if (!request.query.details){
        return response.status(400).json({
            error: 'details is required'
        });
    }
    let todoItem = {
        title: request.query.title,
        details: request.query.details,
        due: request.query.due,
        isCompleted: false
    };

    fetch(`${url}/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            cfAccessKey
        },
        body: JSON.stringify(todoItem)
    })
    .then(res => res.json())
    .then(result => {
        return response.status(200).json(result);
    })
}