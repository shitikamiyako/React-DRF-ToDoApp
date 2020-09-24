import React from "react";
import { Switch, Route } from "react-router-dom";

const MainContent = () => {
  <div>
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/logout" component={Logout} />
      <Route path="/signup" component={Signup} />
    </Switch>
  </div>;
};

export default MainContent;