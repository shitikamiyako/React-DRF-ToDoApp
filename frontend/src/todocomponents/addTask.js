import React from "react";
// import { useState } from "react";
import axios from "axios";
import moment from "moment";

import { useForm } from "react-hook-form";
import { Form, Button, ButtonToolbar } from "react-bootstrap";

import { TodoUrls } from "../Utils/todoUrls";
import useSpinner from "../Hooks/useSpinner";
import useAlert from "../Hooks/useAlert";
import useFlag from "../Hooks/useFlag";

moment.locale("ja");

const AddTask = () => {
  const { startProgress, stopProgress } = useSpinner();
  const { createAlert } = useAlert();
  const { addTask } = useFlag();
  const { handleSubmit, register, errors, formState, reset } = useForm();
  const add_taskUrl = TodoUrls.ADD_TASK;

  const postNewTask = async (data) => {
    startProgress();
    // 日付時刻ははMoment.jsを入れてそれでインスタンスを作って取得する
    let m = moment();
    let now = m;
    try {
      const response = await axios.post(add_taskUrl, {
        // owner:usernameプロパティ追加
        task_name: data.task_name,
        add_datetime: now,
        is_Completed: false,
      });
      addTask();
      createAlert({
        message: "タスクの追加に成功しました",
        type: "success",
      });
    } catch (error) {
      createAlert({
        message: "タスクの追加に失敗しました",
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

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="justify-content-center">
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
              value: 30,
              message: "タスク名は30文字以内です",
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
            className="mr-2"
            variant={"primary"}
            type="submit"
            // onClick={handleSubmit(onSubmit)}
            disabled={formState.isSubmitting}
          >
            Add Task
          </Button>
          <Button variant={"secondary"} type="button" onClick={reset}>
            Clear
          </Button>
        </ButtonToolbar>
      </Form.Group>
    </Form>
  );
};

export default AddTask;
