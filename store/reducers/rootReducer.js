import { combineReducers } from 'redux';
import main from './main';
import list from './list';

const rootReducer = combineReducers({
    main,
    list
})

export default rootReducer;