import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Link, Router, Route, Switch } from "react-router-dom";
import { createHashHistory } from "history";
import TableList from "views/list";

const history = createHashHistory();

class NotFound extends Component {
  render() {
    return (
      <Router history={history}>
        <div>
          <h1>Not Found</h1>
          <Link to="/supplySystem/1/commodityManagement/classifyManagement">
            分类管理
          </Link>
          <Switch>
            <Route
              path="/supplySystem/1/commodityManagement/classifyManagement"
              component={TableList}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default NotFound;
