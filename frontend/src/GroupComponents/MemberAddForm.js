import React from "react";
import axios from "axios";

import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import { Form, Button, ButtonToolbar } from "react-bootstrap";

import useSpinner from "../Hooks/useSpinner";
import useAlert from "../Hooks/useAlert";
import useFlag from "../Hooks/useFlag";
import { AuthUrls } from "../Utils/authUrls";

const AddMemberForm = () => {
  const { startProgress, stopProgress } = useSpinner();
  const { createAlert } = useAlert();
  const { addMember } = useFlag();
  const { handleSubmit, register, errors, formState, reset } = useForm({
    mode: "onChange",
  });
  const { id } = useParams();
  const addNewMemberURl = AuthUrls.ADD_MEMBER_USER_GROUP + id + "/";

  const addNewMember = async (data) => {
    startProgress();
    console.log(data);
    console.log(data.username);
    const requestData = {
      id: id,
      username: data.username,
    };
    console.log(requestData);

    try {
      const response = await axios.post(addNewMemberURl, requestData);
      console.log(response);
      addMember();
      createAlert({
        message: "ユーザーをグループに追加しました",
        type: "success",
      });
    } catch (error) {
      console.log(error);
      console.log(error.response);
      createAlert({
        message: "ユーザーをグループに追加できませんでした",
        type: "danger",
      });
    } finally {
      stopProgress();
    }
  };

  const onSubmit = async (data) => {
    addNewMember(data);
    reset();
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="justify-content-center">
      {/* add Task input */}
      <Form.Group controlId={"username"}>
        <Form.Control
          name={"username"}
          placeholder={"グループに追加したいユーザーを入力"}
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

      <Form.Group>
        <ButtonToolbar className="justify-content-center">
          <Button
            className="mr-2"
            variant={"primary"}
            type="submit"
            disabled={formState.isSubmitting}
          >
            Add Member
          </Button>
          <Button variant={"secondary"} type="button" onClick={reset}>
            Clear
          </Button>
        </ButtonToolbar>
      </Form.Group>
    </Form>
  );
};

export default AddMemberForm;
