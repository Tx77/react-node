import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Form, Button, Input, Select, Icon, Message, InputNumber } from "antd";
import "style/common.less";
import { FormItem, formItemLayout, Option } from "utils/constant/form.js";
import Axios from "axios";

class Modify extends Component {
  constructor() {
    super();
    this.state = {
      brandList: [],
      isDisabled: false
    };
  }

  componentWillMount() {
    this.loadBrandList();
  }

  /**
   * 加载品牌列表
   */
  loadBrandList() {
    Axios({
      url: "api/goods/getBrand",
      method: "GET"
    }).then(res => {
      let resData = res.data;
      if (resData.apiStatus === 0 && resData.sysStatus === 0) {
        this.setState({
          brandList: resData.data
        });
      } else {
        Message.error(resData.info);
      }
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      isDisabled: true
    });
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let bodyParams = Object.assign({}, values);
        Axios({
          url: "/api/goods/addGoods",
          method: "POST",
          data: bodyParams
        }).then(res => {
          console.log(res);
        });
      } else {
        this.setState({
          isDisabled: false
        });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    // 生成商品品牌Option列表
    let brandListDom = [];
    this.state.brandList.map(item => {
      brandListDom.push(
        <Option value={item.id} key={item.id}>
          {item.title}
        </Option>
      );
    });
    return (
      <div className="align-form box-shadow">
        <div className="pdh10">
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <FormItem label="商品名称">
              {getFieldDecorator("name", {
                rules: [{ required: true, message: "请输入商品名称" }],
                validateTrigger: "onBlur"
              })(<Input size="large" placeholder="请输入商品名称" />)}
            </FormItem>

            <FormItem label="商品品牌">
              {getFieldDecorator("brandId", {
                rules: [{ required: true, message: "请选择商品品牌" }],
                validateTrigger: "onChange"
              })(
                <Select placeholder="请选择商品品牌" size="large" allowClear>
                  {brandListDom}
                </Select>
              )}
            </FormItem>

            <FormItem label="市场价">
              {getFieldDecorator("marketPrice", {
                rules: [{ required: true, message: "请输入市场价" }],
                validateTrigger: "onChange",
                initialValue: ""
              })(
                <InputNumber
                  size="large"
                  formatter={value =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={value => value.replace(/\$\s?|(,*)/g, "")}
                />
              )}
            </FormItem>

            <FormItem label="商品售价">
              {getFieldDecorator("sellingPrice", {
                rules: [{ required: true, message: "请输入商品售价" }],
                validateTrigger: "onChange",
                initialValue: ""
              })(
                <InputNumber
                  size="large"
                  formatter={value =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={value => value.replace(/\$\s?|(,*)/g, "")}
                />
              )}
            </FormItem>
            <FormItem label=" " colon={false}>
              <Button size="large">取 消</Button>
              <Button
                size="large"
                type="primary"
                htmlType="submit"
                className="mgl20"
              >
                保 存
              </Button>
            </FormItem>
          </Form>
        </div>
      </div>
    );
  }
}

const GoodsModify = Form.create()(Modify);

export default withRouter(GoodsModify);
