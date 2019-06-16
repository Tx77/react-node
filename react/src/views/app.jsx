import React, { Component } from "react";
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import axios from "axios";
import { Layout } from "antd";
const { Header, Sider, Content, Footer } = Layout;

import HeadBar from "layout/header/index.jsx";
import SideBar from "layout/sideBar/index.jsx";
import ContentRoute from "router/contentRoute.jsx";

import routerList from '../routerList.js';

import "style/app.less";

class App extends Component {
  constructor() {
    super();
    this.state = {
      menu: [],
      sideBar: [],
      block: false
    };
  }

  componentWillMount() {
    // axios.get("http://localhost:7070/src/data.json").then(res => {
    //   this.setState({ menu: res.data });
    // });
    this.setState({ menu: routerList });
  }

  getSideBar(sideBarList) {
    this.setState({
      sideBar: sideBarList,
      block: true
    });
  }

  render() {
    return (
      <Layout>
        <div className="home-container">
          <Header className="container-header" style={{ padding: 0 }}>
            <HeadBar
              menu={this.state.menu}
              getSideBar={this.getSideBar.bind(this)}
              block={this.state.block}
            />
          </Header>
          <Layout style={{ width: 100 + "%", height: 100 + "%" }}>
            <Sider className="container-aside">
              <SideBar menu={this.state.sideBar} />
            </Sider>
            <Content className="container-main">
              <Router>
                <Switch>
                  <ContentRoute />
                  <Redirect to="/login" />
                </Switch>
              </Router>
            </Content>
          </Layout>
        </div>
      </Layout>
    );
  }
}

export default App;
