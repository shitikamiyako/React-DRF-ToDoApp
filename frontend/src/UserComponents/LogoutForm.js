import React from "react";
import axios from "axios";

import { useForm } from "react-hook-form";
import { Form, Button, ButtonToolbar } from "react-bootstrap";
// import { useDispatch } from 'react-redux';
import { AuthUrls } from "../Utils/authUrls";


import useAuth from '../Hooks/useAuth';


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
            <div className="justify-content-center text-center">
                <h1>Are you sure you want to sign out?</h1>
            </div>

            <Form noValidate onSubmit={handleSubmit(onSubmit)} className="justify-content-center">
                <Form.Group>
                    <ButtonToolbar className="justify-content-center">
                        <Button variant={"danger"} type="submit" > Logout </Button>
                    </ButtonToolbar>
                </Form.Group>
            </Form>
        </div>
    );
};

export default LogoutForm;

