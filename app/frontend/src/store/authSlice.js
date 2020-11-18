import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authenticated: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUser: (state) => {
      return {
        ...state,
        authenticated: true,
      };
    },
    logoutUser: (state) => {
      return {
        ...state,
        authenticated: false,
      };
    },
  },
});

export const { loginUser, logoutUser } = authSlice.actions;
export const selectAuthenticated = ({ auth }) => auth.authenticated;
export default authSlice.reducer;
