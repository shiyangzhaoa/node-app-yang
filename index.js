const Koa = require('koa');
const fs = require('fs');
const bodyParser = require('koa-bodyparser');
const cors = require('koa-cors2');
const user = require('./models/user-info');
const api = require('./routers/api');
const app = new Koa();
const routers = require('./routers/index')

app.use(cors());
app.use(bodyParser());
app.use(routers.routes()).use(routers.allowedMethods())

app.listen(3000);