import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import axios from "axios";

import { AuthUrls } from "../utils/authUrls";
import TwitterLogin from 'react-twitter-auth';
import { Form, Button, ButtonToolbar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";



const LoginForm = ({ onSubmit }) => {
  const { register, handleSubmit, errors, formState } = useForm();
  const history = useHistory();
  const test = "http://127.0.0.1:8000/accounts/twitter/login/"
  const testcase = AuthUrls.LOGIN_TWITTER_POST
  const testlog = AuthUrls.LOGIN_TWITTER
  const customHeader = {};
  customHeader["Content-Type"] = "application/json";  // const test = AuthUrls.LOGIN_TWITTER_CALLBACK

  // const data = {
  //   provider: 'twitter'
  // }
  // const test = async () => {
  //   try {
  //     const response = await axios.post(AuthUrls.TEST, data)
  //     console.log(response)
  //     console.log(response.data)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  const TwitterResponse = (response) => {
    console.log(response);
  }


  return (
    <div>
      <Form noValidate onSubmit={handleSubmit(onSubmit)} className="justify-content-center">
        {/* username input */}
        <Form.Group controlId={"username"}>
          <Form.Label>
            {"ユーザー名"}
          </Form.Label>
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
        </Form.Group>

        {/* password input */}
        <Form.Group controlId={"password"}>
          <Form.Label>
            {"パスワード"}
          </Form.Label>
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
        </Form.Group>
        <Form.Group>
          <ButtonToolbar className="justify-content-center">
            <Button
              variant={"outline-primary"}
              type="submit"
              disabled={formState.isSubmitting}
            >
              ログイン
              </Button>
            {/* <Button variant={"secondary"} type="button" onClick={reset}>
                クリア
              </Button> */}
          </ButtonToolbar>
        </Form.Group>
      </Form>
      {/* <Form noValidate onSubmit={handleSubmit(onSubmit)} className="justify-content-center">
        <Button
          variant={"outline-info"}
          type="submit"
          >
          Twitter
          </Button>
      </Form> */}
      <TwitterLogin
        loginUrl={testcase}
        onFailure={TwitterResponse}
        onSuccess={TwitterResponse}
        requestTokenUrl={testlog}
        credentials="same-origin"
      />
        <Button
          variant={"outline-info"}
        href={test}
          >
          Twitter
          </Button>
    </div>

  );
};

export default LoginForm;
