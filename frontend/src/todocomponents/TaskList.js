// ライブラリなどのインポート
import React from "react";
import { useEffect } from "react";
// import { LinkContainer } from "react-router-bootstrap";
import { useHistory } from "react-router-dom";
import _ from "lodash";
import axios from "axios";
import axiosCookieJarSupport from "axios-cookiejar-support";

// カスタムHooks
import useTodo from "../hooks/useTodo";
import usePage from "../hooks/usePage";
import useCategory from "../hooks/useCategory";
import useSpinner from "../hooks/useSpinner";
import useFlag from "../hooks/useFlag";
import useFilter from "../hooks/useFilter";
// import useFilter from "../hooks/useFilter";

// その他インポート
import { TodoUrls } from "../utils/todoUrls";
// react-bootstrap
import {
  Button,
  DropdownButton,
  Pagination,
  Toast,
  Col,
  Row,
  Dropdown,
} from "react-bootstrap";

axios.defaults.withCredentials = true;

axiosCookieJarSupport(axios);

const TaskList = () => {
  // タスクに関するHooks
  const { getTaskList, resetTaskList, tasks } = useTodo();
  // ページネーションに関するHooks
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
  // 変更などのフラグに関するHooks
  const {
    taskListChange,
    // category_filter_apply,
    // is_Completed_filter_apply,
    TaskListChangeReset,
    Apply_Category_filter,
    Apply_is_Completed_filter,
    Unfiltered,
  } = useFlag();
  // スピナーに関するHooks
  const { startProgress, stopProgress } = useSpinner();
  // カテゴリーに関するHooks
  const { getCategoryList, resetCategoryList, category } = useCategory();
  // フィルターに関するHooks
  const { setAllTasks, all_tasks, resetTasks } = useFilter();
  // React Routerによるページ遷移のHooks。history.pushを使用可能にする
  const history = useHistory()
  // カテゴリーAPIへのGETリクエストURL
  const getCategoryListUrl = TodoUrls.GET_CATEGORY_LIST;
  // TodoAPIへのGETリクエストURL
  let get_task_listUrl = null;
    // resetTaskList();

  const pullTaskList = async () => {
    startProgress();
    resetTaskList();
    resetTasks();
    resetCategoryList();

    // 初回レンダー及び最初の10件を取得するためのURL
    if (get_task_listUrl === null) {
      get_task_listUrl = TodoUrls.GET_TASK_LIST;
    }

    // カテゴリー取得のリクエスト
    try {
      const response = await axios.get(getCategoryListUrl);
      console.log(response);
      console.log(response.data.results);
      const responseMap = response.data.results.map((obj) => {
        return obj;
      });
      const CategoryList = _.mapKeys(responseMap, "id");
      getCategoryList(CategoryList);
    } catch (error) {
      console.log(error);
    }

    // タスクリスト取得のリクエスト
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
      setAllTasks(TaskList);
    } catch (error) {
      console.log(error);
    } finally {
      stopProgress();
    }
  };

  console.log(Object.values(all_tasks));
  console.log(all_tasks);

  // stateに保存したタスクを整形

  // 取得してきたタスクリストのマスター
  let saveTaskList = Object.values(tasks);

  // 実際に描画に使うタスクリスト
  let taskList = Object.values(all_tasks);
  console.log(taskList);

  // カテゴリーリスト整形
  const categoryList = Object.values(category);

  // CategoryでのFilter処理
  const task_category_filter = (category_name) => {
    Unfiltered();
    Apply_Category_filter();
    resetTasks();
    const category_item = category_name;
    const filtered_tasks = saveTaskList.filter(
      (task) => task.category === category_item
    );
    setAllTasks(filtered_tasks);
  };

  // is_CompletedがTrueのタスクをFilterする
  const task_is_Completed_filter = () => {
    Unfiltered();
    Apply_is_Completed_filter();
    resetTasks();
    const filtered_tasks = saveTaskList.filter(
      (task) => task.is_Completed === true
    );
    setAllTasks(filtered_tasks);
  };

  // is_CompletedがFalseのタスクをFilterする
  const task_is_unCompleted_filter = () => {
    Apply_is_Completed_filter();
    resetTasks();
    const filtered_tasks = saveTaskList.filter(
      (task) => task.is_Completed === false
    );
    setAllTasks(filtered_tasks);
  };

  // Filterリセット
  const task_filter_reset = () => {
    Unfiltered();
    resetTasks();
    setAllTasks(saveTaskList);
  };

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
      <Row>
        <Col xs={6} sm={6} md={6}>
          <DropdownButton
            id="dropdown-item-button"
            title="Category Filter"
            variant="secondary"
            className="mb-2"
          >
            <Dropdown.ItemText>カテゴリーでフィルタリング</Dropdown.ItemText>
            <Dropdown.Divider />
            {categoryList.map((category) => (
              <Dropdown.Item
                as="button"
                key={category.id}
                onClick={() => {
                  task_category_filter(category.category);
                }}
              >
                {category.category}
              </Dropdown.Item>
            ))}
            <Dropdown.Divider />
            <Dropdown.Item
              as="button"
              onClick={() => {
                task_filter_reset();
              }}
            >
              フィルタリングを解除
            </Dropdown.Item>
          </DropdownButton>
        </Col>
        <Col xs={6} sm={6} md={6}>
          <DropdownButton
            id="dropdown-item-button"
            title="is_Completed Filter"
            variant="secondary"
            className="mb-2"
          >
            <Dropdown.ItemText>完了・未完了でフィルタリング</Dropdown.ItemText>
            <Dropdown.Divider />
            <Dropdown.Item
              as="button"
              onClick={() => {
                task_is_Completed_filter();
              }}
            >
              完了したタスクを表示
            </Dropdown.Item>
            <Dropdown.Item
              as="button"
              onClick={() => {
                task_is_unCompleted_filter();
              }}
            >
              未完了のタスクを表示
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item
              as="button"
              onClick={() => {
                task_filter_reset();
              }}
            >
              フィルタリングを解除
            </Dropdown.Item>
          </DropdownButton>
        </Col>
      </Row>

      <Row className="taskList">
        {taskList.map((task) => (
          <Col xs={12} sm={12} md={6} key={task.id}>
            <Toast className="justify-content-center mb-3">
              <Toast.Header closeButton={false}>
                <strong className="mr-auto">{task.task_name}</strong>
                <br />
                <small>{task.add_datetime}</small>
              </Toast.Header>
              <Toast.Body className="text-align-center">
                Category:{task.category}
                <br />
                task_detail:{task.task_detail}
                <br />
                <br />
                <div className="taskButton">
                  <Button variant="outline-success" className="mr-2" onClick={() => history.push(`/todo/edit/${task.id}`)}>
                    Edit
                  </Button>

                  <Button variant="outline-danger" className="mr-2" onClick={() => history.push(`/todo/delete/${task.id}`)}>Delete</Button>
                  <Button variant="outline-info" onClick={() => history.push(`/todo/timer/${task.id}`)}>Timer</Button>

                  {/* <LinkContainer to={`/todo/edit/${task.id}`}>
                    <Button variant="success" className="mr-2">
                      Edit
                    </Button>
                  </LinkContainer>

                  <LinkContainer to={`/todo/delete/${task.id}`}>
                    <Button variant="danger">Delete</Button>
                  </LinkContainer> */}
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
      <Button variant="success" className="mr-2" onClick={() => history.push(`/`)}>
        Go Back Top
      </Button>    </div>
  );
};

export default TaskList;
