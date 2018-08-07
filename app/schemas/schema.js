const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.Promise = global.Promise
// 评分点 schema
const scoreCfgSchema = new Schema({
    id: {
        type: String,
        default: '',
        unique: true
    },
    pid: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: String,
    scoreLimit: {
        type: Number,
        default: 0
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

module.exports = scoreCfgSchema