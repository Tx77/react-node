const mysql = require("../../config/mysql");

class UserController {
  /**
   * 用户登录
   * @param {*} ctx
   * @param {*} next
   */
  static async login(ctx, next) {
    let username = ctx.request.body.username || "";
    let password = ctx.request.body.password || "";
    let responseBody = {};
    return new Promise((resolve, reject) => {
      let sql = "SELECT * FROM users WHERE username=? and password=?";
      let params = [username, password];
      if (username && password) {
        mysql.query(sql, params, (err, res, fields) => {
          if (err) {
            throw err;
          }
          if (res.length > 0) {
            Object.assign(responseBody, {
              apiStatus: 0,
              sysStatus: 0,
              data: {},
              info: "登陆成功"
            });
            ctx.body = responseBody;
            resolve();
          } else {
            Object.assign(responseBody, {
              apiStatus: 0,
              sysStatus: 2001,
              data: {},
              info: "用户名或密码错误，登录失败"
            });
            ctx.body = responseBody;
            resolve();
          }
        });
      } else {
        Object.assign(responseBody, {
          apiStatus: 0,
          sysStatus: 2002,
          data: {},
          info: "信息不完整"
        });
        ctx.body = responseBody;
        resolve();
      }
    });
  }

  static async userInfo(ctx, next) {
    // do something

    // 假设这是请求回来的数据
    let data = {
      name: "jk",
      age: 25
    };
    ctx.body = {
      status: true,
      data
    };
  }

  /**
   * 用户登录
   * @param {*} ctx
   * @param {*} next
   */
  static async register(ctx, next) {
    let username = ctx.request.body.username || "";
    let password = ctx.request.body.password || "";
    let responseBody = {};
    return new Promise((resolve, reject) => {
      if (username && password) {
        let sql = "INSERT INTO users(username, password) VALUES(?,?)";
        let params = [username, password];
        mysql.query(sql, params, (err, value, fields) => {
          if (err) {
            throw err;
            return;
          }
          Object.assign(responseBody, {
            apiStatus: 0,
            sysStatus: 0,
            info: "注册成功"
          });
          ctx.body = responseBody;
          resolve();
        });
      } else {
        Object.assign(responseBody, {
          apiStatus: 0,
          sysStatus: 2002,
          data: {},
          info: "注册信息不完整，请完善后再提交"
        });
        ctx.body = responseBody;
        resolve();
      }
    });
  }
}

module.exports = UserController;
