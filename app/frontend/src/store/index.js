import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit';
import spinnerReducer from './spinnerSlice';
import authReducer from './authSlice';
import alertReducer from './alertSlice';
import todosReducer from './todosSlice';
import categoryReducer from './categorySlice';
import changeFlagReducer from './changeFlagSlice';
import pageNationSliceReducer from './pageNationSlice';
import filterReducer from './filterSlice';
import usersReducer from './usersSlice';
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
    notifications: alertReducer,
    todos: todosReducer,
    category: categoryReducer,
    flag: changeFlagReducer,
    page: pageNationSliceReducer,
    filter: filterReducer,
    users: usersReducer,
});


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