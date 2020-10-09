import React from "react";
import { useEffect, useState } from "react";
import _ from 'lodash';
import axios from "axios";
import axiosCookieJarSupport from  'axios-cookiejar-support';
import useTodo from "../hooks/useTodo";

import singleTask from "./singleTask";
import { Button, ButtonToolbar } from "react-bootstrap";
import { TodoUrls } from "../utils/todoUrls";
// import { AuthUrls } from "../utils/authUrls";
import useSpinner from "../hooks/useSpinner";
import useFlag from "../hooks/useFlag";
// import useAuth from "../hooks/useAuth";
// import { refresh_Token, checkTokenVerify } from "./todo";

const get_task_listUrl = TodoUrls.GET_TASK_LIST;
// const token_verifyUrl = TodoUrls.TOKEN_VERIFY;
// const token_refreshUrl = TodoUrls.TOKEN_REFRESH;
// const logoutUrl = AuthUrls.LOGOUT;
axios.defaults.withCredentials = true;

axiosCookieJarSupport(axios);

const TaskList = () => {
  const { getTaskList, tasks} = useTodo();
  const { taskListChange, TaskListChangeReset } = useFlag();
  const { startProgress, stopProgress } = useSpinner();


  const pullTaskList = async () => {
    startProgress();

    try {
      const response = await axios.get(get_task_listUrl);
      console.log(response);
      // const TaskList = response.data
      const responseMap = response.data.map((obj) => {
        return obj;
      });
      const TaskList = _.mapKeys(responseMap, 'id')
      // const TaskList = responseMap
      console.log(responseMap)
      console.log(TaskList)
      getTaskList(TaskList);
    } catch (error) {
      console.log(error);
    } finally {
      stopProgress();
    }
  };

  console.log(Object.values(tasks))
  console.log(tasks)

  const taskList = Object.values(tasks)


    useEffect(() => {
      pullTaskList();
      TaskListChangeReset()
      return pullTaskList;
    }, [taskListChange])


  return (
    <div>
      {taskList.map((task) => (
        <li key={task.id}>
          { task.task_name}
        </li>
      ))}
    </div>
  );
};

export default TaskList;
