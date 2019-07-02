const mysql = require("../../config/mysql");
const uuidv4 = require("uuid/v4");

class brandController {
  static async getBrand(ctx, next) {
    let responseBody = {};
    return new Promise((resolve, reject) => {
      let sql = "SELECT * FROM goods_brand";
      mysql.query(sql, (err, res, fields) => {
        if (err) {
          throw err;
        }
        if (res.length > 0) {
          Object.assign(responseBody, {
            apiStatus: 0,
            sysStatus: 0,
            data: res,
            info: "查询品牌列表成功"
          });
          ctx.body = responseBody;
          resolve();
        } else {
          Object.assign(responseBody, {
            apiStatus: 0,
            sysStatus: 2001,
            data: {},
            info: "查询失败，请重试"
          });
          ctx.body = responseBody;
          resolve();
        }
      });
    });
  }
}

module.exports = brandController;
