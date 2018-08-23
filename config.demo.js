module.exports = {
    port: process.env.APP_PORT || '2222',
    db: {
        servername: '127.0.0.1',
        database: "pref",
        port: 27017,
        user: "",
        pass: "",
        authSource: ""
    }
}