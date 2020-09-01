import React from 'react';
import Axios from 'axios';

import { useSelector, useDispatch } from 'react-redux';
import { setToken } from '../modules/UserModule';

import LoginPageTemplate from './loginpageTemplate';

export const endpoint = 'http://localhost:8000/user/api/';

export const axios = Axios.create({
    baseURL: endpoint,
    timeout: 1000,
    headers: { "Content-Type" : "application/json" },
    data: {},
    responseType: 'json',
});

const LoginPage = () => {
    const dispatch = useDispatch();
    const token = useSelector(state => state.user.token);

    const login = (username, password) => {
        axios
            .post('/auth/login/', {
                username: username,
                password: password,
            })
            .then(res => {dispatch(setToken(res.data.token));
                    axios.defaults.headers.common['Authorization'] = 'JWT' + token;
            })
            .catch(err => {console.log(err)})
    }
    return (
        <LoginPageTemplate login={login} />
    );
}

export default LoginPage;