import React, { Component } from "react";
import { Router, Route, Link, Redirect, Switch } from "react-router-dom";
import blank from "components/blank.jsx";
import goodsManagement from "./goodsManagement.js";

export default class GoodsManagement extends Component {
  render() {
    const renderChildRoute = [];
    goodsManagement.map(item => {
      renderChildRoute.push(
        <Route key={item.name} path={item.path} component={item.component} />
      );
    });
    renderChildRoute.unshift(<Route key="" path="" component={blank} />);
    return <div>{renderChildRoute}</div>;
  }
}
