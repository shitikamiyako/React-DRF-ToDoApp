import { AuthTypes } from "./actionTypes";

const Login = (token) => {
    return {
        type: AuthTypes.LOGIN,
        payload: token,
    };
};

const Logout = () => {
    return {
        type: AuthTypes.LOGOUT
    };
};

export {
    Login,
    Logout
};

