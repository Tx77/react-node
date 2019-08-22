import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Form, Row, Col, Input, Select, Button, Table, Icon } from "antd";
import Axios from "axios";
import "style/common.less";
import PropTypes from "prop-types";

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
    title: "商品名称",
    dataIndex: "name",
    sorter: true,
    render: name => <a href="javascript:;">{name}</a>
  },
  {
    title: "商品品牌",
    dataIndex: "brandTitle"
  },
  {
    title: "市场价",
    dataIndex: "marketPrice",
    render: price => `￥${price}`
  },
  {
    title: "折扣价",
    dataIndex: "sellingPrice",
    render: price => `￥${price}`
  }
];

class FormQuery extends Component {
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
      searchQuery: {}
    };
  }

  setSearchQuery = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) {
        Message.warning(err);
        return;
      }
      this.refs.tableList.loadTableData(values);
    });
  };

  /**
   * 初始化商品状态列表并返回子组件
   * @param {*} arr
   * @returns
   * @memberof FormQuery
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
  resetFormFields() {
    this.props.form.resetFields();
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <div className="tx-form-container box-shadow">
          <Form
            onSubmit={this.setSearchQuery}
            style={{
              width: "95%",
              margin: "auto"
            }}
          >
            <Row>
              <Col span={8}>
                <FormItem label="商品名称" {...formItemLayout}>
                  {getFieldDecorator("goodsName")(
                    <Input size="large" placeholder="请输入商品名称" />
                  )}
                </FormItem>
              </Col>

              <Col span={8}>
                <FormItem label="商品状态" {...formItemLayout}>
                  {getFieldDecorator("goodsStatus", {
                    initialValue: ""
                  })(
                    <Select
                      placeholder="请选择商品状态"
                      size="large"
                      allowClear
                    >
                      {this.initGoodsStatusList(this.state.goodsStatusList)}
                    </Select>
                  )}
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
        <TableList ref="tableList" history={this.props.history} />
      </div>
    );
  }
}

const QueryForm = Form.create()(FormQuery);

/**
 * TableList
 */
class TableList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: [],
      pagination: {
        pageSize: 10,
        current: 1,
        total: 0
      },
      loading: false
    };
  }

  componentWillMount() {
    this.loadTableData();
  }
  /**
   * @description: 处理table change事件
   * @param {pagination, filters, sorter}
   * @return:
   */
  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager
    });
    this.loadTableData({
      pageIndex: pagination.current,
      pageSize: pagination.pageSize
    });
  };
  /**
   * @description: 加载table数据
   * @param {params}
   * @return:
   */
  loadTableData = (params = {}) => {
    let bodyParams = Object.assign({}, params);
    this.setState({ loading: true });
    Axios({
      url: "/api/goods/goodsList",
      method: "GET",
      params: bodyParams
    }).then(res => {
      let resData = res.data.data;
      let pagination = Object.assign(this.state.pagination, {
        total: resData.total,
        pageSize: resData.pageSize,
        showTotal: () => `共${resData.total}条`,
        current: resData.pageIndex
      });
      this.setState({
        tableData: resData.dataList,
        loading: false,
        pagination: pagination
      });
    });
  };

  /**
   * @description: 跳转至修改页
   * @param {type}
   * @return:
   */
  linkToModifyPage() {
    this.props.history.push(
      "/home/supplySystem/1/commodityManagement/classifyManagement/modify"
    );
  }

  render() {
    return (
      <div>
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
            dataSource={this.state.tableData}
            rowKey={record => record.id}
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

export default withRouter(QueryForm);
