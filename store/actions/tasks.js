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

export const getListTasks = (listId) => dispatch => {
    axios.get(url + `tasks${listId === 'unknown' ? '' : ('?listId=' + listId)}`).then(response => {
        if (response.status === 200){
            let payload = response.data.results;
            if (listId === 'unknown'){
                payload = payload.filter(task => task.list === null);
            }
            dispatch({ type: t.SET_LIST_TASKS, payload });
        }
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

export const changeTaskStatus = (task) => dispatch => {
    axios.patch(url + 'tasks/' + task.id, {isCompleted: !task.isCompleted}).then(response => {
        if (response.status === 200){
            dispatch({type: t.UPDATE_TASK, payload: response.data});
        }
    }).catch(e => {
        if (e.response.status === 400){
            alert('Invalid request body');
        }
        else if (e.response.status === 404){
            alert('Task not found');
        }        
    })
}

export const updateTask = (task) => dispatch => {
    axios.put(url + 'tasks/' + task.id, task).then(response => {
        if (response.status === 200){
            dispatch({type: t.UPDATE_TASK, payload: response.data});
        }
    }).catch(e => {
        if (e.response.status === 400){
            alert('Invalid request body');
        }
        else if (e.response.status === 404){
            alert('Task not found');
        }
    })
}

export const deleteTask = (id) => dispatch => {
    axios.delete(url + 'tasks/' + id).then(response => {
        if (response.status === 204){
            alert('Task deleted successfully');
            dispatch({type: t.REMOVE_TASK, payload: id})
        }
    }).catch(e => {
        if (e.response.status === 404){
            alert('Task not found');
        }
    })
}