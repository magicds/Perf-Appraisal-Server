const User = require('../models/user');
const ScoreCfg = require('../models/schema');
const response = require('../utils/response');

function getDataFromCfg(item) {
    return {
        id: item.id,
        name: item.name,
        description: item.description,
        pid: item.pid || null,
        scoreLimit: item.scoreLimit || null
    }
}

module.exports = {
    async getScoreCfg(ctx) {
        const cfgs = await ScoreCfg.find();
        const data = [];
        cfgs.forEach((item) => {
            data.push(getDataFromCfg(item));
        });

        return ctx.response.body = response(data);
    }
}