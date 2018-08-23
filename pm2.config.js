const params = process.argv.splice(2)

module.exports = {
    apps: [{
        "name": "Perf-Appraisal-Server",
        "script": "app.js",
        "watch": params[0] === 'dev' ? true : false,
        "error_file": "./logs/server-err.log",
        "out_file": "./logs/server.log",
        "env": {
            "APP_PORT": 2222
        }
    }]
}