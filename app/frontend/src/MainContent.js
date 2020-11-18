import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// カスタムルーティング
import PrivateRoute from "./Route/PrivateRoute";
import LoginRoute from "./Route/LoginRoute";
import LogoutRoute from "./Route/LogoutRoute";
// ランディング
import TopPage from "./UserComponents/TopPage";
// ユーザーに関わるルーティング
import User from "./UserComponents/UserPage";
import ChangePassword from "./UserComponents/ChangePassword";
import Unsubscribe from "./UserComponents/Unsubscribe";
import Login from "./UserComponents/LoginFormContainer";
import Logout from "./UserComponents/LogoutForm";
import Register from "./UserComponents/RegisterFormLayout";
// グループに関わるルーティング
import Group from "./GroupComponents/Group";
import GroupJoined from "./GroupComponents/GroupJoined";
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
  <Switch>
    <Route path="/" exact>
      <TopPage />
    </Route>
    <LoginRoute path="/login" component={Login} />
    <LoginRoute path="/signup" component={Register} />
    <LogoutRoute path="/logout" component={Logout} />
    <PrivateRoute path="/todo/top" component={Todo} />
    <PrivateRoute path="/todo/list/:username" component={Todo_Public} />
    <PrivateRoute path="/todo/delete/:id" component={TodoDelete} />
    <PrivateRoute path="/todo/edit/:id" component={TodoEdit} />
    <PrivateRoute path="/todo/timer/:id" component={TaskTimer} />
    <PrivateRoute path="/user_info" component={User} />
    <PrivateRoute path="/password_change" component={ChangePassword} />
    <PrivateRoute path="/unsubscribe" component={Unsubscribe} />
    <PrivateRoute path="/user_group/top" component={Group} />
    <PrivateRoute path="/user_group/joined" component={GroupJoined} />
    <PrivateRoute path="/user_group/edit/:id" component={GroupEdit} />
    <PrivateRoute path="/user_group/list/:username" component={Group_Public} />
    <PrivateRoute
      path="/user_group/:id/members"
      component={Group_Detail_Public}
    />
    <Redirect to="/" />
  </Switch>
);

export default MainContent;
