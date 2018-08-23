const params = process.argv.slice(2)
console.log(params);
// [ 'start', 'pm2.config.js', '--node-args', 'dev' ]
module.exports = {
    apps: [{
        "name": "Perf-Appraisal-Server",
        "script": "app.js",
        "watch": params[3] === 'dev' ? ['app.js', './app/**'] : false,
        // "watch": ["app"],
        "cwd": "./",
        "node_args":"--harmony",
        
        "error_file": "./logs/server-err.log",
        "out_file": "./logs/server.log",
        "env": {
            "APP_PORT": 2222
        }
    }]
}