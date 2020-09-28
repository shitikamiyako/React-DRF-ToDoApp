// フォームの入力状態の監視とDispatch(処理実行)とでコンポーネントを作る
// それをあとでLoginFormテンプレートで合体

// まずLoginFormをreact-hook-formとReact-Bootstrapでリファクタリングする。

// フォーム

import React from "react";
// import axios from "axios";
import { useForm } from "react-hook-form";
import { Form, Row, Col, Button, ButtonToolbar } from "react-bootstrap";
// import showResults from "../utils/showResults";
// import asyncLogin from "../utils/asyncLogin";

// import Cookies from 'js-cookie';
// import useAlert from '../hooks/useAlert';
// import useAuth from '../hooks/useAuth';
// import useSpinner from '../hooks/useSpinner';
// import { useDispatch } from 'react-redux';
// import { AuthUrls } from "../usercomponents2/urls";

// const loginUrl = AuthUrls.LOGIN;
// var csrftoken = Cookies.get('csrftoken');
// console.log(csrftoken);
// axios.defaults.xsrfCookieName = 'csrftoken'
// axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"
// axios.defaults.withCredentials = true

const LoginForm = ({onSubmit}) => {
    const { register, handleSubmit, errors, reset, formState } = useForm();

  // Submitテスト用関数
  // const onSubmit = showResults;

    // const { setAlert, closeAlert, alertMessage, type } = useAlert();
    // const { loginUser } = useAuth();
    // const { startProgress, stopProgress } = useSpinner;

  // 以下render部分、進捗が進んだらパーツごとに分割してmemoでラップしたい

  return (
    <Form noValidate onSubmit={handleSubmit(onSubmit)}>
      {/* username input */}
      <Form.Group as={Row} controlId={"username"}>
        <Form.Label column sm={2}>
          {"ユーザー名"}
        </Form.Label>
        <Col sm={5}>
          <Form.Control
            name={"username"}
            placeholder={"Username"}
            type={"text"}
            isInvalid={errors.username}
            ref={register({
              required: "ユーザ名は必須です",
              maxLength: {
                value: 30,
                message: "30文字以内です",
              },
            })}
          />
          {errors.username && (
            <Form.Control.Feedback type="invalid">
              {errors.username.message}
            </Form.Control.Feedback>
          )}
        </Col>
      </Form.Group>

      {/* password input */}
      <Form.Group as={Row} controlId={"password"}>
        <Form.Label column sm={2}>
          {"パスワード"}
        </Form.Label>
        <Col sm={5}>
          <Form.Control
            name={"password"}
            placeholder={"Password"}
            type={"password"}
            isInvalid={errors.password}
            ref={register({
              required: "パスワードは必須です",
              maxLength: {
                value: 30,
                message: "30文字以内です",
              },
            })}
          />
          {errors.password && (
            <Form.Control.Feedback type="invalid">
              {errors.password.message}
            </Form.Control.Feedback>
          )}
        </Col>
      </Form.Group>
      <Form.Group>
        <Col smoffset={2} sm={5}>
          <ButtonToolbar>
            <Button
              variant={"primary"}
              type="submit"
              disabled={formState.isSubmitting}
            >
              Login
            </Button>
            <Button variant={"secondary"} type="button" onClick={reset}>
              クリア
            </Button>
          </ButtonToolbar>
        </Col>
      </Form.Group>
    </Form>
  );
};

export default LoginForm;
