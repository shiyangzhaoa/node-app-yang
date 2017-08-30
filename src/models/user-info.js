const dbUtils = require('./../util/db');

const user = {
  /**
   * 查询用户列表
   * @return {object|null} 查询结果
   */
  async getUserInfo(search) {
    let result = await dbUtils.select(
      'user', ['id', 'email', 'name', 'nick', 'detail_info'],
      search,
    )
    if (Array.isArray(result) && result.length > 0) {
      result = result.slice(0, 50);
    } else {
      result = null;
    }
    return result;
  },

  /**
   * 创建用户列表
   * @return {object|null} 创建结果
   */
  async createUser(user) {
    let result = await dbUtils.create(
      'user',
      user,
    );
    if (result) {
      return {
        suss: true,
      }
    } else {
      return {
        succ: false,
      }
    }
  },

  /**
   * 删除一个用户
   * @return {object|null} 删除结果
   */
  async deleteUser(id) {
    let result = await dbUtils.deleteSth(
      'user',
      id,
    );
    if (result) {
      return {
        suss: true,
      }
    } else {
      return {
        succ: false,
      }
    }
  },

  /**
   * 更新用户信息
   * @return {object|null} 更新结果
   */
  async updateUser(id, user) {
    let result = await dbUtils.update(
      'user',
      user,
      id
    );
    if (result) {
      return {
        suss: true,
      }
    } else {
      return {
        succ: false,
      }
    }
  }
}

module.exports = user;