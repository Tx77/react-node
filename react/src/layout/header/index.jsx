import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PureRenderMixin from "react-addons-pure-render-mixin";
import { Menu, Icon, Button } from "antd";
import PropTypes from "prop-types";
import "./index.less";
import "style/common.less";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: props.menu,
      selectedKeys: [props.history.location.pathname],
      block: props.block
    };
  }

  componentWillReceiveProps = nextProps => {
    let sideBar = [];
    this.setState(
      {
        menu: nextProps.menu,
        block: nextProps.block
      },
      () => {
        this.props.menu.map(item => {
          if (
            this.props.history.location.pathname.indexOf(item.resourcesUrl) > -1
          ) {
            sideBar = item.childResourcesEntityList;
            this.setState({
              selectedKeys: [item.resourcesUrl],
              block: false
            });
          }
        });
        if (
          this.props.history.location.pathname !== "/" &&
          sideBar.length > 0 &&
          !this.state.block
        ) {
          this.props.getSideBar(sideBar);
        }
      }
    );
  };

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

  render() {
    return (
      <div className="header-container">
        <div className="app-logo" />
        <Menu
          onSelect={this.menuItemSelected.bind(this)}
          theme="dark"
          className="header-menu"
          selectedKeys={this.state.selectedKeys}
        >
          {this.renderHeaderMenuItem(this.state.menu)}
        </Menu>
      </div>
    );
  }
}

export default withRouter(Header);
