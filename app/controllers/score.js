const ScoreModel = require("../models/score");
const CfgModel = require('../models/schema');
const response = require('../utils/response');

// 将分数配置和分数拼接在一起
function getItemsWithScore(cfgs, score) {
    let data = [];
    const scoreObj = score || {};
    let v = 0,
        n = '';
    cfgs.forEach(item => {
        const scoreItem = scoreObj[item.id];
        if (scoreItem) {
            v = scoreItem.value;
            n = scoreItem.note;
        } else {
            v = 0;
            n = '';
        }

        data.push({
            id: item._id,
            pid: item.pid,
            name: item.name,
            description: item.description,
            scoreLimit: item.scoreLimit,
            score: v,
            note: n
        });
    });

    return data;
}

const scoreController = {
    async getScore(ctx) {
        const $user = ctx.$user;
        const {
            period,
            userId
        } = ctx.request.body;

        try {
            let userScore = await ScoreModel.findOne({
                period: period,
                user: userId
            }).then(()=>{
                // todo 到这里的时候 客户端已经直接响应了 需要排查原因
                console.log(arguments);
            });
            console.log(1);
            // let userScore = false;
    
            const hasScore = userScore ? true : false;
    
            if (!hasScore) {
                userScore = await scoreController.getOrCreateScore(ctx);
                // return ctx.response.body = response(null, 404, '目前还没有评分');
            }
    
            let cfgs = await CfgModel.find();
    
            if (!cfgs) {
                return ctx.throw(500, '因无法获取评分配置，系统暂无法使用');
            }
            const scores = getItemsWithScore(cfgs, userScore.score);
            return ctx.response.body = response(scores);
        } catch (error) {
            console.log(error);
        }
    },
    // 获取或初始化用户评分
    async getOrCreateScore(ctx) {
        const {
            period,
            userId
        } = ctx.request.body;
        if (!period) {
            // ctx.response.body = response(null, 405, '必须指定是哪个时期的评分');
            return ctx.throw(400, '必须指定是哪个时期的评分');
        }

        const aimScore = await ScoreModel.findOne({
            user: userId,
            period: period
        });
        if (aimScore) return aimScore;
        const score = new ScoreModel({
            user: userId,
            period: period
        });
        await score.save();
        return score;

    }
}

module.exports = scoreController;