import React from "react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useHistory } from "react-router-dom";

import useAuth from "../Hooks/useAuth";
import useAlert from "../Hooks/useAlert";

import { Form, Button, ButtonToolbar } from "react-bootstrap";
import { AuthUrls } from "../Utils/authUrls";

const Unsubscribe = () => {
  const [userId, setUserId] = useState();
  const history = useHistory();
  // React Hook Form
  const { handleSubmit } = useForm();

  const { createAlert } = useAlert();
  const { logoutUser } = useAuth();

  const get_userUrl = AuthUrls.GET_USER_DATA;
  const delete_userUrl = AuthUrls.DELETE_USER;

  const getUser = async () => {
    try {
      const response = await axios.get(get_userUrl);
      console.log(response.data.id);
      setUserId(response.data.id);
    } catch (error) {
      createAlert({
        message: "リクエストエラーです、ログアウトして再ログインしてください",
        type: "danger",
      });
    }
  };

  const onSubmit = async () => {
    try {
      const requestUrl = delete_userUrl + userId;
      await axios.delete(requestUrl);
      logoutUser();
      createAlert({
        message: "退会が完了しました、ご利用頂きありがとうございました。",
        type: "success",
      });
    } catch (error) {
      createAlert({
        message: "リクエストエラーです、ログアウトして再ログインしてください",
        type: "danger",
      });
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <div className="justify-content-center text-center mt-5 mb-3">
        <h3>本当に退会しますか？</h3>
      </div>

      <Form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="justify-content-center"
      >
        <Form.Group>
          <ButtonToolbar className="justify-content-center">
            <Button variant={"danger"} type="submit">
              Yes, Unsubscribe
            </Button>
          </ButtonToolbar>
        </Form.Group>
        <div className="unsubscribe-button">
          <Button variant="success" onClick={() => history.push(`/`)}>
            No, Go Back Home
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Unsubscribe;
