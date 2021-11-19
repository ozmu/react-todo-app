import * as t from '../types';
import axios from '../../middlewares/axios.middleware'

const url = process.env.CRUDFUL_URL;

export const getLists = () => dispatch => {
    dispatch({ type: t.LOADING, payload: true });
    axios.get(url + 'lists?ordering=-createdAt').then(response => {
        dispatch({ type: t.LOADING, payload: false });
        if (response.status === 200){
            dispatch({ type: t.SET_LIST_COUNT, payload: response.data.count });
            dispatch({ type: t.SET_LISTS, payload: response.data.results });
        }
    }).catch(error => {
        dispatch({ type: t.LOADING, payload: false });
    })
}