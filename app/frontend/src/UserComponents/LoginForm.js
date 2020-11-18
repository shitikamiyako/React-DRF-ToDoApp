import React from "react";
import { useForm } from "react-hook-form";
import { Form, Button, ButtonToolbar } from "react-bootstrap";




const LoginForm = ({ onSubmit }) => {
  // React Hook Form
  const { register, handleSubmit, errors, formState } = useForm();
  // inputタグのクリックイベント無効
  const handleClick = (e) => {
    e.preventDefault();
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
            onClick={handleClick}
            ref={register({
              required: "(ユーザ名は必須です(Username is required.))",
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
            onClick={handleClick}
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
              Login
              </Button>
          </ButtonToolbar>
        </Form.Group>
      </Form>
    </div>

  );
};

export default LoginForm;
