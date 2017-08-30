function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const dbUtils = require('./../util/db');

const jwt = require('jsonwebtoken');

const auth = {
  /**
   * 创建用户
   * @return {object|null} 验证结果
   */
  register(options) {
    return _asyncToGenerator(function* () {
      let same = yield dbUtils.query(`
      SELECT * FROM account WHERE loginname = "${options.loginname}"
    `);
      if (Array.isArray(same) && same.length) {
        return {
          succ: 'existed'
        };
      } else {
        let result = yield dbUtils.create('account', options);
        if (result) {
          return {
            succ: true
          };
        } else {
          return {
            succ: false
          };
        }
      }
    })();
  },

  /**
   * 用户登陆
   * @return {object|null} 返回的token信息
   */
  login(options) {
    return _asyncToGenerator(function* () {
      let user = yield dbUtils.query(`
      SELECT * FROM account WHERE loginname = "${options.loginname}"
    `);
      if (Array.isArray(user) && !user.length) {
        return {
          success: false,
          message: '用户不存在'
        };
      } else {
        let result = yield dbUtils.query(`
        SELECT * FROM account WHERE loginname = "${options.loginname}" AND password = "${options.password}"
      `);
        if (Array.isArray(result) && !result.length) {
          return {
            success: false,
            message: '密码错误'
          };
        } else {
          var token = jwt.sign(options, 'app.get(user)', {
            expiresIn: '1h'
          });
          return {
            success: true,
            message: '登陆成功',
            name: result[0].loginname,
            token: token
          };
        }
      }
    })();
  },
  /**
   * 查询用户信息
   * @return {object|null} 查询结果
   */
  getUserInfo(name) {
    return _asyncToGenerator(function* () {
      let info = yield dbUtils.query(`
      SELECT * FROM account WHERE loginname = "${name}"
    `);
      if (Array.isArray(info) && !info.length) {
        return {
          success: false,
          message: '用户不存在'
        };
      } else {
        return {
          success: true,
          info: info[0]
        };
      }
    })();
  }
};

module.exports = auth;