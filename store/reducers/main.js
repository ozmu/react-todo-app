import * as t from '../types';

const main = (state = {
    tasks: [],
    loading: false
}, action) => {
    switch (action.type) {
        case t.SET_TASKS:
            return {
                ...state,
                tasks: action.payload
            };
        case t.ADD_TASK:
            return {
                ...state,
                tasks: [action.payload, ...state.tasks]
            }
        case t.REMOVE_TASK:
            return {
                ...state,
                tasks: state.tasks.filter(task => task.id !== action.payload)
            };
        case t.UPDATE_TASK:
            return {
                ...state,
                tasks: state.tasks.map(task => task.id === action.payload.id ? action.payload : task)
            };
        case t.LOADING:
            return {
                ...state,
                loading: action.payload
            };
        default:
            return {
                ...state
            };
    }
}

export default main;