import React from "react";
import LoginForm from "./LoginForm";
import LogoutForm from "./LogoutForm";
import LoginFormLayout from "./LoginFormLayout";
import axios from "axios";
import SpinnerModal from "../Components/Spinner";
import Cookies from "js-cookie";
import useAlert from "../Hooks/useAlert";
import useAuth from "../Hooks/useAuth";
import useSpinner from "../Hooks/useSpinner";
import { AuthUrls } from "../Utils/authUrls";
// import { useDispatch } from 'react-redux';
// import history from "../utils/historyUtils";

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
var csrftoken = Cookies.get("csrftoken");
console.log(csrftoken);
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.withCredentials = true;

const LoginFormContainer = () => {
  const { createAlert } = useAlert();
  const { loginUser, authenticated } = useAuth();
  const { startProgress, stopProgress, progress } = useSpinner();

  let Modal = <SpinnerModal />;

  // 実際のSubmit

  const onSubmit = async (data) => {
    // BackDropModalとスピナー表示

    startProgress("ログイン中です");

    try {
      const response  = await axios.post(loginUrl, data);
      console.log(response);
      loginUser();
    //   const refreshToken = response.refresh_token;
    //   Cookies.set("refresh_token", refreshToken);
    //   console.log(refreshToken);
      createAlert({
        message: "ログインに成功しました",
        type: "success",
      });
      stopProgress();
    } catch (error) {
      console.log(error);
      createAlert({
        message: "ログインに失敗しました",
        type: "danger",
      });
      stopProgress();
    }
  };

  let form = <LoginForm onSubmit={onSubmit} />;

  console.log({ authenticated });

  if (authenticated === true) {
    form = <LogoutForm />;
  }

  if (!progress) {
    Modal = <SpinnerModal show={false} />;
  }

  return (
    <React.Fragment>
      {Modal}
      <LoginFormLayout>{form}</LoginFormLayout>
    </React.Fragment>
  );
};

export default LoginFormContainer;
