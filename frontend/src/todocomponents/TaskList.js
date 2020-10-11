import React from "react";
import { useEffect } from "react";
import { LinkContainer } from 'react-router-bootstrap'
import _ from "lodash";
import axios from "axios";
import axiosCookieJarSupport from "axios-cookiejar-support";
import useTodo from "../hooks/useTodo";
import usePage from "../hooks/usePage";
import {
  Button,
  Pagination,
  Toast,
  Col,
  Row
} from "react-bootstrap";
import { TodoUrls } from "../utils/todoUrls";
import useSpinner from "../hooks/useSpinner";
import useFlag from "../hooks/useFlag";

axios.defaults.withCredentials = true;

axiosCookieJarSupport(axios);

const TaskList = () => {
  const { getTaskList, resetTaskList, tasks } = useTodo();
  const {
    get_pageNationNext,
    get_pageNationPrevious,
    get_pageNationLastNumber,
    get_pageNationCurrent,
    get_contentsAllCount,
    pageNationNext,
    pageNationPrevious,
    pageNationLastNumber,
    pageNationCurrent,
  } = usePage();
  const { taskListChange, TaskListChangeReset } = useFlag();
  const { startProgress, stopProgress } = useSpinner();
  let get_task_listUrl = null;

  const pullTaskList = async () => {
    startProgress();
    resetTaskList();

    if (get_task_listUrl === null) {
      get_task_listUrl = TodoUrls.GET_TASK_LIST;
    }

    try {
      const response = await axios.get(get_task_listUrl);
      console.log(response);
      // ペジネーション関係の情報をstateに格納
      get_pageNationNext(response.data.next);
      get_pageNationPrevious(response.data.previous);
      get_pageNationLastNumber(response.data.total_pages);
      get_pageNationCurrent(response.data.current_page);
      get_contentsAllCount(response.data.count);
      // ペジネーションの関係でr.dataのリザルトプロパティから期待するdataを返してもらう
      const responseMap = response.data.results.map((obj) => {
        return obj;
      });
      const TaskList = _.mapKeys(responseMap, "id");
      // const TaskList = responseMap
      console.log(responseMap);
      console.log(TaskList);
      getTaskList(TaskList);
    } catch (error) {
      console.log(error);
    } finally {
      stopProgress();
    }
  };

  console.log(Object.values(tasks));
  console.log(tasks);

  const taskList = Object.values(tasks);

  console.log(taskList.length);

  // ペジネーション
  let CurrentPage = pageNationCurrent;



  // useEffect
  useEffect(() => {
    pullTaskList(
      (get_task_listUrl = TodoUrls.GET_TASK_LIST_Last + pageNationCurrent)
    );
    TaskListChangeReset();
    // return pullTaskList;
  }, [taskListChange]);

  return (
    <div>
      <Row className="taskList">
        {taskList.map((task) => (
          <Col xs={12} sm={12} md={6} key={task.id}  >
            <Toast className="justify-content-center mb-3">
              <Toast.Header closeButton={false}>
                <strong className="mr-auto">{task.task_name}</strong>
                <br/>
                <small>{task.add_datetime}</small>
              </Toast.Header>
              <Toast.Body className="text-align-center">
                {task.task_detail}
                <br/>
                <br/>
                <div className="taskButton">
                  <LinkContainer to={`/todo/edit/${task.id}`}>
                    <Button variant="success"  className="mr-2">
                      Edit
                    </Button>
                  </LinkContainer>

                  <LinkContainer to={`/todo/delete/${task.id}`}>
                    <Button variant="danger">
                      Delete
                    </Button>
                  </LinkContainer>
                </div>
              </Toast.Body>
            </Toast>
          </Col>

        ))}
      </Row>

      <Pagination className="justify-content-center">
        <Pagination.First
          onClick={() => {
            pullTaskList((get_task_listUrl = TodoUrls.GET_TASK_LIST));
          }}
        />
        <Pagination.Prev
          onClick={() => {
            pullTaskList((get_task_listUrl = pageNationPrevious));
          }}
        />
        <Pagination.Item>{CurrentPage}</Pagination.Item>
        <Pagination.Next
          onClick={() => {
            pullTaskList((get_task_listUrl = pageNationNext));
          }}
        />
        <Pagination.Last
          onClick={() => {
            pullTaskList(
              (get_task_listUrl =
                TodoUrls.GET_TASK_LIST_Last + pageNationLastNumber)
            );
          }}
        />
      </Pagination>
    </div>
  );
};

export default TaskList;

