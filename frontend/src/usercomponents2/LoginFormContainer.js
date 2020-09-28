import React from "react";
import LoginForm from './test';
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
    // const [alert, setAlert] = useState({ type: "", message: "" });
    // const [open, setShow] = useState(false);
    // const dispatch = useDispatch();

    // const onSubmit = async (data) => {
    //     // dispatch(startProgress("ログイン中です"));
    //     const flag = false
    //     try {
    //         const response = await sleep(500);
    //         // console.log(response);
    //         // dispatch(loginUser());

    //         // ログイン後のリダイレクト処理
    //         // history.push("/");

    //         return !flag
    //     } catch (error) {
    //         console.log(error);

    //     } finally {
    //             dispatch(createAlert({
    //                 message: "ログインに成功しました",
    //                 type: "success"
    //             })
    //             );
    //             console.log(alert);
    //             console.log(alerts);

    //         // window.alert(`You submitted:\n\n${JSON.stringify(data, null, 2)}`);
    //     }
    // };

    // モーダルテスト用
    // const classes = useStyles();
    // let form = (
    //     <Backdrop className={classes.backdrop} open={progress}>
    //         <CircularProgress color="inherit" />
    //     </Backdrop>
    // );

    let form = (<SpinnerModal />);

    const dispatch = useDispatch();

    console.log(alert);

    // const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

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
            // ログイン後のリダイレクト処理
            // history.push("/");
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
        form = (<LoginForm onSubmit={onSubmit}/>);
    }

    return (
        <React.Fragment>
            <LoginFormLayout>
                {form}
            </LoginFormLayout>
            {/* <AlertComponent /> */}
            {/* <Alert show={open} variant={alert.type} onClose={onClose}>{alert.message}</Alert> */}
        </React.Fragment>

    );
};

export default LoginFormContainer;
