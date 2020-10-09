import React from "react";
import axios from "axios";

import { useForm } from "react-hook-form";
import { Form, Button, ButtonToolbar } from "react-bootstrap";
// import { useDispatch } from 'react-redux';
import { AuthUrls } from "../utils/authUrls";


import useAuth from '../hooks/useAuth';


const LogoutForm = () => {

    const { handleSubmit } = useForm();
    const { logoutUser } = useAuth();

    const logoutUrl = AuthUrls.LOGOUT;

    const onSubmit = async() => {
        await axios.post(logoutUrl);
        logoutUser();
    }


    return (
        <div >
            <h1>Welcome to this wonderful site.</h1>

            <Form noValidate onSubmit={handleSubmit(onSubmit)} className="justify-content-center">
                <Form.Group>
                    <ButtonToolbar className="justify-content-center">
                        <Button variant={"primary"} type="submit" > ログアウト </Button>
                    </ButtonToolbar>
                </Form.Group>
            </Form>
        </div>
    );
};

export default LogoutForm;

