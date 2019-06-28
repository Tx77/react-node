import React, { Component } from "react";
import { Form, Input, Button, Checkbox, Icon, Message } from "antd";
import "./index.jsx";
import md5 from "js-md5";
import axios from "axios";

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    xs: { span: 6 },
    sm: { span: 6 }
  },
  wrapperCol: {
    xs: { span: 18 },
    sm: { span: 18 }
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

class RegisterForm extends Component {
  constructor() {
    super();
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let bodyParams = Object.assign({}, values);
        bodyParams.password = md5(bodyParams.password).toUpperCase();
        delete bodyParams.confirmPassword;
        axios({
          method: "POST",
          url: "/api/user/register",
          data: bodyParams
        }).then(res => {
          let resData = res.data;
          if (resData.apiStatus === 0 && resData.sysStatus === 0) {
            Message.success(resData.info);
            this.props.history.push("/login");
          } else {
            Message.error(resData.info);
          }
        });
      }
    });
  };

  /**
   * 验证再次输入密码与密码是否匹配
   * @param rule
   * @param value
   * @param callback
   */
  checkConfirmPassword = (rule, value, callback) => {
    let form = this.props.form;
    if (value && value !== form.getFieldValue("password")) {
      callback("请与第一次的密码保持一致");
    } else {
      callback();
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="wrap-login-box box-shadow">
        <Form
          {...formItemLayout}
          onSubmit={this.handleSubmit}
          style={{
            width: "90%",
            margin: "50px auto"
          }}
        >
          <FormItem label="用户名：" colon={false}>
            {getFieldDecorator("username", {
              rules: [{ required: true, message: "请输入用户名" }]
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

          <FormItem label="密码：" colon={false}>
            {getFieldDecorator("password", {
              rules: [{ required: true, message: "请输入密码" }]
            })(
              <Input.Password
                size="large"
                prefix={
                  <Icon type="form" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="请输入密码"
              />
            )}
          </FormItem>

          <FormItem label="确认密码：" colon={false}>
            {getFieldDecorator("confirmPassword", {
              rules: [
                { required: true, message: "请再次输入密码" },
                { validator: this.checkConfirmPassword }
              ],
              validateTrigger: "onBlur"
            })(
              <Input.Password
                size="large"
                prefix={
                  <Icon type="copy" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="请输入密码"
              />
            )}
          </FormItem>

          <FormItem label=" " colon={false}>
            <Button
              size="large"
              type="primary"
              htmlType="submit"
              className="w100-percent"
            >
              注 册
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const Register = Form.create()(RegisterForm);

export default Register;
