import React from "react";
import axios from "axios";
import { useState } from "react";

import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";


import { Form, Button, ButtonToolbar } from "react-bootstrap";

import useSpinner from "../Hooks/useSpinner";
import useAlert from "../Hooks/useAlert";
import { AuthUrls } from "../Utils/authUrls";

const SearchUser = () => {
    const [user, setUser] = useState(false);
    const history = useHistory();
    const { startProgress, stopProgress } = useSpinner();
    const { createAlert } = useAlert();
    const { register, errors, formState, reset } = useForm({
        mode: "onChange",
    });
    let searchUserUrl = AuthUrls.GET_USER_LIST_SEARCH + user

    // inputタグのクリックイベント無効
    const handleClick = (e) => {
        e.preventDefault();
    }
    // Submit無効
    const preventSubmit = (e) => {
        e.preventDefault();
    }

    const Search_and_Go_UserTaskList = async () => {
        if(user !== false) {
            startProgress();
            const requestUrl = searchUserUrl + user
            try {
                const response = await axios.get(requestUrl);
                history.push(`/todo/list/${user}`)
                createAlert({
                    message: "該当するユーザーのタスクリストへ遷移しました",
                    type: "success",
                });
            } catch (error) {
                createAlert({
                    message: "ユーザーが存在しないか、ログイン有効期限切れです",
                    type: "danger",
                });
            } finally {
                stopProgress();
            }
        } else if(user === false) {
            return
        }
    };

    return (
        <Form onSubmit={preventSubmit} className="justify-content-center">
            {/* add Task input */}
            <Form.Group controlId={"username"}>
                <Form.Control
                    name={"username"}
                    placeholder={"検索したいユーザーを入力"}
                    type={"text"}
                    isInvalid={errors.username}
                    onChange={(e) => {
                        setUser(e.target.value)
                    }}
                    onClick={handleClick}
                    ref={register({
                        required: "ユーザー名は必須です",
                        maxLength: {
                            value: 30,
                            message: "ユーザー名は30文字以内です",
                        },
                    })}
                />
                {errors.username && (
                    <Form.Control.Feedback type="invalid">
                        {errors.username.message}
                    </Form.Control.Feedback>
                )}
            </Form.Group>

            <Form.Group>
                <ButtonToolbar className="justify-content-center">
                    <Button
                        className="mr-2"
                        variant={"primary"}
                        type="submit"
                        onClick={() => {
                            Search_and_Go_UserTaskList()
                        }}
                        disabled={formState.isSubmitting}
                    >
                        Go Task
          </Button>
                    <Button variant={"secondary"} type="button" onClick={reset}>
                        Clear
          </Button>
                </ButtonToolbar>
            </Form.Group>
        </Form>
    );
};

export default SearchUser;
