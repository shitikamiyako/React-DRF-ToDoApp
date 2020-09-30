import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit';
import spinnerReducer from './spinnerSlice';
import authReducer from './authSlice';
import alertReducer from './alertSlice';
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
}from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const reducers = combineReducers({
    spinner: spinnerReducer,
    auth: authReducer,
    notifications: alertReducer,});


const persistConfig = {
    key: 'root', // Storageに保存されるキー名を指定する
    storage, // 保存先としてlocalStorageがここで設定される
    whitelist: ['auth'] // Stateは`todos`のみStorageに保存する
    // blacklist: ['visibilityFilter'] // `visibilityFilter`は保存しない
}

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
    })
});

export default store;