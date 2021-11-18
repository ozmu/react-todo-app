import { configureStore } from '@reduxjs/toolkit'
import tasksReducer from './reducers/tasksReducer'

export default configureStore({
    reducer: {
        tasks: tasksReducer,
    }
})