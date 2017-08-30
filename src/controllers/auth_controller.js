const auth = require('./../models/auth');

const authCtrl = {
  register(ctx) {
    const { body } = ctx.request;
    body.level = 0;
    return auth.register(body).then(data => {
      ctx.status = 200;
      ctx.body = data;
    })
  },

  login(ctx) {
    const { body } = ctx.request;
    return auth.login(body).then(data => {
      ctx.status = 200;
      if (data.success) {
        ctx.body = {
          success: true,
          token: data.token,
          name: data.name
        };
      } else {
        ctx.body = {
          success: false,
          errMessage: data.message
        }
      }
    });
  },

  signout(ctx) {
    const {
      loginname,
      password
    } = ctx.api_user;
    return auth.getUserInfo(loginname).then(data => {
      ctx.status = 200;
      if (data.success) {
        ctx.body = {
          success: true,
          info: data.info
        }
      } else {
        ctx.body = {
          success: false,
          message: '用户已经不存在'
        }
      }
    });
  }
}

module.exports = authCtrl;