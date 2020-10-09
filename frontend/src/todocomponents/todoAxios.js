import axios from "axios";
import Cookies from "js-cookie";
import useAlert from "../hooks/useAlert";
import useAuth from "../hooks/useAuth";
import useSpinner from "../hooks/useSpinner";
import { TodoUrls } from "../utils/todoUrls";
import useTodo from "../hooks/useTodo";

// var csrftoken = Cookies.get("csrftoken");
// console.log(csrftoken);
// axios.defaults.xsrfCookieName = "csrftoken";
// axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
// axios.defaults.withCredentials = true;

const get_task_listUrl = TodoUrls.GET_TASK_LIST;
const add_taskUrl = TodoUrls.ADD_TASK;
const token_verifyUrl = TodoUrls.TOKEN_VERIFY;
const token_refreshUrl = TodoUrls.TOKEN_REFRESH;
const logoutUrl = AuthUrls.LOGOUT;
const { getTaskList } = useTodo();
const { createAlert } = useAlert();
const { logoutUser } = useAuth();
const { startProgress, stopProgress, progress } = useSpinner();

// 処理のブレインストーミングで書いてます

// Token Refresh
export const refresh_Token = async () => {
  try {
    const refresh_token_response = await axios.post(token_refreshUrl);
    return refresh_token_response;
  } catch (error) {
    console.log(error);
    await axios.post(logoutUrl);
    logoutUser();
    createAlert({
      message: "ログイン有効期限切れです、もう一度ログインしてください",
      type: "danger",
    });
  }
};

// Token Verify
export const checkTokenVerify = async () => {
  try {
    const check_token_response = await axios.post(token_verifyUrl);
    return check_token_response;
  } catch (error) {
    console.log(error.response.data);
    const check_token_response = await refresh_Token();
    return check_token_response;
  }
};

// Get TaskList
export const pullTaskList = async () => {
  startProgress();

  try {
    const response = await axios.get(get_task_listUrl);
    console.log(response);
    const TaskList = response.data.map((obj) => {
      return obj;
    });
    getTaskList(TaskList);
    createAlert({
      message: "タスクの一覧の取得に成功しました",
      type: "success",
    });
  } catch (error) {
    console.log(error.response.data);
    createAlert({
      message: "タスクの一覧の取得失敗しました",
      type: "danger",
    });
  } finally {
    stopProgress();
  }
};

// add Task
export const addTask = async (tasks) => {
  try {
    const response = await axios.post(add_taskUrl, {
      id: tasks.id,
      task_name: tasks.text,
      add_datetime: tasks.now,
      is_Completed: tasks.is_Completed

    });
    console.log(response)
    createAlert({
      message: "タスクの追加に成功しました",
      type: "success",
    });
  } catch (error) {
    console.log(error.response.data)
    createAlert({
      message: "タスクの追加に失敗しました",
      type: "danger",
    });
  } finally {
    stopProgress();
  }
}
