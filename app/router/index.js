const Router = require('koa-router');

const scoreCfgController = require('../controllers/schema');
const loginRequire = require('../middleware/loginRequire');

const userRouters = require("./user");

const router = new Router({
  prefix: '/perf/api'
});

// 匿名的
userRouters.anonymity.forEach((item) => {
  router[item.method](userRouters.prefix + item.path, item.action);
});

// 登录验证
router.use(loginRequire);

// 需要登录的
userRouters.normal.forEach(item => {
  router[item.method](userRouters.prefix + item.path, item.action);
});

module.exports = router;