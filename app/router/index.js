const Router = require('koa-router');

const userRouter = new Router();
const scoreRouter = new Router();
const adminRouter = new Router();

const router = new Router({
  prefix: '/perf/api'
});

router.user('/user', userRouter.routes(), userRouter.allowedMethods());
router.user('/score', scoreRouter.routes(), scoreRouter.allowedMethods());
router.user('/admin', adminRouter.routes(), adminRouter.allowedMethods());

module.exports = router;
