const Koa = require('koa')
const app = new Koa()
const cors = require('koa2-cors')
app.use(cors())

app.use(async (ctx, next) => {
    await next();
    ctx.response.type = 'text/html';
    ctx.response.body = '<h1>Hello, koa2!</h1>';
});

// listen at prot 3000
app.listen(3000);
console.log('app started at port 3000...');