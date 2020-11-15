import React from "react";
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

import useSpinner from "../Hooks/useSpinner";
import useFlag from "../Hooks/useFlag";
import useTodo from "../Hooks/useTodo";
import usePage from "../Hooks/usePage";
import MyTimer from "../Components/Timer";

import { Form, Button, ButtonToolbar, Modal, Container } from "react-bootstrap";
import { TodoUrls } from "../Utils/todoUrls";

const TaskTimer = () => {
  const { id } = useParams();
  let history = useHistory();
  const { register, errors, watch } = useForm({ mode: "onChange" });

  // タイマー表示のオン・オフ
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // タイマーカウントのセットに関するHooks
  const [count, setCount] = useState(5);
  const time = new Date();
  time.setSeconds(time.getSeconds() + count * 60);
  const timerSet = () => {
    // e.preventDefault();
    time.setSeconds(time.getSeconds() + count * 60);
  };

  const watchCount = watch("countValue");

  const { taskListChange } = useFlag();
  const { startProgress, stopProgress } = useSpinner();
  const { getTaskList, resetTaskList, tasks } = useTodo();
  const { resetItem } = usePage();

  const getTaskUrl = TodoUrls.GET_TASK + id;

  const pullTask = async () => {
    startProgress();
    resetTaskList();

    try {
      const response = await axios.get(getTaskUrl);
      getTaskList(response.data);
      resetItem();
    } catch (error) {
    } finally {
      stopProgress();
    }
  };

  // inputタグのクリックイベント無効
  const handleClick = (e) => {
    e.preventDefault();
  };
  // Submit無効
  const preventSubmit = (e) => {
    e.preventDefault();
  };

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
      <Container style={{ padding: 15 }}>
        <Modal.Dialog size="lg" key={tasks.id}>
          <Modal.Header>
            <Modal.Title>
              {tasks.task_name}にタイマーをセットしますか？
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <li>{tasks.task_detail}</li>
            <br />
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
                setCount(e.target.value);
                timerSet();
              }}
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
                <label>タイマーを</label>{watchCount}分に設定します
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
              handleShow();
            }}
          >
            Timer Start
          </Button>
        </ButtonToolbar>
        <div style={{ textAlign: "center" }}>
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>
                {tasks.task_name}にタイマーを設定しました
              </Modal.Title>
            </Modal.Header>
            <MyTimer expiryTimestamp={time} />
          </Modal>
        </div>
      </Container>
    </div>
  );
};

export default TaskTimer;
