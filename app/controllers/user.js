const User = require('../models/user');

module.exports = {
  async signup(ctx) {
    const { name, email, pwd } = ctx.request.body;
    try {
      // 先验证是否存在
      const aimUser = await User.findOne({
        $or: [
          {
            name
          },
          {
            email
          }
        ]
      });
      if (aimUser) {
        // 已经存在
        return (ctx.response.body = {
          code: '200',
          data: null,
          msg: ' 用户已经存在！'
        });
      }
      // 不存在
      const user = new User({
        name,
        email,
        pwd
      });
      await user.save();
      return (ctx.response.body = {
        code: '200',
        data: '注册成功'
      });
    } catch (error) {
      console.log(err);
      return (ctx.response.body = {
        code: '500',
        mesg: error.message
      });
    }
  },
  async signin(ctx) {
    const { name, email, pwd } = ctx.request.body;
    User.findOne({
      $or: {
        name,
        email
      }
    }).then(aimUser => {
      if (aimUser) {
        aimUser.comparePwd(pwd, aimUser.pwd).then(isMatched => {
          if (isMatched) {
            console.log('login success!');
            resolve(aimUser);
          } else {
            // 密码不匹配
          }
        });
      } else {
        // 用户不存在
      }
    });
  }
};
