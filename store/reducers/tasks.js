import * as t from '../types';

const main = (state = {
    loading: false,
    count: 0,
    tasks: [],
    lists: []
}, action) => {
    switch (action.type) {
        case t.SET_TASKS:
            const list = action.payload.map(task => task.list);
            let s = {
                ...state,
                tasks: action.payload,
                lists: []
            }
            list.forEach(item => {
                if (item != null){
                    s.lists.push({
                        ...item,
                        taskCount: action.payload.filter(task => task.list && (task.list.id === item.id)).length,
                        completedCount: action.payload.filter(task => task.list && (task.list.id === item.id) && task.isCompleted).length,
                    });
                }
                else {
                    let unknownList = s.lists.find(list => list.id == null);
                    if (unknownList){
                        unknownList.completedCount = action.payload.filter(task => task.list === null && task.isCompleted).length;
                        unknownList.taskCount++;
                    }
                    else {
                        s.lists.push({
                            id: null,
                            title: 'Unknown List',
                            createdAt: new Date(),
                            completedCount: 0,
                            taskCount: 0
                        });
                    }
                }
            })
            console.log('s: ', s)
            return s;
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