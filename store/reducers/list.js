import * as t from '../types';

const list = (state = {
    count: 0,
    items: [],
    loading: false
}, action) => {
    switch(action.type){
        case t.SET_LISTS:
            return {
                ...state,
                items: action.payload
            }
        case t.SET_LIST_COUNT:
            return {
                ...state,
                count: action.payload
            }
        default:
            return {
                ...state
            };
    }
}

export default list;