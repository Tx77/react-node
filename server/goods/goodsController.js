const mysql = require("../../config/mysql");
const uuidv4 = require("uuid/v4");

class goodsController {
  /**
   * @description: 新增商品
   * @param {ctx, next}
   * @return:
   */
  static async addGoods(ctx, next) {
    let body = ctx.request.body;
    let responseBody = {};
    return new Promise(async (resolve, reject) => {
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
      // console.log(await goodsController.getTitleById());
      try {
        if (await goodsController.checkGoodsIsRepeat(body.name)) {
          Object.assign(responseBody, {
            apiStatus: 500,
            sysStatus: 0,
            info: "新增失败，商品不能重复"
          });
          ctx.body = responseBody;
          resolve();
          return;
        }
      } catch (error) {
        resolve(error);
      }
      let id = uuidv4();
      // 将生成的id及查询到的brandTitle赋值进body中
      Object.assign(body, {
        id
      });
      let sql =
        "INSERT INTO goods(id, name, brandId, marketPrice, sellingPrice) VALUES(?,?,?,?,?)";
      let params = [
        body.id,
        body.name,
        body.brandId,
        body.marketPrice,
        body.sellingPrice
      ];
      mysql.query(sql, params, (err, res, field) => {
        if (err) {
          throw err;
        }
        if (res.affectedRows > 0) {
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
    });
  }
  /**
   * @description: 商品列表查询
   * @param {ctx, next}
   * @return:
   */
  static async goodsList(ctx, next) {
    let query = ctx.query;
    let pageIndex = query.pageIndex || 1;
    let pageSize = query.pageSize || 10;
    let goodsName = query.goodsName || null;
    let goodsStatus = query.goodsStatus || null;
    let responseBody = {};
    let sql = `SELECT * FROM goods LIMIT ${(pageIndex - 1) *
      pageSize},${pageSize}`;
    let count = await goodsController.getCount("goods", "goods.id");
    return new Promise(async (resolve, reject) => {
      mysql.query(sql, async (err, res, field) => {
        if (err) {
          resolve(err);
          throw err;
        }
        if (res.length > 0) {
          let brandTitleList = await goodsController.getTitleById();
          if (brandTitleList.length > 0) {
            for (let i = 0; i < res.length; i++) {
              Object.assign(res[i], {
                brandTitle: brandTitleList[i].title
              });
            }
          }
          let data = Object.assign(
            {},
            {
              dataList: res,
              total: count[0].total,
              pageIndex: parseInt(pageIndex),
              pageSize: parseInt(pageSize)
            }
          );
          Object.assign(responseBody, {
            apiStatus: 0,
            sysStatus: 0,
            data: data,
            info: "商品列表查询成功"
          });
          ctx.body = responseBody;
          resolve();
        } else {
          Object.assign(responseBody, {
            apiStatus: 500,
            sysStatus: 0,
            data: res,
            info: "商品列表查无数据"
          });
          ctx.body = responseBody;
          resolve();
        }
      });
    });
  }
  /**
   * @description: 获取长度
   * @param {sqlName, primaryKey}
   * @return:
   */
  static getCount(sqlName, primaryKey) {
    return new Promise((resolve, reject) => {
      let sql = `SELECT COUNT(${primaryKey}) AS total FROM ${sqlName}`;
      mysql.query(sql, (err, res, field) => {
        if (err) {
          throw err;
          resolve();
        }
        resolve(res);
      });
    });
  }

  /**
   * @description: 根据品牌id获取品牌title
   * @param {brandId}
   * @return:
   */
  static getBrandTitle(brandId) {
    return new Promise((resolve, reject) => {
      let sql = "SELECT * FROM goods_brand WHERE id=?";
      mysql.query(sql, brandId, (err, res, field) => {
        if (err) {
          reject(err);
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

  /**
   * @description: 判断商品是否重复
   * @param {name}
   * @return:
   */
  static checkGoodsIsRepeat(name) {
    return new Promise((resolve, reject) => {
      let sql = "SELECT * FROM goods WHERE name=?";
      mysql.query(sql, name, (err, res, filed) => {
        if (err) {
          reject(err);
          throw err;
        }
        if (res.length > 0) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }
  /**
   * @description: 根据Id查询title
   * @param {type}
   * @return:
   */
  static getTitleById() {
    return new Promise((resovle, reject) => {
      let sql =
        "SELECT title from goods_brand INNER JOIN goods on goods_brand.id = goods.brandId";
      mysql.query(sql, (err, res, field) => {
        if (err) {
          resovle(err);
        }
        resovle(res);
      });
    });
  }
}

module.exports = goodsController;
