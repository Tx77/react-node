const mysql = require("../../config/mysql");
const uuidv4 = require("uuid/v4");

class goodsController {
  static async addGoods(ctx, next) {
    let body = ctx.request.body;
    let responseBody = {};
    for (let i in body) {
      if (body[i] === "") {
        Object.assign(responseBody, {
          apiStatus: 500,
          sysStatus: 0,
          info: "新增失败，参数不能为空"
        });
        ctx.body = responseBody;
        reject();
      }
    }
    let brandList = await this.getBrandTitle(body.brandId);
    let brandTitle = "";
    if (brandList.length > 0) {
      brandTitle = brandList[0].title;
    }
    console.log(brandTitle);
    // let params = Object.assign({}, body);
    let id = uuidv4();
    // 将生成的id及查询到的brandTitle赋值进body中
    Object.assign(body, {
      id,
      brandTitle
    });
    let sql =
      "INSERT INTO goods(id, name, brandTitle, brandId, marketPrice, sellingPrice) VALUES(?,?,?,?,?,?)";
    let params = [
      body.id,
      body.name,
      body.brandTitle,
      body.brandId,
      body.marketPrice,
      body.sellingPrice
    ];
    mysql.query(sql, params, (err, res, field) => {
      if (err) {
        throw err;
      }
      if (res.length > 0) {
        console.log(res);
        Object.assign(responseBody, {
          apiStatus: 0,
          sysStatus: 0,
          info: "新增商品成功"
        });
        ctx.body = responseBody;
        resolve();
      } else {
        Object.assign(responseBody, {
          apiStatus: 500,
          sysStatus: 0,
          info: "新增商品失败，插入数据库失败"
        });
        ctx.body = responseBody;
        reject();
      }
    });
  }

  /**
   * 获取品牌title
   * @param {*} brandId
   */
  getBrandTitle(brandId) {
    return new Promise((resolve, reject) => {
      let sql = "SELECT * FROM goods_brand WHERE id=?";
      mysql.query(sql, brandId, (err, res, field) => {
        if (err) {
          throw err;
        }
        if (res.length > 0) {
          resolve(res);
        } else {
          reject([]);
        }
      });
    });
  }
}

module.exports = goodsController;
