import * as t from '../types';

const main = (state = {
    loading: false,
    count: 0,
    tasks: [],
    lists: []
}, action) => {
    switch (action.type) {
        case t.SET_TASKS:
            const tasks = action.payload;
            let s = {
                ...state,
                tasks,
                lists: []
            }
            tasks.forEach(task => {
                let item = task.list;
                if (item != null){
                    let filteredItem = s.lists.filter(list => list.id == item.id);
                    if (filteredItem.length){
                        item = filteredItem[0];
                        item.taskCount++;
                        item.completedCount += task.isCompleted ? 1 : 0;
                    }
                    else {
                        s.lists.push({
                            ...item,
                            taskCount: 1,
                            completedCount: task.isCompleted ? 1 : 0
                        });
                    }
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
                            completedCount: task.isCompleted ? 1 : 0,
                            taskCount: 1
                        });
                    }
                }
            })
            return s;
        case t.SET_LIST_TASKS:
            return {
                ...state,
                tasks: action.payload
            }
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