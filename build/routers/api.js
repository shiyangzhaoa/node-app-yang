const router = require('koa-router')();
const resolveToken = require('./../middleware/token');
const user_controller = require('./../controllers/user_controller');
const auth_controller = require('./../controllers/auth_controller');

const routers = router.get('/user/getUsers', user_controller.getUsers).post('/user/createUser', resolveToken, user_controller.createUser).delete('/user/deleteUser', user_controller.deleteUser).put('/user/editUser/:id', user_controller.updateUser).post('/auth', auth_controller.register).post('/login', auth_controller.login).get('/user/userInfo', resolveToken, auth_controller.signout);

module.exports = routers;