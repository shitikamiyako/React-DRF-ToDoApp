import React from "react";
import { useState,useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import _ from "lodash";

import useSpinner from "../hooks/useSpinner";
import useFlag from "../hooks/useFlag";
import useTodo from "../hooks/useTodo";
import useCategory from "../hooks/useCategory";
import usePage from "../hooks/usePage";
import useAlert from "../hooks/useAlert";

import { useForm, Controller } from "react-hook-form";
import { Form, Button, ButtonToolbar, Modal } from "react-bootstrap";
import { TodoUrls } from "../utils/todoUrls";
// import useAlert from "../hooks/useAlert";
import ReactStars from "react-rating-stars-component";

const TodoEdit = () => {
  const { id } = useParams();
  let history = useHistory();
  // レーティングに使うHook
  const [currentValue, setCurrentValue] = useState(0);
  const {
    handleSubmit,
    register,
    errors,
    formState,
    reset,
    control,
  } = useForm();
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
  console.log(watchFields.category);
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

  console.log(getCategoryListUrl);
  console.log(deleteCategoryUrl);
  console.log(TodoUrls.GET_CATEGORY_LIST);
  console.log(category);

  const pullTask = async () => {
    startProgress();
    resetTaskList();
    resetCategoryList();

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
    } finally {
      stopProgress();
    }

    try {
      const response = await axios.get(getTaskUrl);
      console.log(response);
      console.log(response.data);
      getTaskList(response.data);
      resetItem();
      setCurrentValue(response.data.rate)
      console.log(response.data.rate);
    } catch (error) {
      console.log(error);
    } finally {
      stopProgress();
    }
  };

  const postNewTask = async (data) => {
    startProgress();
    console.log(data);
    try {
      const response = await axios.patch(patchTaskUrl, data);
      console.log(response);
      console.log(data);
      resetTaskList();
      createAlert({
        message: "タスクの編集に成功しました",
        type: "success",
      });
      history.push("/todo/top");
    } catch (error) {
      console.log(error);
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
    console.log(data);
    try {
      const response = await axios.post(addCategoryUrl, data);
      console.log(response);
      console.log(data);
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
      console.log(response);
      console.log(response.data.results);
      const responseMap = response.data.results.map((obj) => {
        return obj;
      });
      const CategoryList = _.mapKeys(responseMap, "id");
      getCategoryList(CategoryList);
    } catch (error) {
      console.log(error);
    } finally {
      stopProgress();
    }
  };

  const deleteCategory = async (data) => {
    startProgress();
    resetCategoryList();
    console.log(data);
    try {
      const response = await axios.delete(deleteCategoryUrl, data);
      console.log(response);
      console.log(data);
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
      console.log(response);
      console.log(response.data.results);
      const responseMap = response.data.results.map((obj) => {
        return obj;
      });
      const CategoryList = _.mapKeys(responseMap, "id");
      getCategoryList(CategoryList);
    } catch (error) {
      console.log(error);
    } finally {
      stopProgress();
    }
  };

  // カテゴリーリスト整形
  const categoryList = Object.values(category);
  console.log(categoryList);
  console.log(tasks.is_Completed);

  //

  // is_Completedの論理値によって描画を変更
  let is_Completed_checkbox = (
    <Form.Check
      type="checkbox"
      name={"is_Completed"}
      label="完了"
      ref={register}
    />
  );


  let is_Completed_column = <li>is_Completed: false</li>;


  if (tasks.is_Completed === true) {
    is_Completed_column = <li>is_Completed: true</li>;
    is_Completed_checkbox = (
      <Form.Check
        type="checkbox"
        name={"is_Completed"}
        label="完了"
        ref={register}
        defaultChecked
      />
    );

  }

  // レーティング
  const ratingChanged = (newRating) => {
    console.log(newRating);
    setCurrentValue(newRating)
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

  useEffect(() => {
    pullTask();
    // return resetTaskList();
  }, [taskListChange]);

  return (
    <div>
      <Modal.Dialog key={tasks.id}>
        <Modal.Header>
          <Modal.Title>以下のタスクを編集しますか？</Modal.Title>
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
          {is_Completed_column}
          <li>close_datetime: {tasks.close_datetime}</li>
        </Modal.Body>
      </Modal.Dialog>

      <Form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="justify-content-center"
      >
        {/* Patch Task input */}
        <Form.Group controlId={"task_name"}>
          <Form.Control
            name={"task_name"}
            placeholder={"修正したいタスクを入力"}
            defaultValue={tasks.task_name}
            type={"text"}
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
          <Form.Control
            name={"task_detail"}
            placeholder={"追加したい備考を入力"}
            defaultValue={tasks.task_detail}
            as="textarea"
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
          <Form.Label>カテゴリー</Form.Label>
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
        <Form.Group controlId={"rate"}>
          <ReactStars
            name="rate"
            count={5}
            onChange={ratingChanged}
            size={24}
            isHalf={true}
            activeColor="#ffd700"
          />
          <input type="text" name={"rate"} ref={register} onChange={ratingChanged} value={currentValue}/>
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
        className="justify-content-center"
      >
        {/* add category input */}
        <Form.Group controlId={"category"}>
          <Form.Control
            name={"category"}
            placeholder={"追加したいカテゴリーを入力"}
            type={"text"}
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
        className="justify-content-center"
      >
        {/* category select input */}
        <Form.Group controlId={"category"}>
          <Form.Label>カテゴリー</Form.Label>
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
    </div>
  );
};

export default TodoEdit;
