import React from "react";
// import { useState } from "react";
import axios from "axios";
import moment from 'moment';

import { useForm } from "react-hook-form";
import { Form, Button, ButtonToolbar } from "react-bootstrap";

import { TodoUrls } from "../utils/todoUrls";
import useSpinner from "../hooks/useSpinner";
import useAlert from "../hooks/useAlert";
import useFlag from "../hooks/useFlag";

moment.locale('ja')

const add_taskUrl = TodoUrls.ADD_TASK;
// moment test
let m = moment()
console.log(m.format("YYYY-MM-DD hh:mm"))

const AddTask = () => {
  const { startProgress, stopProgress } = useSpinner();
  const { createAlert } = useAlert();
  const { addTask} = useFlag();
  const { handleSubmit, register, errors, formState, reset } = useForm();

  const postNewTask = async (data) => {
    startProgress();
    console.log(data)
    // 日付時刻ははMoment.jsを入れてそれでインスタンスを作って取得する
    let m = moment()
    let now = m
    try {
      const response = await axios.post(add_taskUrl, {
        // owner:usernameプロパティ追加
        task_name: data.task_name,
        add_datetime: now,
        is_Completed: false,
      });
      console.log(response);
      console.log(data)
      addTask()
      createAlert({
        message: "タスクの追加に成功しました",
        type: "success",
      });
    } catch (error) {
      console.log(error);
      createAlert({
        message: "タスクの追加に失敗しました",
        type: "danger",
      });
    } finally {
      stopProgress();
    }
  };


  const onSubmit = async (data) => {
    postNewTask(data)
    reset()
  };


  return (
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
            タスク追加
          </Button>
          <Button variant={"secondary"} type="button" onClick={reset}>
            クリア
          </Button>
        </ButtonToolbar>
      </Form.Group>
    </Form>
  );
};

export default AddTask;
