const mongoose = require('mongoose');
const User = mongoose.model('User', require('../schemas/user'));
mongoose.Promise = global.Promise;

module.exports = User