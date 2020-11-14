import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

import useAuth from "../Hooks/useAuth";

import { Form, Button, ButtonToolbar } from "react-bootstrap";
import { AuthUrls } from "../Utils/authUrls";

const LogoutForm = () => {
  // React Hook Form
  const { handleSubmit } = useForm();
  const { logoutUser } = useAuth();

  const logoutUrl = AuthUrls.LOGOUT;

  const onSubmit = async () => {
    await axios.post(logoutUrl);
    logoutUser();
  };
  return (
    <div>
      <div className="justify-content-center text-center mt-5">
        <h3>Would you like to log out?</h3>
      </div>

      <Form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="justify-content-center"
      >
        <Form.Group>
          <ButtonToolbar className="justify-content-center">
            <Button variant={"danger"} type="submit">
              Logout
            </Button>
          </ButtonToolbar>
        </Form.Group>
      </Form>
    </div>
  );
};

export default LogoutForm;
