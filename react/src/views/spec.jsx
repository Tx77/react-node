import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Table, Button, Input, Form, Popconfirm } from "antd";
import { from } from "_array-flatten@2.1.1@array-flatten";

const tableData = [
  {
    key: "1",
    title: "图书、音像、电子书刊",
    children: [
      {
        key: "11",
        title: "电子书刊",
        children: [
          {
            key: "111",
            title: "电子书"
          },
          {
            key: "112",
            title: "网络原创"
          },
          {
            key: "113",
            title: "数字杂志"
          }
        ]
      }
    ]
  },
  {
    key: "2",
    title: "运动、休闲",
    children: [
      {
        key: "21",
        title: "球类及包配",
        children: [
          {
            key: "211",
            title: "运动包"
          },
          {
            key: "212",
            title: "篮球"
          },
          {
            key: "213",
            title: "羽毛球"
          }
        ]
      },
      {
        key: "22",
        title: "运动穿搭",
        children: [
          {
            key: "221",
            title: "运动卫衣"
          },
          {
            key: "222",
            title: "运动T恤"
          },
          {
            key: "223",
            title: "跑步鞋"
          }
        ]
      }
    ]
  }
];

const EditableContext = React.createContext();

class EditableCell extends Component {
  renderCell = ({ getFieldDecorator }) => {
    const {
      editing,
      dataIndex,
      title,
      record,
      index,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item style={{ margin: 0 }}>
            {getFieldDecorator(dataIndex, {
              rules: [
                {
                  required: true,
                  message: `请输入${title}`
                }
              ],
              initialValue: record[dataIndex]
            })(<Input />)}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  render() {
    return (
      <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
    );
  }
}

const chars = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z"
];

class CategoryTree extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: "分类名称",
        dataIndex: "title",
        editable: true
      },
      {
        title: "操作",
        render: (text, record) => {
          const { editingKey } = this.state;
          const editable = this.isEditing(record);
          return editable ? (
            <div>
              <EditableContext.Consumer>
                {form => (
                  <Button
                    onClick={() => this.save(form, record.key)}
                    style={{ marginRight: 8 }}
                  >
                    保存
                  </Button>
                )}
              </EditableContext.Consumer>
              <Popconfirm
                title="确认取消吗？"
                onConfirm={() => this.cancel(record.key)}
              >
                取消
              </Popconfirm>
            </div>
          ) : (
            <div>
              {(record.key + "").length < 3 ? (
                <Button
                  disabled={editingKey !== ""}
                  type="primary"
                  onClick={() => this.addCategory(record)}
                >
                  添加
                </Button>
              ) : (
                ""
              )}
              <Button
                disabled={editingKey !== ""}
                type="success"
                onClick={() => this.edit(record.key)}
                className="mgl10"
              >
                编辑
              </Button>
              <Button
                type="danger"
                className="mgl10"
                disabled={editingKey !== ""}
                onClick={this.deleteCategory.bind(this, record)}
              >
                删除
              </Button>
            </div>
          );
        }
      }
    ];
    this.state = {
      tableData,
      editingKey: "",
      num: 10
    };
  }

  isEditing = record => record.key === this.state.editingKey;

  cancel = () => {
    this.setState({ editingKey: "" });
  };

  save(form, key) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      let newData = [...this.state.tableData];
      this._recursionTree(newData, key, "edit", row);
      this.setState({ tableData: newData, editingKey: "" });
    });
  }

  edit(key) {
    this.setState({ editingKey: key });
  }

  deleteCategory(row) {
    let tableData = [...this.state.tableData];
    this._recursionTree(tableData, row.key, "delete");
    this.setState({ tableData: tableData });
  }

  _recursionTree(arr, key, status, row = {}) {
    let index = arr.findIndex(item => item.key === key);
    if (index > -1) {
      if (status === "edit") {
        arr.splice(index, 1, {
          ...arr[index],
          ...row
        });
      } else {
        arr.splice(index, 1);
      }
    } else {
      arr.map(item => {
        if (item.children && item.children.length > 0) {
          return this._recursionTree(item.children, key, status, row);
        }
      });
    }
  }

  addCategory(row) {
    this._addItemOrderly(row);
    this.setState({ tableData: this.state.tableData });
  }

  _addItemOrderly(row) {
    if (row.children) {
      row.children.push({
        key: this._generateMixed(row.key.length + 1),
        title: "新增" + this._generateMixed(row.key.length + 1)
      });
    }
    return row;
  }

  _generateMixed(n) {
    var res = "";
    for (var i = 0; i < n; i++) {
      var id = Math.ceil(Math.random() * 35);
      res += chars[id];
    }
    return res;
  }

  render() {
    const components = {
      body: {
        cell: EditableCell
      }
    };

    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }

      return {
        ...col,
        onCell: record => ({
          record,
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record)
        })
      };
    });

    return (
      <EditableContext.Provider value={this.props.form}>
        <Table
          components={components}
          dataSource={this.state.tableData}
          columns={columns}
          pagination={false}
        />
      </EditableContext.Provider>
    );
  }
}

const EditableFormTable = Form.create()(CategoryTree);
export default EditableFormTable;
