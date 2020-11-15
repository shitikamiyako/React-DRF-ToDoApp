import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import axios from "axios";

import useAuth from "../Hooks/useAuth";

import { Form, Button, ButtonToolbar } from "react-bootstrap";
import { AuthUrls } from "../Utils/authUrls";

const LogoutForm = () => {
  const history = useHistory()
  // React Hook Form
  const { handleSubmit } = useForm();
  const { logoutUser } = useAuth();

  const logoutUrl = AuthUrls.LOGOUT;

  const onSubmit = async () => {
    logoutUser();
    await axios.post(logoutUrl);
  };
  return (
    <div>
      <div className="justify-content-center text-center mt-5">
        <h3>ログアウトしますか？</h3>
      </div>

      <Form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="justify-content-center"
      >
        <Form.Group>
          <ButtonToolbar className="justify-content-center">
            <Button variant={"danger"} type="submit">
              Yes, Logout
            </Button>
          </ButtonToolbar>
        </Form.Group>
        <div className="logout-button">
          <Button variant="success" onClick={() => history.push(`/`)}>
            No, Go Back Home
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default LogoutForm;
