const express = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session')

const app = express()
// Note Since version 1.5.0, the cookie-parser middleware no longer needs to be used for this module to work. This module now directly reads and writes cookies on req/res. Using cookie-parser may result in issues if the secret is not the same between this module and cookie-parser.
// app.use(cookieParser())
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 30,
        // https://www.npmjs.com/package/express-session#cookiesecure
        /*
        Specifies the boolean value for the Secure Set-Cookie attribute. When truthy, the Secure attribute is set, otherwise it is not. By default, the Secure attribute is not set.
        Note be careful when setting this to true, as compliant clients will not send the cookie back to the server in the future if the browser does not have an HTTPS connection.*/
        secure: false,
    }
}))

app.use(function (req, res, next) {
    // count the views
    req.session.views = (req.session.views || 0) + 1
    console.log(req.session);
    next()
})

app.get('/a', function (req, res, next) {
    req.session.username = '121';
    res.send('you viewed this page ' + req.session.views + ' times')
})
app.get('/b', function (req, res, next) {
    res.send(`hello ${req.session.username}, you viewed this page ${req.session.views} times`)
})

const server = app.listen(3000, function () {
    const host = server.address().address
    const port = server.address().port

    console.log('Example app listening at http://%s:%s', host, port)
});