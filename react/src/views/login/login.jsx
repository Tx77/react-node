import React, { Component } from "react";
import { Provider, connect } from "react-redux";
import { createStore } from "redux";
import systemReducer from "reduxFactory/reducers/setSystemConstant.js";
import { withRouter } from "react-router-dom";
import { Form, Input, Button, Checkbox, Icon, Message } from "antd";
import { formatRoute } from "react-router-named-routes";
import "./login.less";
import Axios from "axios";
import md5 from "js-md5";

const FormItem = Form.Item;
import { setUserName } from "reduxFactory/actions/systemConstant.js";
const store = createStore(systemReducer);

const formItemLayout = {
  labelCol: {
    xs: { span: 4 },
    sm: { span: 4 }
  },
  wrapperCol: {
    xs: { span: 20 },
    sm: { span: 20 }
  }
};

const tailFormItemLayout = {
  wrapperCol: {
    sm: {
      span: 20,
      offset: 4
    }
  }
};

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      username: ""
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let bodyParams = Object.assign({}, values);
        bodyParams.password = md5(bodyParams.password).toUpperCase();
        Axios({
          method: "POST",
          url: "/api/user/login",
          data: bodyParams
        }).then(res => {
          let resData = res.data;
          if (resData.apiStatus === 0 && resData.sysStatus === 0) {
            store.dispatch(setUserName(bodyParams.username));
            this.props.history.push("/home/supplySystem");
          } else {
            Message.error(resData.info);
          }
        });
      } else {
        console.log(err);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="wrap-login-box box-shadow">
        <Form
          onSubmit={this.handleSubmit}
          style={{
            width: "90%",
            margin: "50px auto"
          }}
        >
          <FormItem label="用户名" {...formItemLayout}>
            {getFieldDecorator("username", {
              rules: [{ required: true, message: "请输入用户名" }],
              validateTrigger: "onBlur"
            })(
              <Input
                size="large"
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="请输入用户名"
              />
            )}
          </FormItem>

          <FormItem label="密码" {...formItemLayout}>
            {getFieldDecorator("password", {
              rules: [{ required: true, message: "请输入密码" }],
              validateTrigger: "onBlur"
            })(
              <Input
                size="large"
                type="password"
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="请输入密码"
              />
            )}
          </FormItem>

          <FormItem {...tailFormItemLayout}>
            <Button
              size="large"
              type="primary"
              htmlType="submit"
              className="w100-percent"
            >
              登 录
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const Login = Form.create()(LoginForm);

export default Login;
