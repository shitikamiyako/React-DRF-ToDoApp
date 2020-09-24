import  { createSlice } from "@reduxjs/toolkit";
import { reducer as formReducer } from "redux-form";


const initialState = {
    authenticated: false,
};

const slice = createSlice({
    name: auth,
    initialState,
    reducers: {
        loginUser: (state = {}, action) => {
            return {
                ...state, authenticated: true
            }
        },
        logoutUser: (state = {}, action) => {
            return {
                ...state, authenticated: false
            }
        }
    }
});


export const { loginUser, logout } = slice.actions;
export const store = configureStore({
    reducer: slice.reducer,
    form: formReducer,
});

