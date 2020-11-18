import React from "react";
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import _ from "lodash";

import useSpinner from "../Hooks/useSpinner";
import useFlag from "../Hooks/useFlag";
import useTodo from "../Hooks/useTodo";
import useCategory from "../Hooks/useCategory";
import usePage from "../Hooks/usePage";
import useAlert from "../Hooks/useAlert";

import { useForm } from "react-hook-form";
import { Form, Button, ButtonToolbar, Modal, Container, Badge, Col } from "react-bootstrap";
import { TodoUrls } from "../Utils/todoUrls";
import ReactStars from "react-rating-stars-component";

const TodoEdit = () => {
  const { id } = useParams();
  let history = useHistory();
  // レーティングに使うHook
  const [currentValue, setCurrentValue] = useState(0);
  const { handleSubmit, register, errors, formState, reset } = useForm();
  const {
    handleSubmit: handleSubmit2,
    register: register2,
    errors: errors2,
    formState: formState2,
    reset: reset2,
  } = useForm();

  const {
    handleSubmit: handleSubmit3,
    register: register3,
    formState: formState3,
    watch,
  } = useForm();

  const watchFields = watch(["category"]);
  let categoryPk = watchFields.category;

  const { taskListChange } = useFlag();
  const { startProgress, stopProgress } = useSpinner();
  const { createAlert } = useAlert();

  const { getTaskList, resetTaskList, tasks } = useTodo();
  const { getCategoryList, resetCategoryList, category } = useCategory();
  const { resetItem } = usePage();
  const getTaskUrl = TodoUrls.GET_TASK + id;
  const patchTaskUrl = TodoUrls.PATCH_TASK + id + "/";
  const getCategoryListUrl = TodoUrls.GET_CATEGORY_LIST;
  const addCategoryUrl = TodoUrls.ADD_CATEGORY;
  const deleteCategoryUrl = TodoUrls.DELETE_CATEGORY + categoryPk + "/";

  const pullTask = async () => {
    startProgress();
    resetTaskList();
    resetCategoryList();

    try {
      const response = await axios.get(getCategoryListUrl);
      const responseMap = response.data.results.map((obj) => {
        return obj;
      });
      const CategoryList = _.mapKeys(responseMap, "id");
      getCategoryList(CategoryList);
    } catch (error) {
      createAlert({
        message: "カテゴリーの取得に失敗しました",
        type: "danger",
      });
    } finally {
      stopProgress();
    }

    try {
      const response = await axios.get(getTaskUrl);
      getTaskList(response.data);
      resetItem();
      setCurrentValue(response.data.rate);
    } catch (error) {
    } finally {
      stopProgress();
    }
  };

  const postNewTask = async (data) => {
    startProgress();
    try {
      const response = await axios.patch(patchTaskUrl, data);
      resetTaskList();
      createAlert({
        message: "タスクの編集に成功しました",
        type: "success",
      });
      history.push("/todo/top");
    } catch (error) {
      createAlert({
        message: "タスクの編集に失敗しました",
        type: "danger",
      });
    } finally {
      stopProgress();
    }
  };

  const addCategory = async (data) => {
    startProgress();
    resetCategoryList();
    try {
      const response = await axios.post(addCategoryUrl, data);
      createAlert({
        message: "カテゴリーの追加に成功しました",
        type: "success",
      });
    } catch (error) {
      createAlert({
        message: "カテゴリーの追加に失敗しました",
        type: "danger",
      });
    }

    try {
      const response = await axios.get(getCategoryListUrl);
      const responseMap = response.data.results.map((obj) => {
        return obj;
      });
      const CategoryList = _.mapKeys(responseMap, "id");
      getCategoryList(CategoryList);
    } catch (error) {
      createAlert({
        message: "カテゴリーの取得に失敗しました",
        type: "danger",
      });
    } finally {
      stopProgress();
    }
  };

  const deleteCategory = async (data) => {
    startProgress();
    resetCategoryList();
    try {
      const response = await axios.delete(deleteCategoryUrl, data);
      createAlert({
        message: "カテゴリーの削除に成功しました",
        type: "success",
      });
    } catch (error) {
      createAlert({
        message: "カテゴリーの削除に失敗しました",
        type: "danger",
      });
    }

    try {
      const response = await axios.get(getCategoryListUrl);
      const responseMap = response.data.results.map((obj) => {
        return obj;
      });
      const CategoryList = _.mapKeys(responseMap, "id");
      getCategoryList(CategoryList);
    } catch (error) {
      createAlert({
        message: "カテゴリーの取得に失敗しました",
        type: "danger",
      });
    } finally {
      stopProgress();
    }
  };

  // カテゴリーリスト整形
  const categoryList = Object.values(category);

  // is_Completedの論理値によって描画を変更
  let is_Completed_checkbox = (
    <Form.Check
      type="checkbox"
      name={"is_Completed"}
      label="チェックを入れると完了状態にできます"
      ref={register}
    />
  );

  let is_Completed_column = <li>タスクの状態: 未完</li>;

  if (tasks.is_Completed === true) {
    is_Completed_column = <li>タスクの状態: 完了</li>;
    is_Completed_checkbox = (
      <Form.Check
        type="checkbox"
        name={"is_Completed"}
        label="チェックを外すと未完状態になります"
        ref={register}
        defaultChecked
      />
    );
  }

  // レーティング
  const ratingChanged = (newRating) => {
    setCurrentValue(newRating);
  };

  // タスク編集のPatchリクエスト発火
  const onSubmit = async (data) => {
    postNewTask(data);
    reset();
  };

  // カテゴリー追加のPostリクエスト発火
  const onSubmit2 = async (data) => {
    addCategory(data);
    reset();
  };

  // カテゴリー削除のDeleteリクエスト発火
  const onSubmit3 = async (data) => {
    deleteCategory(data);
    reset();
  };

  // タスクリスト一覧へ戻る
  const BackTop = () => {
    resetTaskList();
    history.push("/todo/top");
  };

  // inputタグのクリックイベント無効
  const handleClick = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    pullTask();
  }, [taskListChange]);

  return (
    <div>
      <Container style={{ padding: 15 }}>
        <Modal.Dialog size="lg" key={tasks.id}>
          <Modal.Header>
            <Modal.Title>{tasks.task_name}を編集しますか？</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <li>{tasks.task_detail}</li>
            <br />
            <li>
              レーティング:
              <ReactStars
                name="rate"
                count={5}
                size={24}
                edit={false}
                isHalf={true}
                value={tasks.rate}
                activeColor="#ffd700"
              />
            </li>
            <br />
            Good: <Badge variant="info">{tasks.reaction_obj}</Badge>
          </Modal.Body>
          <Modal.Footer>
            <li>カテゴリー:</li>
            <li>{tasks.category}</li>
            {is_Completed_column}
            <li>完了日: {tasks.close_datetime}</li>
          </Modal.Footer>
        </Modal.Dialog>
        <Col sm={12} md={12} className="text-center mb-2">
          <h3 className="text-center mb-2 mt-3">Task Edit</h3>
          <strong>
            ＊変更したくない項目はフォームの内容を変更せずにボタンを押してください
          </strong>
        </Col>
        <Form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="justify-content-center text-center"
        >
          {/* Patch Task input */}
          <Form.Group controlId={"task_name"}>
            <Form.Label>タスク名</Form.Label>
            <Form.Control
              name={"task_name"}
              placeholder={"修正したいタスクを入力"}
              defaultValue={tasks.task_name}
              type={"text"}
              onClick={handleClick}
              isInvalid={errors.task_name}
              ref={register({
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

          {/* add Task_Detail textarea */}
          <Form.Group controlId={"task_detail"}>
            <Form.Label>タスク詳細</Form.Label>
            <Form.Control
              name={"task_detail"}
              placeholder={"追加したい備考を入力"}
              defaultValue={tasks.task_detail}
              as="textarea"
              onClick={handleClick}
              isInvalid={errors.task_detail}
              ref={register({
                maxLength: {
                  value: 140,
                  message: "追加できる備考は140文字以内です",
                },
              })}
            />
            {errors.task_detail && (
              <Form.Control.Feedback type="invalid">
                {errors.task_detail.message}
              </Form.Control.Feedback>
            )}
          </Form.Group>

          {/* category select input */}
          <Form.Group controlId={"category"}>
            <Form.Label>カテゴリーの変更</Form.Label>
            <Form.Control
              as="select"
              name={"category"}
              defaultValue={tasks.category}
              ref={register}
            >
              <option value={tasks.category}>選択してください</option>
              <optgroup label="カテゴリー一覧">
                {categoryList.map((category) => (
                  <option key={category.id} value={category.category}>
                    {category.category}
                  </option>
                ))}
              </optgroup>
            </Form.Control>
          </Form.Group>

          {/* is_Completed select checkbox */}
          <Form.Group controlId={"is_Completed"}>
            <input type="hidden" name={"is_Completed"} ref={register} />
            {is_Completed_checkbox}
          </Form.Group>

          {/* select rate input */}
          <Form.Group controlId={"rate"} className="justify-content-center">
            <Form.Label>レーティング</Form.Label>
            <div className="rating-edit">
              <ReactStars
                classNames="justify-content-center"
                name="rate"
                count={5}
                onChange={ratingChanged}
                size={24}
                isHalf={true}
                activeColor="#ffd700"
              />
            </div>
            <Form.Control
              className="mt-2 "
              type={"number"}
              name={"rate"}
              ref={register}
              onClick={handleClick}
              onChange={ratingChanged}
              value={currentValue}
            />
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

        <Form
          noValidate
          onSubmit={handleSubmit2(onSubmit2)}
          className="justify-content-center text-center mt-4"
        >
          {/* add category input */}
          <Form.Group controlId={"category"}>
            <Form.Label>カテゴリーを追加する</Form.Label>
            <Form.Control
              name={"category"}
              placeholder={"追加したいカテゴリーを入力"}
              type={"text"}
              onClick={handleClick}
              isInvalid={errors2.category}
              ref={register2({
                required: "カテゴリー名は必須です",
                maxLength: {
                  value: 30,
                  message: "カテゴリー名は30文字以内です",
                },
              })}
            />
            {errors2.category && (
              <Form.Control.Feedback type="invalid">
                {errors2.category.message}
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <Form.Group>
            <ButtonToolbar className="justify-content-center">
              <Button
                variant={"primary"}
                type="submit"
                disabled={formState2.isSubmitting}
              >
                カテゴリー追加
              </Button>
              <Button variant={"secondary"} type="button" onClick={reset2}>
                クリア
              </Button>
            </ButtonToolbar>
          </Form.Group>
        </Form>

        <Form
          noValidate
          onSubmit={handleSubmit3(onSubmit3)}
          className="justify-content-center text-center mt-4"
        >
          {/* category select input */}
          <Form.Group controlId={"category"}>
            <Form.Label>カテゴリーを削除する</Form.Label>
            <Form.Control
              as="select"
              name={"category"}
              defaultValue=""
              ref={register3}
            >
              <option>削除したいカテゴリーを選択...</option>
              {categoryList.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.category}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group>
            <ButtonToolbar className="justify-content-center">
              <Button
                variant={"danger"}
                type="submit"
                disabled={formState3.isSubmitting}
              >
                カテゴリー削除
              </Button>
            </ButtonToolbar>
          </Form.Group>
        </Form>
      </Container>
    </div>
  );
};

export default TodoEdit;
