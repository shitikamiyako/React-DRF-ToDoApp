import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// カスタムルーティング
import PrivateRoute from './Route/PrivateRoute';
import LoginRoute from './Route/LoginRoute';
import LogoutRoute from './Route/LogoutRoute';
// ランディング
import TopPage from "./UserComponents/TopPage";
// ユーザーに関わるルーティング
import Login from "./UserComponents/LoginFormContainer";
import Logout from "./UserComponents/LogoutForm";
import Register from "./UserComponents/RegisterFormLayout"
// グループに関わるルーティング
import Group from "./GroupComponents/Group";
import GroupEdit from "./GroupComponents/GroupEdit";
import Group_Public from "./GroupComponents/GroupPublic";
import Group_Detail_Public from "./GroupComponents/GroupDetail_Readonly";
// Todoに関わるルーティング
import Todo from "./TodoComponents/todo";
import Todo_Public from "./TodoComponents/todo_Public";
import TodoDelete from "./TodoComponents/TodoDelete";
import TodoEdit from "./TodoComponents/TodoEdit";
import TaskTimer from "./TodoComponents/TaskTimer";

const MainContent = () => (
    <div>
        <Switch>
            <Route path="/" exact><TopPage /></Route>
            <LoginRoute path="/login" component={Login} />
            <LoginRoute path="/signup" component={Register} />
            <LogoutRoute path="/logout" component={Logout} />
            <PrivateRoute path="/todo/top" component={Todo} />
            <PrivateRoute path="/todo/list/:username" component={Todo_Public} />
            <PrivateRoute path="/todo/delete/:id" component={TodoDelete} />
            <PrivateRoute path="/todo/edit/:id" component={TodoEdit} />
            <PrivateRoute path="/todo/timer/:id" component={TaskTimer} />
            <PrivateRoute path="/user_group/top" component={Group} />
            <PrivateRoute path="/user_group/edit/:id" component={GroupEdit} />
            <PrivateRoute path="/user_group/list/:username" component={Group_Public} />
            <PrivateRoute path="/user_group/:id/members" component={Group_Detail_Public} />
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
