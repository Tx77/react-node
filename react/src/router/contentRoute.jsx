import React, { Component } from "react";
import { Router, Route, Link, Redirect, Switch } from "react-router-dom";
import GoodsManagement from "./goodsManagement/goodsManagement.jsx";
import blank from "components/blank.jsx";

export default class ContentRoute extends Component {
  render() {
    return (
      <div>
        <GoodsManagement />
        <Route path="/home/supplySystem/:supplyId" component={blank} />
      </div>
    );
  }
}
