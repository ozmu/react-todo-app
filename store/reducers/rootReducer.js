import { combineReducers } from 'redux';
import tasks from './tasks';
import lists from './list';

const rootReducer = combineReducers({
    tasks,
    lists
})

export default rootReducer;