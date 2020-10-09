import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// import RequireAuth from "./auth/RequireAuth";
import Landing from "./usercomponents2/Landing";
// import LoginForm from "./test";
import LoginFormContainer from "./usercomponents2/LoginFormContainer";
import Logout from "./usercomponents2/LogoutForm";
// import Signup from "./auth/Signup";
// import SignupDone from "./auth/SignupDone";
// import AccountActivation from "./auth/AccountActivation";
// import UserProfile from "./auth/UserProfile";
// import UserProfileEdit from "./auth/UserProfileEdit";
// import PasswordChange from "./auth/PasswordChange";
// import PasswordReset from "./auth/PasswordReset";
// import PasswordResetDone from "./auth/PasswordResetDone";
// import PasswordResetConfirm from "./auth/PasswordResetConfirm";
// import NoMatch from "./NoMatch";
import LoginRoute from './usercomponents2/LoginRoute';
import LogoutRoute from './usercomponents2/LogoutRoute';
import todo from "./todocomponents/todo";
import PrivateRoute from './todocomponents/PrivateRoute';

const MainContent = () => (
    <div>
        <Switch>
            <Route path="/" exact><Landing /></Route>
            <LoginRoute path="/login"  component={LoginFormContainer}>
            </LoginRoute>
            <LogoutRoute path="/logout" component={Logout} />
            <PrivateRoute path="/todo/top" component={todo}>
            </PrivateRoute>
            <Redirect to="/" />
            {/* <Route path="/signup" component={Signup} />
      <Route path="/account/confirm-email/:key" component={AccountActivation} />
      <Route path="/signup_done" component={SignupDone} />
      <Route path="/reset_password" component={PasswordReset} />
      <Route path="/reset_password_done" component={PasswordResetDone} />
      <Route path="/reset/:uid/:token/" component={PasswordResetConfirm} />
      <Route path="/profile" component={RequireAuth(UserProfile)} />
      <Route path="/profile_edit" component={RequireAuth(UserProfileEdit)} />
      <Route path="/change_password" component={RequireAuth(PasswordChange)} />
      <Route component={NoMatch} /> */}
        </Switch>
    </div>
);

export default MainContent;
