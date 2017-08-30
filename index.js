const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('koa-cors2');
const app = new Koa();
const routers = require('./src/routers/index')

app.use(cors());
app.use(bodyParser());
app.use(routers.routes()).use(routers.allowedMethods())

app.listen(3000);