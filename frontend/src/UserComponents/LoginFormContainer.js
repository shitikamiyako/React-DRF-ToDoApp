import React from "react";
import LoginForm from "./LoginForm";
import LogoutForm from "./LogoutForm";
import LoginFormLayout from "./LoginFormLayout";
import axios from "axios";
import SpinnerModal from "../Components/Spinner";
import useAlert from "../Hooks/useAlert";
import useAuth from "../Hooks/useAuth";
import useSpinner from "../Hooks/useSpinner";
import { AuthUrls } from "../Utils/authUrls";

const LoginFormContainer = () => {
  // Alert Hooks
  const { createAlert } = useAlert();
  // 認証状態でルーティングするためのHooks
  const { loginUser, authenticated } = useAuth();
  // Spinner Hooks
  const { startProgress, stopProgress, progress } = useSpinner();

  // ログインリクエストURL
  const loginUrl = AuthUrls.LOGIN;
  // スピナー
  let Modal = <SpinnerModal />;

  const onSubmit = async (data) => {
    // BackDropModalとスピナー表示
    startProgress("ログイン中です");

    try {
      const response = await axios.post(loginUrl, data);
      console.log(response);
      loginUser();
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

  // 認証状態でフォームチェンジ
  let form = <LoginForm onSubmit={onSubmit} />;

  if (authenticated === true) {
    form = <LogoutForm />;
  }

  // スピナーを出す
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
