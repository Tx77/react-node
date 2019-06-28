import React, { Component } from "react";
import { Link, withRouter, Switch, Redirect } from "react-router-dom";
import { createStore } from "redux";
import systemReducer from "reduxFactory/reducers/setSystemConstant.js";
import PureRenderMixin from "react-addons-pure-render-mixin";
import { Menu, Icon, Button } from "antd";
import PropTypes from "prop-types";
import "./index.less";
import "style/common.less";
import homeIcon from "style/images/react-icon.png";

const store = createStore(systemReducer);

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: props.menu,
      selectedKeys: [props.history.location.pathname],
      block: props.block,
      redirect: false,
      currentLocation: ""
    };
  }

  componentWillMount() {
    let currentLocation = this.props.history.location.pathname;
    this.setState(
      {
        currentLocation: currentLocation
      },
      () => {
        if (this.state.currentLocation !== "") {
          this.state.menu.map(item => {
            if (this.state.currentLocation.indexOf(item.resourcesUrl) > -1) {
              this.setState({
                selectedKeys: [item.resourcesUrl]
              });
              this.props.getSideBar(item.childResourcesEntityList);
            }
          });
        }
      }
    );
  }

  componentDidMount() {
    // 监听路由变化
    this.props.history.listen(route => {
      let currentLocation = route.pathname;
      // console.log(currentLocation);
      let sideBar = [];
      this.props.menu.map(item => {
        if (currentLocation.indexOf(item.resourcesUrl) > -1) {
          sideBar = item.childResourcesEntityList;
          this.setState({
            selectedKeys: [item.resourcesUrl],
            block: false
          });
        }
        // 路由切换为根目录
        if (currentLocation === "/home") {
          sideBar = [];
          this.setState({
            selectedKeys: [""],
            block: false
          });
        }
      });
      if (!this.state.block) {
        this.props.getSideBar(sideBar);
      }
      console.log(store.getState());
      // if (currentLocation !== "/" && sideBar.length > 0 && !this.state.block) {
      //   this.props.getSideBar(sideBar);
      // }
    });
  }

  menuItemSelected({ item, key, selectedKeys }) {
    this.props.history.push(key);
    // this.state.selectedKeys = selectedKeys;
    this.state.menu.map(item => {
      if (item.resourcesUrl === key) {
        this.props.getSideBar(item.childResourcesEntityList);
      }
    });
  }

  renderHeaderMenuItem(menuItem) {
    const headerMenu = [];
    menuItem.map(item => {
      headerMenu.push(
        <Menu.Item key={item.resourcesUrl}>{item.resourcesName}</Menu.Item>
      );
    });
    return headerMenu;
  }

  linkToHomePage() {
    this.props.history.push("/home");
  }

  render() {
    return (
      <div className="header-container">
        <div className="app-logo">
          <img
            src={homeIcon}
            alt="home-icon"
            onClick={this.linkToHomePage.bind(this)}
          />
        </div>
        <Menu
          onSelect={this.menuItemSelected.bind(this)}
          theme="dark"
          className="header-menu"
          selectedKeys={this.state.selectedKeys}
        >
          {this.renderHeaderMenuItem(this.state.menu)}
        </Menu>
        <div className="user-config">
          <p>
            <Icon type="user" />
          </p>
        </div>
      </div>
    );
  }
}

export default withRouter(Header);
