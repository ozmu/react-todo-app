import { combineReducers } from 'redux';
import tasks from './tasks';
import list from './list';

const rootReducer = combineReducers({
    tasks,
    list
})

export default rootReducer;