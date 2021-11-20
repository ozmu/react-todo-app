import * as t from '../types';

const list = (state = {
    count: 0,
    items: [],
    loading: false
}, action) => {
    switch(action.type){
        case t.SET_LISTS:
            let unknown = {
                id: null,
                title: 'Unknown List',
                createdAt: new Date(),
                completedCount: 0,
                taskCount: 0
            }
            state.items.push(unknown)
            return {
                ...state,
                items: [...action.payload, ...state.items]
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