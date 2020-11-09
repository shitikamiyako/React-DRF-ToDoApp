import React from "react";
import { Route, Redirect } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const LoginRoute = ({ component: Component, ...rest }) => {
  const { authenticated } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};

export default LoginRoute;