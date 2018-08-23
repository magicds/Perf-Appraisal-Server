const Koa = require('koa')
const bodyParser  = require('koa-bodyparser');
const db = require("./app/utils/db");
const connent = db.connect();
const config = require('./config');
const router = require('./app/router/');

const app = new Koa()
app.use(bodyParser())
const cors = require('koa2-cors')
app.use(cors())
app.use(router.routes(), router.allowedMethods());
// app.use(async (ctx, next) => {
    // await next();
    // ctx.response.type = 'text/html';
    // ctx.response.body = '<h1>Hello, koa2!</h1>';
// });

// listen at prot
app.listen(config.port);
console.log(`app started at ${config.port}`);