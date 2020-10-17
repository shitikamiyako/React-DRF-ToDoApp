import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// import RequireAuth from "./auth/RequireAuth";
import Landing from "./usercomponents2/Landing";
// import LoginForm from "./test";
import Login from "./usercomponents2/LoginFormContainer";
import Logout from "./usercomponents2/LogoutForm";
import Register from "./usercomponents2/RegisterFormLayout"

import PrivateRoute from './Route/PrivateRoute';
import LoginRoute from './Route/LoginRoute';
import LogoutRoute from './Route/LogoutRoute';
import Todo from "./todocomponents/todo";
import TodoDelete from "./todocomponents/TodoDelete";
import TodoEdit from "./todocomponents/TodoEdit";

const MainContent = () => (
    <div>
        <Switch>
            <Route path="/" exact><Landing /></Route>
            <LoginRoute path="/login" component={Login} />
            <LoginRoute path="/signup" component={Register} />
            <LogoutRoute path="/logout" component={Logout} />
            <PrivateRoute path="/todo/top" component={Todo} />
            <PrivateRoute path="/todo/delete/:id" component={TodoDelete} />
            <PrivateRoute path="/todo/edit/:id" component={TodoEdit} />
            <Redirect to="/" />
        </Switch>
      {/* <Route path="/account/confirm-email/:key" component={AccountActivation} />
      <Route path="/signup_done" component={SignupDone} />
      <Route path="/reset_password" component={PasswordReset} />
      <Route path="/reset_password_done" component={PasswordResetDone} />
      <Route path="/reset/:uid/:token/" component={PasswordResetConfirm} />
      <Route path="/profile" component={RequireAuth(UserProfile)} />
      <Route path="/profile_edit" component={RequireAuth(UserProfileEdit)} />
      <Route path="/change_password" component={RequireAuth(PasswordChange)} />
      <Route component={NoMatch} /> */}
    </div>
);

export default MainContent;
