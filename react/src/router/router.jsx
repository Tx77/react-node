import React, { Component } from "react";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
// import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import App from "views/app";
import NotFound from "components/notFound";
import Login from "views/login/login";
import Register from "views/register/index";

class RoutesManager extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/home" component={App} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/404" component={NotFound} />
          <Redirect to="/home" />
        </Switch>
      </Router>
    );
  }
}

export default RoutesManager;
