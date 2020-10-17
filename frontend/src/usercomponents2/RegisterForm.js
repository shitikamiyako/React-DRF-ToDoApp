import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { Form, Button, ButtonToolbar } from "react-bootstrap";
import { AuthUrls } from "../utils/authUrls";
import axios from "axios";
import Cookies from "js-cookie";

import useAlert from "../hooks/useAlert";
import useAuth from "../hooks/useAuth";
import useSpinner from "../hooks/useSpinner";

var csrftoken = Cookies.get("csrftoken");
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.withCredentials = true;

const RegisterForm = () => {
  const { register, handleSubmit, watch, errors, formState } = useForm();
  const password = useRef({});
    password.current = watch("password1", "");

  const { createAlert } = useAlert();
  const { loginUser } = useAuth();
  const { startProgress, stopProgress } = useSpinner();
  const signUpUrl = AuthUrls.SIGNUP;
  console.log(formState);

  const onSubmit = async (data) => {
    console.log(data);
    startProgress();
    try {
      const response = await axios.post(signUpUrl, data);
      console.log(response);
      loginUser();
      //   const refreshToken = response.refresh_token;
      //   Cookies.set("refresh_token", refreshToken);
      //   console.log(refreshToken);
      createAlert({
        message: "会員登録が完了しました",
        type: "success",
      });
      stopProgress();
    } catch (error) {
      console.log(error);
      createAlert({
        message: "会員登録に失敗しました",
        type: "danger",
      });
      stopProgress();
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="justify-content-center">
      {/* username input */}
      <Form.Group controlId={"username"}>
        <Form.Label>{"ユーザ名"}</Form.Label>
        <Form.Control
          name={"username"}
          placeholder={"Username"}
          type={"text"}
          isInvalid={errors.username}
          ref={register({
            required: "ユーザー名は必須です",
            maxLength: {
              value: 30,
              message: "ユーザー名は30文字以内です",
            },
          })}
        />
        {errors.username && (
          <Form.Control.Feedback type="invalid">
            {errors.username.message}
          </Form.Control.Feedback>
        )}
      </Form.Group>

      {/* email input */}
      <Form.Group controlId={"email"}>
        <Form.Label>{"メールアドレス"}</Form.Label>
        <Form.Control
          name={"email"}
          placeholder={"Email"}
          type={"email"}
          isInvalid={errors.email}
          ref={register({
            required: "メールアドレスは必須です",
            minLength: {
              value: 8,
              message: "メールアドレスは8文字以上です",
            },
          })}
        />

        {errors.email && (
          <Form.Control.Feedback type="invalid">
            {errors.email.message}
          </Form.Control.Feedback>
        )}
      </Form.Group>

      {/* password input */}
      <Form.Group controlId={"password1"}>
        <Form.Label>{"パスワード"}</Form.Label>
        <Form.Control
          name={"password1"}
          placeholder={"Password"}
          type={"password"}
          isInvalid={errors.password1}
          ref={register({
            required: "パスワードは必須です",
            minLength: {
              value: 8,
              message: "パスワードは8文字以上です",
            },
          })}
        />
        {errors.password1 && (
          <Form.Control.Feedback type="invalid">
            {errors.password1.message}
          </Form.Control.Feedback>
        )}
      </Form.Group>

      {/* Repeat password input */}
      <Form.Group controlId={"password2"}>
        <Form.Label>{"パスワード確認"}</Form.Label>
        <Form.Control
          name={"password2"}
          placeholder={"Repeat Password"}
          type={"password"}
          isInvalid={errors.password2}
          ref={register({
            required: "パスワードは必須です",
            minLength: {
              value: 8,
              message: "パスワードは8文字以上です",
            },
            validate: (value) =>
              value === password.current || "パスワードが一致しません",
          })}
        />
        {errors.password2 && (
          <Form.Control.Feedback type="invalid">
            {errors.password2.message}
          </Form.Control.Feedback>
        )}
      </Form.Group>

      <Form.Group>
        <ButtonToolbar className="justify-content-center">
          <Button
            variant={"primary"}
            type="submit"
            // disabled={formState.isSubmitting}
          >
            登録
          </Button>
        </ButtonToolbar>
      </Form.Group>
    </Form>
  );
};

export default RegisterForm;
