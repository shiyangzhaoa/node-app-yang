const user = require('./../models/user-info');
const auth = require('./../models/auth');

const userCtrl = {
  getUsers(ctx) {
    const {
      search
    } = ctx.query;
    return user.getUserInfo(search).then(data => {
      ctx.status = 200;
      if (data) {
        ctx.body = data;
      } else {
        ctx.body = [];
      }
    }).catch(err => {
      ctx.body = err;
      ctx.status = 500;
    });
  },
  createUser(ctx) {
    const {
      body
    } = ctx.request;
    const {
      loginname,
      password
    } = ctx.api_user;
    return auth.login({
      loginname,
      password
    }).then(data => {
      if (data.success) {
        return user.createUser(body);
      } else {
        ctx.body = {
          success: false,
          errMessage: data.message
        };
      }
    }).then(data => {
      ctx.response.status = 200;
      ctx.response.body = data;
    }).catch(err => {
      ctx.response.body = err;
      ctx.response.status = 500;
    });
  },
  deleteUser(ctx) {
    const {
      id
    } = ctx.query;
    return user.deleteUser(id).then(data => {
      ctx.status = 200;
      ctx.body = data;
    }).catch(err => {
      ctx.body = err;
      ctx.status = 500;
    });
  },
  updateUser(ctx) {
    const {
      id
    } = ctx.params;
    const {
      body
    } = ctx.request;
    return user.updateUser(id, body).then(data => {
      ctx.status = 200;
      ctx.body = data;
    }).catch(err => {
      ctx.body = err;
      ctx.status = 500;
    });
  }
};

module.exports = userCtrl;