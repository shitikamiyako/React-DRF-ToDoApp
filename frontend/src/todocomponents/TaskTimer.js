import React from "react";
import { useState,useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import _, { initial } from "lodash";

import useSpinner from "../hooks/useSpinner";
import useFlag from "../hooks/useFlag";
import useTodo from "../hooks/useTodo";
import useCategory from "../hooks/useCategory";
import usePage from "../hooks/usePage";
import useAlert from "../hooks/useAlert";
import MyTimer from "../components/Timer";


import { Form, Button, ButtonToolbar, Modal } from "react-bootstrap";
import { TodoUrls } from "../utils/todoUrls";
// import useAlert from "../hooks/useAlert";
import ReactStars from "react-rating-stars-component";
import { counter } from "@fortawesome/fontawesome-svg-core";

const TaskTimer = () => {
  const { id } = useParams();
  let history = useHistory();
  const {
    handleSubmit,
    register,
    reset,
    errors,
    watch
  } = useForm({ mode: "onChange"});

  // タイマー表示のオン・オフ
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // タイマーカウントのセットに関するHooks
  const [count, setCount] = useState(5);
  const time = new Date();
  time.setSeconds(time.getSeconds() + count * 60);
  console.log(time)

  const timerSet = () => {
    // e.preventDefault();
    time.setSeconds(time.getSeconds() + count * 60);
    console.log(time)
  };


  console.log(count)
  const watchCount = watch("countValue");

  const { taskListChange } = useFlag();
  const { startProgress, stopProgress } = useSpinner();
  const { createAlert } = useAlert();
  const { getTaskList, resetTaskList, tasks } = useTodo();
  const { resetItem } = usePage();

  const getTaskUrl = TodoUrls.GET_TASK + id;


  const pullTask = async () => {
    startProgress();
    resetTaskList();

    try {
      const response = await axios.get(getTaskUrl);
      console.log(response);
      console.log(response.data);
      getTaskList(response.data);
      resetItem();
      console.log(response.data.rate);
    } catch (error) {
      console.log(error);
    } finally {
      stopProgress();
    }
  };

  // inputタグのクリックイベント無効
  const handleClick = (e) => {
    e.preventDefault();
    console.log('The link was clicked.');
  }
  // Submit無効
  const preventSubmit = (e) => {
    e.preventDefault();
    console.log('The link was clicked.');
  }

  // タスクリスト一覧へ戻る
  const BackTop = () => {
    resetTaskList();
    history.push("/todo/top");
  };


  useEffect(() => {
    pullTask();
  }, [taskListChange]);

  return (
    <div>
      <Modal.Dialog key={tasks.id}>
        <Modal.Header>
          <Modal.Title>以下のタスクにタイマーを設定しますか？</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <li>task_name: {tasks.task_name}</li>
          <li>task_detail: {tasks.task_detail}</li>
          <li>Category: {tasks.category}</li>
          <li>Rate:<ReactStars
            name="rate"
            count={5}
            size={24}
            edit={false}
            isHalf={true}
            value={tasks.rate}
            activeColor="#ffd700"
          /></li>
          <li>close_datetime: {tasks.close_datetime}</li>
        </Modal.Body>
      </Modal.Dialog>
      <Form
        noValidate
        onSubmit={preventSubmit}
        className="justify-content-center"
      >
        {/* time count input */}
        <Form.Group controlId={"countValue"}>
          <Form.Control
            name={"countValue"}
            placeholder="~180(分)までの数値を入力してください。デフォルトは5分です"
            type={"number"}
            as="input"
            onChange={(e) => {
              setCount(e.target.value)
              timerSet()
            } }
            onClick={handleClick}
            isInvalid={errors.countValue}
            min={1}
            ref={register({
              max: {
                value: 180,
                message: "設定できるのは3時間までです",
              },
              min: {
                value: 0,
                message: "無効な入力値です",
              },
            })}
          />
          {errors.countValue && (
            <Form.Control.Feedback type="invalid">
              {errors.countValue.message}
            </Form.Control.Feedback>
          )}

          {watchCount ? (
            <>
              <label>Watched Fields:</label>count: {watchCount}
            </>
          ) : (
              ""
            )}
        </Form.Group>
      </Form>
      <ButtonToolbar className="justify-content-center">
          <Button
          className="mr-4"
            variant="outline-secondary"
            onClick={() => {
              BackTop();
            }}
          >
            Cancel
        </Button>

          <Button
          variant="outline-primary"
            onClick={() => {
              handleShow()
            }}
          >
            Timer Start
        </Button>
      </ButtonToolbar>
      <div style={{ textAlign: 'center' }}>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>{tasks.task_name}にタイマーを設定しました</Modal.Title>
          </Modal.Header>
          <MyTimer expiryTimestamp={time} />
        </Modal>
      </div>

      {/* <MyTimer expiryTimeStamp={time} /> */}
    </div>
  );
};

export default TaskTimer;
