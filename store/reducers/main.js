import * as t from '../types';

const main = (state = {
    tasks: [],
    loading: true
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
                tasks: [...state.tasks, action.payload]
            }
        case t.REMOVE_TASK:
            return {
                ...state,
                tasks: state.tasks.filter(task => task.id !== action.payload)
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