import * as t from '../types';
import axios from '../../middlewares/axios.middleware'

const url = process.env.CRUDFUL_URL;

export const getTasks = () => async dispatch => {
    dispatch({ type: t.LOADING, payload: true });
    const apiResponse = await axios.get(url + 'tasks');
    dispatch({ type: t.SET_TASKS, payload: apiResponse.data.results });
    dispatch({ type: t.LOADING, payload: false });
}

export const addTask = (task) => ({
    type: t.ADD_TASK,
    payload: task
})

export const removeTask = (id) => ({
    type: t.REMOVE_TASK,
    payload: id
})