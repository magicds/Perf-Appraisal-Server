const mongoose = require('mongoose');
const config = require('../../config.js');

function connect(callback) {
    mongoose.Promise = global.Promise;

    let options = {
        // mongoose 5.x 不支持useMongoClient
        // useMongoClient: true
        useNewUrlParser: true
    };

    if (config.db.user) {
        options.user = config.db.user;
        options.pass = config.db.pass;
    }

    let connectString = `mongodb://${config.db.servername}:${config.db.port}/${config.db.database}`;
    if (config.db.authSource) {
        connectString = connectString + `?authSource=${config.db.authSource}`;
    }

    console.log(connectString);

    let db = mongoose.connect(connectString, options, function (err) {
        if (err) {
            console.log(err + ', mongodb Authentication failed', 'error');
        }
    });

    db.then(function () {
        console.log('mongodb load success...');

        if (typeof callback === 'function') {
            callback.call(db)
        }
    }, function (err) {
        console.log(err + 'mongodb connect error', 'error');
    });

    return db;
}

module.exports = {
    connect: connect
}