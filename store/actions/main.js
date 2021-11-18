import * as t from '../types';

export const setTasks = (tasks) => ({
    type: t.SET_TASKS,
    payload: tasks
})

export const addTask = (task) => ({
    type: t.ADD_TASK,
    payload: task
})

export const removeTask = (id) => ({
    type: t.REMOVE_TASK,
    payload: id
})