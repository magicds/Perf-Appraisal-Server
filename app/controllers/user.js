const mongoose = require('mongoose')
const User = mongoose.model('User')

module.exports = {
    signup(ctx) {
        const {
            name,
            email,
            pwd
        } = ctx.request.body;
        return new Promise((resolve, reject) => {
            // 先验证是否存在
            User.findOne({
                '$or': {
                    name,
                    email
                }
            }).then((res) => {
                if (res) {
                    // 已经存在
                    reject()
                } else {
                    // 不存在
                    const user = new User({
                        name,
                        email,
                        pwd
                    })
                    user.save(_u => {
                        resolve(u);
                    }).then().catch(err => {
                        reject(err)
                    })
                }
            })
        })
    },
    signin(ctx) {
        const {
            name,
            email,
            pwd
        } = ctx.request.body;
        return new Promise((resolve, reject) => {
            User.findOne({
                '$or': {
                    name,
                    email
                }
            }).then(aimUser => {
                if (aimUser) {
                    aimUser.comparePwd(pwd, aimUser.pwd).then(isMatched => {
                        if (isMatched) {
                            resolve(aimUser)
                        } else {
                            // 密码不匹配
                        }
                    })
                } else {
                    // 用户不存在
                }
            })
        })
    }
}