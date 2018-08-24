const ScoreModel = require("../models/score");
const response = require('../utils/response');



module.exports = {
    async getScore(ctx) {

    },
    // 开始为某用户评分
    async initScore(ctx) {
        const {
            period,
            user
        } = ctx;
        const uid = ctx.cookies.get('_pref_uid');
        const token = ctx.cookies.get('_pref_token');
        if (!token) {
            // ctx.response.body = response(null, 405, '用户未登录');
            return ctx.throw(405, '用户未登录');
        }
        if (!period) {
            // ctx.response.body = response(null, 405, '必须指定是哪个时期的评分');
            return ctx.throw(400, '必须指定是哪个时期的评分');
        }

        try {
            const aimScore = await ScoreModel.findOne({
                user: user._id,
                period: period
            }).populate('user');
            if (aimScore) {
                return ctx.response.body = response(aimScore);
            }

            const score = new ScoreModel({
                user: user._id
            });
            await score.save();
            return ctx.response.body = response(score);
        } catch (error) {
            ctx.throw(500, error.message);
        }
    }
}