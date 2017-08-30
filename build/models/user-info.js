function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const dbUtils = require('./../util/db');

const user = {
  /**
   * 查询用户列表
   * @return {object|null} 查询结果
   */
  getUserInfo(search) {
    return _asyncToGenerator(function* () {
      let result = yield dbUtils.select('user', ['id', 'email', 'name', 'nick', 'detail_info'], search);
      if (Array.isArray(result) && result.length > 0) {
        result = result.slice(0, 50);
      } else {
        result = null;
      }
      return result;
    })();
  },

  /**
   * 创建用户列表
   * @return {object|null} 创建结果
   */
  createUser(user) {
    return _asyncToGenerator(function* () {
      let result = yield dbUtils.create('user', user);
      if (result) {
        return {
          suss: true
        };
      } else {
        return {
          succ: false
        };
      }
    })();
  },

  /**
   * 删除一个用户
   * @return {object|null} 删除结果
   */
  deleteUser(id) {
    return _asyncToGenerator(function* () {
      let result = yield dbUtils.deleteSth('user', id);
      if (result) {
        return {
          suss: true
        };
      } else {
        return {
          succ: false
        };
      }
    })();
  },

  /**
   * 更新用户信息
   * @return {object|null} 更新结果
   */
  updateUser(id, user) {
    return _asyncToGenerator(function* () {
      let result = yield dbUtils.update('user', user, id);
      if (result) {
        return {
          suss: true
        };
      } else {
        return {
          succ: false
        };
      }
    })();
  }
};

module.exports = user;