import React from "react";
import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import useSpinner from "../Hooks/useSpinner";
import useFlag from "../Hooks/useFlag";
import useTodo from "../Hooks/useTodo";
import usePage from "../Hooks/usePage";

import { Modal, Button } from "react-bootstrap";
import { TodoUrls } from "../Utils/todoUrls";
// import useAlert from "../hooks/useAlert";

const TodoDelete = () => {
  const { id } = useParams();
  let history = useHistory();
  console.log(history);
  const { taskListChange } = useFlag();
  const { startProgress, stopProgress } = useSpinner();
  const { getTaskList, resetTaskList, tasks } = useTodo();
  const { resetItem } = usePage();
  const getTaskUrl = TodoUrls.GET_TASK + id;
  const deleteTaskUrl = TodoUrls.PUT_TASK + id;

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

  const DeleteTask = async () => {
    startProgress();
    resetTaskList();

    try {
      const response = await axios.delete(deleteTaskUrl);
      console.log(response);
      history.push("/todo/top");
    } catch (error) {
      console.log(error);
    } finally {
      stopProgress();
    }
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
          <Modal.Title>以下のタスクを削除してよろしいですか？</Modal.Title>
        </Modal.Header>

        <Modal.Body>{tasks.task_name}</Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              BackTop();
            }}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              DeleteTask();
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
};

export default TodoDelete;
