const Router = require('koa-router');
const userRouter = require("./user");

const scoreRouter = new Router();
const adminRouter = new Router();

const router = new Router({
  prefix: '/perf/api'
});

router.use('/user', userRouter.routes(), userRouter.allowedMethods());
router.use('/score', scoreRouter.routes(), scoreRouter.allowedMethods());
router.use('/admin', adminRouter.routes(), adminRouter.allowedMethods());

module.exports = router;