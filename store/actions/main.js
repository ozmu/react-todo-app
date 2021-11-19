import * as t from '../types';
import axios from '../../middlewares/axios.middleware'

const url = process.env.CRUDFUL_URL;

export const getTasks = () => dispatch => {
    dispatch({ type: t.LOADING, payload: true });
    axios.get(url + 'tasks').then(response => {
        dispatch({ type: t.LOADING, payload: false });
        if (response.status === 200){
            dispatch({ type: t.SET_TASKS, payload: response.data.results });
        }
    }).catch(e => {
        dispatch({ type: t.LOADING, payload: false });
        alert(e.message);
    })
}

export const addTask = (task) => dispatch => {
    axios.post(url + 'tasks', task).then(response => {
        if (response.status === 201){
            dispatch({type: t.ADD_TASK, payload: response.data});
        }
    }).catch(e => {
        if (e.response.status === 400){
            alert('Invalid request body');
        }
    })
}

export const removeTask = (id) => ({
    type: t.REMOVE_TASK,
    payload: id
})