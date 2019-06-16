import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Link, withRouter } from "react-router-dom";
import { createHashHistory } from "history";
import PropTypes from "prop-types";
import { Menu } from "antd";
const SubMenu = Menu.SubMenu;
const history = createHashHistory();

class SideBar extends Component {
  rootSubmenuKeys = [];

  constructor(props) {
    super(props);
    this.state = {
      menu: props.menu,
      selectedKeys: [props.history.location.pathname],
      openKeys: []
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState(
      {
        menu: nextProps.menu
      },
      () => {
        let pathname = this.props.history.location.pathname;
        let flag = true;
        this.props.menu.map(item => {
          if (!flag) {
            return;
          }
          if (item.childResourcesEntityList.length > 0) {
            item.childResourcesEntityList.map(childItem => {
              if (childItem.resourcesUrl === pathname) {
                flag = false;
                this.setState({
                  selectedKeys: [childItem.resourcesUrl],
                  openKeys: [item.id + ""]
                });
              }
            });
          } else {
            if (item.resourcesUrl === pathname) {
              flag = false;
              this.setState({
                selectedKeys: [item.resourcesUrl]
              });
            }
          }
        });
      }
    );
  }

  renderSubMenuItem = itemList => {
    const subMenuItemList = [];
    itemList.map(item => {
      subMenuItemList.push(
        <Menu.Item key={item.resourcesUrl}>
          <Link to={item.resourcesUrl}>{item.resourcesName}</Link>
        </Menu.Item>
      );
    });
    return subMenuItemList;
  };

  subMenuSelected({ item, key, selectedKeys }) {
    this.setState({
      selectedKeys: selectedKeys
    });
  }

  subMenuOpenChange(openKeys) {
    this.setState({
      openKeys: openKeys
    });
  }

  render() {
    const subMenuList = [];
    this.state.menu.map(item => {
      if (item.childResourcesEntityList.length > 0) {
        subMenuList.push(
          <SubMenu key={item.id} title={item.resourcesName}>
            {this.renderSubMenuItem(item.childResourcesEntityList)}
          </SubMenu>
        );
      } else {
        subMenuList.push(
          <Menu.Item key={item.resourcesUrl}>
            <Link to={item.resourcesUrl}>{item.resourcesName}</Link>
          </Menu.Item>
        );
      }
    });
    return (
      <Menu
        mode="inline"
        theme="dark"
        openKeys={this.state.openKeys}
        selectedKeys={this.state.selectedKeys}
        onSelect={this.subMenuSelected.bind(this)}
        onOpenChange={this.subMenuOpenChange.bind(this)}
      >
        {subMenuList}
      </Menu>
    );
  }
}

export default withRouter(SideBar);
