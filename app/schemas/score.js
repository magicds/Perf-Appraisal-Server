const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = require('./user')

mongoose.Promise = global.Promise

// 每条得分 schema
const scoreSchema = new Schema({
    user: userSchema,
    period: {
        type: String,
    },
    scoreId: String,
    score: Number,
    note: String,
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

module.exports = scoreSchema