import React from "react";
import LoginForm from './LoginForm';
import SpinnerModal from '../components/Spinner';
// import AlertComponent from '../components/Alert';
import LoginFormLayout from './LoginFormLayout';
// import useSpinner from '../hooks/useSpinner';

import axios from "axios";
import Cookies from 'js-cookie';
import useAlert from '../hooks/useAlert';
import useAuth from '../hooks/useAuth';
import useSpinner from '../hooks/useSpinner';
import { useDispatch } from 'react-redux';
import { AuthUrls } from "../usercomponents2/urls";
// import { useEffect, useState } from "react";
// import { Alert } from 'react-bootstrap';

    // モーダルテスト用
// import CircularProgress from "@material-ui/core/CircularProgress";
// import Backdrop from "@material-ui/core/Backdrop";
// import { makeStyles } from "@material-ui/core/styles";

//     // モーダルテスト用
// const useStyles = makeStyles(theme => ({
//     backdrop: {
//         color: "#fff"
//     }
// }));

const loginUrl = AuthUrls.LOGIN;
var csrftoken = Cookies.get('csrftoken');
console.log(csrftoken);
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"
axios.defaults.withCredentials = true


const LoginFormContainer = () => {

    const { createAlert } = useAlert();
    const { loginUser } = useAuth();
    const { startProgress, stopProgress, progress } = useSpinner();


    let Modal = (<SpinnerModal />);

    const dispatch = useDispatch();

    console.log(alert);

    // 実際のSubmit

    const onSubmit = async (data) => {

        // BackDropModalとスピナー表示

        dispatch(startProgress("ログイン中です"));

        try {
            const response = await axios.post(loginUrl, data);
            console.log(response);
            dispatch(loginUser());
            dispatch(createAlert({
                message: "ログインに成功しました",
                type: "success"
            })
            );
        } catch (error) {
            console.log(error);
            dispatch(createAlert({
                message: "ログインに失敗しました",
                type: "danger"
            })
            );

        } finally {
            dispatch(stopProgress());
        }

    };


    if (!progress) {
        Modal = (<SpinnerModal show={false} />);
    }

    return (
        <React.Fragment>
            {Modal}
            <LoginFormLayout>
                <LoginForm onSubmit={onSubmit} />
            </LoginFormLayout>
        </React.Fragment>

    );
};

export default LoginFormContainer;