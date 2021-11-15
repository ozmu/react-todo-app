import {url, cfAccessKey} from '../../config/app.config';

export default (request, response) => {
    if (!request.query.item){
        return response.status(400).json({
            error: 'item is required'
        });
    }
}