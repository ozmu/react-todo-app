export default (request, response) => {
    return fetch(process.env.CRUDFUL_URL + 'tasks', {
        method: 'GET',
        headers: {
            cfAccessKey: process.env.CRUDFUL_API_KEY
        }
    })
    .then(res => res.json())
    .then(data => {
        let result = data;
        return response.status(200).json(result);
    })
}