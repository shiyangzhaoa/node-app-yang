function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const jwt = require('jsonwebtoken');

const getVerify = function (token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, 'app.get(user)', function (err, decoded) {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
};

const resolveToken = (() => {
  var _ref = _asyncToGenerator(function* (ctx, next) {
    let token = ctx.request.body.token || ctx.request.query.token || ctx.request.header['x-access-token'];
    if (token) {
      try {
        const result = yield getVerify(token);
        ctx.api_user = result;
        return next();
      } catch (e) {
        ctx.status = 401;
        ctx.body = {
          success: false,
          message: 'token过期'
        };
      }
    } else {
      ctx.status = 403;
      ctx.body = {
        success: false,
        message: '缺少token'
      };
    }
  });

  return function resolveToken(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

module.exports = resolveToken;