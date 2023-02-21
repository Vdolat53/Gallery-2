const global = require('../../global.js')

const users = require('./users.js')

module.exports = router = global.express.Router()

router.get('/', (req, res) => {
    // render handlebar
    res.render('auth/auth', {
        layout: null,
        // parameters
        constants: global.constants,
    })
})

router.post('/login', (req, res) => {
    const username = req.body.username
    const password = req.body.password
    // check user information
    let invalidUsername = !users.checkUsername(username)
    let invalidPassword = !invalidUsername && // check if username exists before check password
                          !users.checkPassword(username, password)
    if (invalidUsername || invalidPassword)
        res.render('auth/auth', {
            layout: null,
            // parameters
            constants: global.constants,
            errors: {
                invalidUsername: invalidUsername,
                invalidPassword: invalidPassword
            }
        })
    else {
        const origin = req.auth.origin || '/'
        // remove origin
        req.auth.origin = null
        // set auth level data
        req.auth.logged   = true
        req.auth.username = username
        res.redirect(origin)
    }
})

router.post('/logout', (req, res) => {
    const origin = req.get('referer') || ''
    // remove auth
    req.auth.logged   = false
    req.auth.username = null
    res.redirect(origin)
})