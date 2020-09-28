import { configureStore, combineReducers } from '@reduxjs/toolkit';
import spinnerReducer from './spinnerSlice';
import authReducer from './authSlice';
import alertReducer from './alertSlice';

export const store = configureStore({
    reducer: combineReducers({
        spinner: spinnerReducer,
        auth: authReducer,
        notifications: alertReducer,
    }),
});

export default store;