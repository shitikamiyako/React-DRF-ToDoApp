import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";

import useAlert from "../Hooks/useAlert";
import { AuthUrls } from "../Utils/authUrls";

import { Button, Col, Form, Row } from "react-bootstrap";

const UserInfoChangeForm = () => {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const history = useHistory();
  const { handleSubmit, register, errors } = useForm();

  const { createAlert } = useAlert();

  const get_userUrl = AuthUrls.GET_USER_DATA;

  const getUser = async () => {
    try {
      const response = await axios.get(get_userUrl);
      setUsername(response.data.username);
      setEmail(response.data.email);
      //   console.log(user)
    } catch (error) {
      createAlert({
        message:
          "ユーザーの取得に失敗しました、ログアウトして再ログインしてください",
        type: "danger",
      });
    }
  };

  const patch_User = async (data) => {
    try {
      const response = await axios.patch(get_userUrl, data);
      createAlert({
        message: "ユーザー情報を変更しました",
        type: "success",
      });
    } catch (error) {
      createAlert({
        message:
          "リクエストエラーです、すでに登録されているユーザー名かメールアドレスの可能性があります",
        type: "danger",
      });
    }
  };

  // inputタグのクリックイベント無効
  const handleClick = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Form
      onSubmit={handleSubmit(patch_User)}
      className="justify-content-center"
    >
      <Form.Group
        as={Row}
        className="justify-content-center"
        controlId="formHorizontalUsername"
      >
        <Form.Label>あなたのユーザー名</Form.Label>
        <Form.Control
          name={"username"}
          placeholder={"Username"}
          type={"text"}
          defaultValue={username}
          isInvalid={errors.username}
          onClick={handleClick}
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

      <Form.Group
        as={Row}
        className="justify-content-center"
        controlId="formHorizontalEmail"
      >
        <Form.Label>あなたのメールアドレス</Form.Label>
        <Form.Control
          name={"email"}
          placeholder={"メールアドレスはダミーでも可能です"}
          type={"email"}
          defaultValue={email}
          isInvalid={errors.email}
          onClick={handleClick}
          ref={register({
            required: "メールアドレスは必須です",
            minLength: {
              value: 8,
              message: "メールアドレスは8文字以上です",
            },
          })}
        />
      </Form.Group>

      <Form.Group as={Row} className="justify-content-center">
        <Button type="submit">Change User Info</Button>
      </Form.Group>
    </Form>
  );
};

export default UserInfoChangeForm;
