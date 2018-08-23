
const jwt = require('jsonwebtoken');

/**
 * 设置登录成功cookie
 * @param {Object} ctx koa ctx
 * @param {String} uid userid 
 * @param {String} pwdSalt userpwd salt 用户的密码盐
 * @param {Number} expreDay expreDay cookie 有效期 单位：天
 */
exports.setLoinCookie = function setLoinCookie(ctx, uid, pwdSalt, expreDay = 7) {
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

exports.clearLoinCookie = function clearLoinCookie(ctx) {
    ctx.cookies.set('_pref_token', token, {
        expires: null,
        httpOnly: true
    });
    ctx.cookies.set('_pref_uid', uid, {
        expires: null,
        httpOnly: true
    });
};