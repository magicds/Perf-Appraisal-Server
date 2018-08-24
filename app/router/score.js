const scoreController = require("../controllers/score");

module.exports = {
    prefix: '/score',
    normal: [{
        method: 'post',
        path: '/getScore',
        action: scoreController.getScore
    }],
    anonymity: []
}