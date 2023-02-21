const  sessions  = require('client-sessions')
const {generate} = require('randomstring')

const global = require('./global')

global.app.use(sessions({
  cookieName: 'auth',
  requestKey: 'auth',
  secret: 'XwPp9xazJ0ku5CZnlmgAx2Dld8SHkAeT',
  duration: 24 * 60 * 60 * 1000,
}))

// set view engine
global.app.engine('hbs', global.configs.viewEngine)
global.app.set('view engine', 'hbs')
global.app.set('views', global.configs.viewsDir)

global.app.use(global.express.urlencoded({ extended: false }))

// routes
global.app.use(global.express.static('public'))
global.app.use('/'    , require('./routes/index.js'))
global.app.use('/auth', require('./routes/auth/auth.js'))

// start listening
global.app.listen(global.configs.port)