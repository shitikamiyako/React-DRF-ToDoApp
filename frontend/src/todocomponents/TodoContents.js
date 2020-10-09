import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Landing from "../usercomponents2/Landing";
import todo from "./todo";
// import NoMatch from "./NoMatch";
import PrivateRoute from './PrivateRoute';



const MainContent = () => (
    <div>
        <Switch>
            {/* <Route path="/" exact><Landing /></Route> */}
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
