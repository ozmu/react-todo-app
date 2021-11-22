import * as t from '../types';
import axios from '../../lib/axios.middleware'

const url = process.env.CRUDFUL_URL;

export const getLists = () => dispatch => {
    dispatch({ type: t.LOADING, payload: true });
    axios.get(url + 'lists?ordering=-createdAt').then(response => {
        dispatch({ type: t.LOADING, payload: false });
        if (response.status === 200){
            dispatch({ type: t.SET_LIST_COUNT, payload: response.data.count });
            dispatch({ type: t.SET_LISTS, payload: response.data.results });
            //response.data.results.forEach(list => {
            //    axios.get(url + 'tasks?listId=' + list.id).then(response => {
            //        if (response.status === 200){
            //            if (response.data.count > 0){
            //                dispatch({ type: t.SET_TASKS, payload: response.data.results });
            //            }
            //        }
            //    }).catch(e => {
            //        dispatch({ type: t.LOADING, payload: false });
            //        alert(e.message);
            //    })
            //})
        }
        else {
            dispatch({ type: t.LOADING, payload: false });
        }
    }).catch(error => {
        dispatch({ type: t.LOADING, payload: false });
    })
}