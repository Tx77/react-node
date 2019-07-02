import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import changeColor from "reduxFactory/reducers/changeColor.js";
import Header from "components/Header.jsx";
import Content from "components/Content.jsx";
import { Form, Row, Col, Input, Select, Button, Table, Icon } from "antd";
import Highlighter from "react-highlight-words";
import Axios from "axios";
import "style/common.less";

const FormItem = Form.Item;
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
const { Option } = Select;

const tailFormItemLayout = {
  wrapperCol: {
    sm: {
      span: 20,
      offset: 4
    }
  }
};

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    sorter: true,
    render: name => `${name.first} ${name.last}`,
    width: "20%"
  },
  {
    title: "Gender",
    dataIndex: "gender",
    filters: [
      { text: "Male", value: "male" },
      { text: "Female", value: "female" }
    ],
    width: "20%"
  },
  {
    title: "Email",
    dataIndex: "email"
  }
];

const store = createStore(changeColor);
class TableList extends Component {
  constructor() {
    super();
    this.state = {
      goodsStatusList: [
        { id: 1, title: "待审核" },
        { id: 2, title: "已审核" },
        { id: 3, title: "待上架" },
        { id: 4, title: "已上架" },
        { id: 5, title: "已下架" }
      ],
      data: [],
      pagination: {},
      loading: false
    };
  }

  componentWillMount() {
    this.fetch();
  }

  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager
    });
    this.fetch({
      results: pagination.pageSize,
      page: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters
    });
  };

  fetch = (params = {}) => {
    this.setState({ loading: true });
    Axios({
      url: "https://randomuser.me/api",
      method: "GET",
      data: {
        results: 10,
        ...params
      },
      type: "json"
    }).then(data => {
      const pagination = { ...this.state.pagination };
      // Read total count from server
      // pagination.total = data.totalCount;
      pagination.total = 200;
      this.setState({
        loading: false,
        data: data.results,
        pagination
      });
    });
  };

  /**
   * 初始化商品状态列表并返回子组件
   * @param arr
   */
  initGoodsStatusList(arr) {
    let goodsStatusList = [];
    arr.map(item => {
      goodsStatusList.push(
        <Option value={item.id} key={item.id}>
          {item.title}
        </Option>
      );
    });
    return goodsStatusList;
  }

  /**
   * 重置表单
   */
  resetFormFields() {}

  /**
   * 跳转至修改页
   */
  linkToModifyPage() {
    this.props.history.push(
      "/home/supplySystem/1/commodityManagement/classifyManagement/modify"
    );
  }

  render() {
    // const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <div className="tx-form-container box-shadow">
          <Form
            onSubmit={this.handleSubmit}
            style={{
              width: "95%",
              margin: "auto"
            }}
          >
            <Row>
              <Col span={8}>
                <FormItem label="商品名称" {...formItemLayout}>
                  <Input size="large" placeholder="请输入商品名称" />
                </FormItem>
              </Col>

              <Col span={8}>
                <FormItem label="商品状态" {...formItemLayout}>
                  <Select
                    placeholder="请选择商品状态"
                    defaultValue=""
                    size="large"
                  >
                    {this.initGoodsStatusList(this.state.goodsStatusList)}
                  </Select>
                </FormItem>
              </Col>

              <Col span={8}>
                <FormItem {...tailFormItemLayout}>
                  <Button size="large" type="primary" htmlType="submit">
                    查 询
                  </Button>
                  <Button
                    onClick={this.resetFormFields.bind(this)}
                    size="large"
                    className="mgl20"
                  >
                    重 置
                  </Button>
                </FormItem>
              </Col>
            </Row>
          </Form>
        </div>

        <div className="tx-form-container box-shadow">
          <Button
            onClick={this.linkToModifyPage.bind(this)}
            type="primary"
            size="large"
          >
            新 增
          </Button>
        </div>

        <div className="tx-form-container box-shadow">
          <Table
            columns={columns}
            rowKey={record => record.login.uuid}
            dataSource={this.state.data}
            pagination={this.state.pagination}
            loading={this.state.loading}
            onChange={this.handleTableChange}
          />
        </div>
      </div>
      // <Provider store={store}>
      //   <Header />
      //   <Content />
      // </Provider>
    );
  }
}

export default withRouter(TableList);
