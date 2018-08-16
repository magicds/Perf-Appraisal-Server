const Router = require('koa-router');

const userRouter = new Router();
const scoreRouter = new Router();
const adminRouter = new Router();

const userControl = require('../controllers/user');

userRouter.post('/signup', userControl.signup);
userRouter.get('/signup', async (ctx)=>{
  ctx.response.body = 'method error'
});

const router = new Router({
  prefix: '/perf/api'
});

router.use('/user', userRouter.routes(), userRouter.allowedMethods());
router.use('/score', scoreRouter.routes(), scoreRouter.allowedMethods());
router.use('/admin', adminRouter.routes(), adminRouter.allowedMethods());

module.exports = router;