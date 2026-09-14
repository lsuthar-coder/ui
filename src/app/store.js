import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import coaReducer from '../features/coaSlice'
import tbReducer from '../features/tbSlice'
export const store = configureStore({
    reducer: {
        counter: counterReducer,
        coa: coaReducer,
        tb: tbReducer,
    },
})