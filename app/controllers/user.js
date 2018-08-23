const User = require('../models/user');
const response = require('../utils/response');
jwt = require('jsonwebtoken');

/**
 * 设置登录成功cookie
 * @param {Object} ctx koa ctx
 * @param {String} uid userid
 * @param {String} pwdSalt userpwd salt
 * @param {Number} expreDay expreDay
 */
function setLoinCookie(ctx, uid, pwdSalt, expreDay = 7) {
    let token = jwt.sign({
        uid: uid
    }, pwdSalt, {
        expiresIn: '7 days'
    });
    let expireDate = new Date(+new Date() + 86400000 * expreDay);
    ctx.cookies.set('_pref_token', token, {
        expires: expireDate,
        httpOnly: true
    });
    ctx.cookies.set('_pref_uid', uid, {
        expires: expireDate,
        httpOnly: true
    });
}

function clearLoinCookie(ctx) {
    ctx.cookies.set('_pref_token', token, {
        expires: null,
        httpOnly: true
    });
    ctx.cookies.set('_pref_uid', uid, {
        expires: null,
        httpOnly: true
    });
}

module.exports = {
    async signup(ctx) {
        let {
            name,
            email,
            pwd
        } = ctx.request.body;
        try {
            // 先验证是否存在
            const aimUser = await User.findOne({
                $or: [{
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
            console.log(error);
            return (ctx.response.body = {
                code: '500',
                mesg: error.message
            });
        }
    },
    async login(ctx) {
        let {
            name,
            email,
            pwd
        } = ctx.request.body;
        const aimUser = await User.findOne({
            $or: [{
                    name
                },
                {
                    email
                }
            ]
        });
        if (!aimUser) {
            return ctx.response.body = response(null, 404, 'user is not existed');
        }

        if (await aimUser.comparePwd(pwd, aimUser.pwd)) {
            setLoinCookie(ctx, aimUser._id, aimUser.pwdSalt);
            return ctx.response.body = response({
                name: aimUser.name,
                email: aimUser.email,
                uid: aimUser._id,
                type: aimUser.type,
                role: aimUser.role
            }, 200, 'login success!');
        } else {
            return ctx.response.body = response(null, 405, 'the username and password not match!');
        }
    },
    async logout(ctx) {
        clearLoinCookie(ctx);
        return ctx.response.body = response('logout sussess');
    }
};