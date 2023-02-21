const global = require('../../global.js')

exports.checkUsername = function(username) {
    return Object.keys(global.users).includes(username)
}

exports.checkPassword = function(username, password) {
    return global.users[username] === password
}

exports.checkLoggedIn = function(req, res) {
    if (!req.auth.logged) {
        req.auth.origin = req.url
        res.redirect('/auth')
        return false
    }
    return true
}