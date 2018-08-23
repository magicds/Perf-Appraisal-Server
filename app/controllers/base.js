const jwt = require('jsonwebtoken');
const UserModel = require("../models/user");
const anonymityPath = [];
class BaseController {
    constructor() {
        this.$userModel = UserModel;
    }

    async init(ctx) {
        this.$user = null;
        // 如果允许匿名
        if (anonymityPath.indexOf(ctx.path) != -1) {
            this.$auth = true;
        } else {
            await this.checkLogin(ctx);
        }
    }

    /**
     * 检查是否登录
     *
     * @param {Object} ctx koa ctx
     * @returns {Promise<Boolean>}
     * @memberof baseController
     */
    async checkLogin(ctx) {
        let token = ctx.cookies.get('_pref_token');
        let uid = ctx.cookies.get('_pref_uid');
        try {
            if (!token || !uid) return false;
            const user = await UserModel.findById(uid);
            if (!user) return false;

            let decodeData;
            try {
                decodeData = jwt.verify(token, user.pwdSalt)
            } catch (error) {
                console.error(error);
                return false;
            }
            if (decodeData._id === uid) {
                this.$uid = uid;
                this.$auth = true;
                this.$user = user;
                return true;
            }
        } catch (error) {
            console.error(error);
            return false;
        }
    }
}

module.exports = BaseController;