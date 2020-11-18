import React from "react";
import { Route, Redirect } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { authenticated } = useAuth();
    return (
        <Route
            {...rest}
            render={(props) =>
                authenticated ? <Component {...props} /> : <Redirect to="/" />
            }
        />
    );
};

export default PrivateRoute;