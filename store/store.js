import { createStore } from 'redux';
import { createWrapper } from 'next-redux-wrapper';
import rootReducer from './reducers/rootReducer';

const store = createStore(rootReducer);
export default wrapper = createWrapper(store);