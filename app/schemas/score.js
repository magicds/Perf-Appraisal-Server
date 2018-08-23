const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.Promise = global.Promise

// 每条得分 schema
const scoreSchema = new Schema({
    user: {
        // 引用用户，然后查询时直接填充即可
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    period: {
        type: String,
    },
    score: {
        type: Object,
        default: {}
        // DEMO
        // {
        //     scoreCfgId: {
        //         value: 0,
        //         note: '投诉，扣10分'
        //     }
        // }
    },
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
})
scoreSchema.pre('save', function (next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }
    next();
});
module.exports = scoreSchema;