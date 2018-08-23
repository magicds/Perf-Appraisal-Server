const Router = require('koa-router');

const userRouter = new Router();

const userController = require('../controllers/user');

userRouter.post('/signup', userController.signup);
userRouter.get('/signup', async (ctx)=>{
  ctx.response.body = 'method error'
});
userRouter.post('/login', userController.login);
userRouter.post('/logout', userController.logout);

module.exports = userRouter;