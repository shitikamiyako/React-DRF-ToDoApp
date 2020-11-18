import React, { useRef } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";

import useAlert from "../Hooks/useAlert";
import { AuthUrls } from "../Utils/authUrls";

import { Button, Form, Row } from "react-bootstrap";

const ChangePasswordForm = () => {
  const { handleSubmit, register, errors, watch } = useForm();
  const password = useRef({});
  password.current = watch("new_password1", "");

  const { createAlert } = useAlert();

  const get_userUrl = AuthUrls.CHANGE_PASSWORD;

  const changePassword = async (data) => {
    try {
      const response = await axios.post(get_userUrl, data);
      createAlert({
        message: "パスワードを変更しました",
        type: "success",
      });
    } catch (error) {
      createAlert({
        message:
          "リクエストエラーです。ログインの有効期限が切れている可能性があります。",
        type: "danger",
      });
    }
  };

  // inputタグのクリックイベント無効
  const handleClick = (e) => {
    e.preventDefault();
  };

  return (
    <Form
      onSubmit={handleSubmit(changePassword)}
      className="justify-content-center"
    >
      <Form.Group
        as={Row}
        controlId="formHorizontalUsername"
        className="justify-content-center"
      >
        <Form.Label>現在のパスワード</Form.Label>
        <Form.Control
          name={"old_password"}
          placeholder={"現在のパスワードを入力してください"}
          type={"password"}
          isInvalid={errors.password1}
          onClick={handleClick}
          ref={register({
            required: "現在のパスワードの入力は必須です",
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
      <Form.Group
        as={Row}
        controlId="formHorizontalUsername"
        className="justify-content-center"
      >
        <Form.Label>新しいパスワード</Form.Label>
        <Form.Control
          name={"new_password1"}
          placeholder={"新しいパスワードを入力してください"}
          type={"password"}
          isInvalid={errors.new_password1}
          onClick={handleClick}
          ref={register({
            required: "新しいパスワードの入力は必須です",
            minLength: {
              value: 8,
              message: "パスワードは8文字以上です",
            },
          })}
        />
        {errors.new_password1 && (
          <Form.Control.Feedback type="invalid">
            {errors.new_password1.message}
          </Form.Control.Feedback>
        )}
      </Form.Group>

      <Form.Group
        as={Row}
        controlId="formHorizontalEmail"
        className="justify-content-center"
      >
        <Form.Label>確認用</Form.Label>
        <Form.Control
          name={"new_password2"}
          placeholder={"新しいパスワードをもう一度入力してください"}
          type={"password"}
          isInvalid={errors.new_password2}
          onClick={handleClick}
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
        {errors.new_password2 && (
          <Form.Control.Feedback type="invalid">
            {errors.new_password2.message}
          </Form.Control.Feedback>
        )}
      </Form.Group>

      <Form.Group as={Row} className="justify-content-center">
        <Button type="submit">Change Password</Button>
      </Form.Group>
    </Form>
  );
};

export default ChangePasswordForm;
