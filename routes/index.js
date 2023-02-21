const global = require('../global.js')
const users  = require('./auth/users.js')

module.exports = router = global.express.Router()

router.get('/', (req, res) => {
    if (users.checkLoggedIn(req, res)) {
        let image = {
            value: 'Default',
            name : 'Default',
            path : 'images\\default.jpg'
        }
        if (req.query.image)
            image = global.images.find(image => image.value === req.query.image) ?? image
        // render handlebar
        res.render('index', {
            layout: null,
            // parameters
            constants: global.constants,
            images   : global.images,
            image    : image,
            user: {
                username: req.auth.username
            }
        })
    }
})