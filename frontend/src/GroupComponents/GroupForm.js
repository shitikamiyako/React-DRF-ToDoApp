import React from "react";
import axios from "axios";

// カスタムHooks
import useSpinner from "../Hooks/useSpinner";
import useFlag from "../Hooks/useFlag";
import useAlert from "../Hooks/useAlert";


import { useForm } from "react-hook-form";
import { Form, Button, ButtonToolbar } from "react-bootstrap";
import { AuthUrls } from "../Utils/authUrls";


const GroupForm = () => {

    const { handleSubmit, register, errors, formState, reset } = useForm({ mode: "onChange" });
    const { startProgress, stopProgress } = useSpinner();
    const { createAlert } = useAlert();
    const { addGroup } = useFlag();
    const addGroupUrl = AuthUrls.CREATE_USER_GROUP

    const postNewGroup = async (data) => {
        startProgress();
        try {
            const response = await axios.post(addGroupUrl, {
                group_name: data.group_name,
            });
            console.log(response);
            console.log(data)
            addGroup()
            createAlert({
                message: "グループの追加に成功しました",
                type: "success",
            });
        } catch (error) {
            console.log(error);
            createAlert({
                message: "グループの追加に失敗しました",
                type: "danger",
            });
        } finally {
            stopProgress();
        }
    };


    const onSubmit = async (data) => {
        postNewGroup(data)
        reset()
    };

    return (
        <Form
            onSubmit={handleSubmit(onSubmit)}
            className="justify-content-center"
        >
            {/* add Group input */}
            <Form.Group controlId={"group_name"}>
                <Form.Control
                    name={"group_name"}
                    placeholder={"グループ名を入力"}
                    type={"text"}
                    isInvalid={errors.group_name}
                    ref={register({
                        required: "グループ名は必須です",
                        maxLength: {
                            value: 30,
                            message: "グループ名は30文字以内です",
                        },
                    })}
                />
                {errors.group_name && (
                    <Form.Control.Feedback type="invalid">
                        {errors.group_name.message}
                    </Form.Control.Feedback>
                )}
            </Form.Group>

            <Form.Group>
                <ButtonToolbar className="justify-content-center">
                    <Button
                        className="mr-2"
                        variant={"primary"}
                        type="submit"
                        disabled={formState.isSubmitting}
                    >
                        Create Group
          </Button>
                    <Button variant={"secondary"} type="button" onClick={reset}>
                        Clear
          </Button>
                </ButtonToolbar>
            </Form.Group>
        </Form>
    );
};

export default GroupForm;
