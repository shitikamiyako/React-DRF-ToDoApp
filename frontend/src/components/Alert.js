// BackgroundModalとスピナーのレンダリング部分

import React from 'react';
import useAlert from '../Hooks/useAlert';
import { Alert } from 'react-bootstrap';
// import { useDispatch } from 'react-redux';
// import { useCallback } from 'react';
import { useEffect, useState } from "react";

const AlertComponent = () => {
    const { alerts } = useAlert();
    const [alert, setAlert] = useState({ type: "", message: "" });
    const [open, setShow] = useState(false);


    useEffect(() => {
        if (alerts.length > 0) {
            setAlert(alerts[alerts.length - 1]);
            setShow(true);
            setTimeout(() => {
                setShow(false);
            }, 3000);
        }
    }, [alerts]);

    const onClose = () => {
        setShow(false);
    };



    return (
        <Alert show={open} variant={alert.type} onClose={onClose} dismissible>
            <Alert.Heading>{alert.message}</Alert.Heading>
        </Alert>
    );
};

export default AlertComponent;