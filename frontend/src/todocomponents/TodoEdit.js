import React from "react";
import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import useSpinner from "../hooks/useSpinner";
import useFlag from "../hooks/useFlag";
import useTodo from "../hooks/useTodo";
import usePage from "../hooks/usePage";
import useAlert from "../hooks/useAlert";

import { useForm } from "react-hook-form";
import { Form, Button, ButtonToolbar, Modal } from "react-bootstrap";
import { TodoUrls } from "../utils/todoUrls";
// import useAlert from "../hooks/useAlert";

const TodoEdit = () => {
  const { id } = useParams();
  let history = useHistory();
  const { handleSubmit, register, errors, formState, reset } = useForm();
  const { taskListChange } = useFlag();
  const { startProgress, stopProgress } = useSpinner();
  const { createAlert } = useAlert();

  const { getTaskList, resetTaskList, tasks } = useTodo();
  const { resetItem } = usePage();
  const getTaskUrl = TodoUrls.GET_TASK + id;
  const patchTaskUrl = TodoUrls.PATCH_TASK + id + '/';

  const pullTask = async () => {
    startProgress();
    resetTaskList();
    try {
      const response = await axios.get(getTaskUrl);
      console.log(response);
      console.log(response.data);
      getTaskList(response.data);
      resetItem();
    } catch (error) {
      console.log(error);
    } finally {
      stopProgress();
    }
  };

  const postNewTask = async (data) => {
    startProgress();
    console.log(data);
    try {
      const response = await axios.patch(patchTaskUrl, data);
      console.log(response);
      console.log(data);
      resetTaskList();
      createAlert({
        message: "タスクの編集に成功しました",
        type: "success",
      });
      history.push("/todo/top")

    } catch (error) {
      console.log(error);
      createAlert({
        message: "タスクの編集に失敗しました",
        type: "danger",
      });
    } finally {
      stopProgress();
    }
  };

  const onSubmit = async (data) => {
    postNewTask(data);
    reset();
  };

  const BackTop = () => {
    resetTaskList();
    history.push("/todo/top");
  };

  useEffect(() => {
    pullTask();
    // return pullTaskList;
  }, [taskListChange]);

  return (
    <div>
      <Modal.Dialog key={tasks.id}>
        <Modal.Header>
          <Modal.Title>以下のタスクを編集しますか？</Modal.Title>
        </Modal.Header>
        <Modal.Body>{tasks.task_name}</Modal.Body>
      </Modal.Dialog>

      <Form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="justify-content-center"
      >
        {/* add Task input */}
        <Form.Group controlId={"task_name"}>
          <Form.Control
            name={"task_name"}
            placeholder={"追加したいタスクを入力"}
            type={"text"}
            isInvalid={errors.task_name}
            ref={register({
              required: "タスク名は必須です",
              maxLength: {
                value: 255,
                message: "タスク名は255文字以内です",
              },
            })}
          />
          {errors.task_name && (
            <Form.Control.Feedback type="invalid">
              {errors.task_name.message}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group>
          <ButtonToolbar className="justify-content-center">
            <Button
              variant={"primary"}
              type="submit"
              disabled={formState.isSubmitting}
            >
              タスク編集
            </Button>
            <Button variant={"secondary"} type="button" onClick={reset}>
              クリア
            </Button>

            <Button
              variant="secondary"
              onClick={() => {
                BackTop();
              }}
            >
              Cancel
            </Button>
          </ButtonToolbar>
        </Form.Group>
      </Form>
    </div>
  );
};

export default TodoEdit;
