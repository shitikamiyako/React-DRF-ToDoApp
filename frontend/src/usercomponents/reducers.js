import { AuthTypes } from "./actionTypes";
import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { reducer as notifReducer } from "redux-notifications";

const LoginReducer = (state = {}, action) => {
  switch (action.type) {
    case AuthTypes.LOGIN:
      return { ...state, authenticated: true, token: action.payload };
    case AuthTypes.LOGOUT:
      return { ...state, authenticated: false, token: null };
    default:
  }
  return state;
};

const reducer = combineReducers({
  auth: LoginReducer,
  form: formReducer,
  notifs: notifReducer,
});

export default reducer;
